import { describe, it, expect } from 'vitest';
import { checkEligibility } from './eligibility';

// Helper: a baseline of valid answers; each test overrides what it cares about.
const base = {
  propertyType: 'house',
  ownership: 'own',
  income: 'under-31000',
  insulation: 'none',
  heating: 'gas',
};

describe('checkEligibility', () => {
  it('homeowner, low income, needs work → eligible for both schemes', () => {
    const result = checkEligibility(base);
    expect(result.outcome).toBe('eligible');
    expect(result.schemes).toEqual(['insulation', 'heat-pump']);
  });

  it('middle income band → partial eligibility', () => {
    const result = checkEligibility({ ...base, income: '31000-50000' });
    expect(result.outcome).toBe('partial');
    expect(result.schemes.length).toBeGreaterThan(0);
  });

  it('private renter → partial, with a landlord-permission next step', () => {
    const result = checkEligibility({ ...base, ownership: 'private-rent' });
    expect(result.outcome).toBe('partial');
    expect(result.nextSteps.some((s) => /landlord/i.test(s))).toBe(true);
  });

  it('council tenant → not eligible (landlord responsible)', () => {
    const result = checkEligibility({ ...base, ownership: 'council' });
    expect(result.outcome).toBe('not-eligible');
    expect(result.schemes).toEqual([]);
  });

  it('income over £50,000 → not eligible', () => {
    const result = checkEligibility({ ...base, income: 'over-50000' });
    expect(result.outcome).toBe('not-eligible');
  });

  it('already fully insulated and on a heat pump → not eligible (nothing to fund)', () => {
    const result = checkEligibility({
      ...base,
      insulation: 'both',
      heating: 'heat-pump',
    });
    expect(result.outcome).toBe('not-eligible');
    expect(result.schemes).toEqual([]);
  });

  it('already has a heat pump but no insulation → eligible for insulation only', () => {
    const result = checkEligibility({ ...base, heating: 'heat-pump' });
    expect(result.schemes).toEqual(['insulation']);
    expect(result.schemes).not.toContain('heat-pump');
  });
});
