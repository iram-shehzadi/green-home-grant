import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'node:os';

// AiSEng lab-VM reverse-proxy convention: the dev server is not reached at the
// domain root. It is exposed through code-server's port forwarder at
// https://code-<hostname>/proxy/<port>/. code-server strips the "/proxy/<port>"
// prefix before forwarding to this server, while the browser still requests
// assets *under* that prefix. So we set Vite's `base` to the prefix — otherwise
// index.html's absolute "/src/main.jsx" resolves to the domain root, 404s, React
// never mounts, and the page renders blank — and re-add the stripped prefix on
// the way in (see reAddBasePrefix below).
// Override the public host via VITE_PUBLIC_HOSTNAME and the port via VITE_PORT.
const PORT = Number(process.env.VITE_PORT) || 5002;
const HOSTNAME = process.env.VITE_PUBLIC_HOSTNAME || os.hostname();
const BASE = `/proxy/${PORT}/`;

// code-server strips "/proxy/<port>" before forwarding, so re-add it for both
// plain HTTP requests and HMR websocket upgrades. The HTTP middleware lets
// Vite's base-aware asset routing match; the upgrade listener lets HMR connect,
// because Vite only accepts the websocket when its path equals `base`. A connect
// middleware can't do this on its own — websocket upgrades bypass the middleware
// stack — so we patch req.url on the server's 'upgrade' event, ahead of Vite's
// own handler (prependListener), and the path check then matches.
const reAddBasePrefix = {
  name: 'readd-base-prefix',
  configureServer(server) {
    const addPrefix = (req) => {
      if (req.url && !req.url.startsWith(BASE)) {
        req.url = BASE.replace(/\/$/, '') + req.url;
      }
    };
    server.middlewares.use((req, _res, next) => {
      addPrefix(req);
      next();
    });
    server.httpServer?.prependListener('upgrade', addPrefix);
  },
};

export default defineConfig({
  plugins: [react(), reAddBasePrefix],
  base: BASE,
  server: {
    host: '0.0.0.0',
    port: PORT,
    strictPort: true,
    allowedHosts: [HOSTNAME, '.labs.decoded.com'],
    // The proxy terminates TLS on 443, so the browser must open the HMR socket
    // on 443 rather than Vite's port. Host and protocol are intentionally left
    // unset: the client then derives them from the page URL (wss + code-<host>),
    // so HMR works through the proxy without hardcoding the public hostname.
    hmr: {
      clientPort: 443,
    },
  },
});
