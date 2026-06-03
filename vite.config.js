import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'node:os';

// AiSEng lab-VM reverse-proxy convention: the dev server is not reached at the
// domain root. It is proxied through code-server's port forwarder at
// https://code-<hostname>/absproxy/<port>/ (code-server runs at code-<hostname>).
// Because the app lives under that sub-path, Vite must emit asset URLs with a
// matching `base` — otherwise index.html's absolute "/src/main.jsx" resolves to
// the domain root, 404s, React never mounts, and the page renders blank.
// Override the public host via VITE_PUBLIC_HOSTNAME and the port via VITE_PORT.
const PORT = Number(process.env.VITE_PORT) || 5002;
const PUBLIC_HOST = process.env.VITE_PUBLIC_HOSTNAME || `code-${os.hostname()}`;
const BASE = `/absproxy/${PORT}/`;

export default defineConfig({
  base: BASE,
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: PORT,
    strictPort: true,
    allowedHosts: [PUBLIC_HOST],
    hmr: {
      protocol: 'wss',
      host: PUBLIC_HOST,
      clientPort: 443,
      // Vite already prefixes the HMR socket path with `base`; the proxy routes
      // wss://code-<hostname>/absproxy/<port>/ through to this dev server.
    },
  },
});
