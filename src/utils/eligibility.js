// Pure eligibility logic for the Green Home Grant — no React in this file.
//
// CONTRACT (agreed by Person A + Person C — do not change the shape without telling C):
//   checkEligibility(formData) -> {
//     outcome:   'eligible' | 'partial' | 'not-eligible',
//     schemes:   array of 'insulation' | 'heat-pump'   (what they qualify for)
//     reason:    plain-English string explaining the outcome
//     nextSteps: array of plain-English strings
//   }
//
// The POLICY below is a sensible first draft for the fictional scheme. Person A
// owns refining these rules — keep the return shape the same so ResultPage and
// the tests don't break.
//
// Answer vocabulary (from CLAUDE.md):
//   propertyType: house | bungalow | flat | maisonette | other
//   ownership:    own | private-rent | housing-association | council
//   income:       under-31000 | 31000-50000 | over-50000
//   insulation:   both | wall | loft | none | dont-know
//   heating:      gas | oil | electric | heat-pump | other

export function checkEligibility(formData) {
  const { ownership, income, insulation, heating } = formData;

  // Gate 1 — ownership. The grant is for homeowners and private renters.
  // Social tenants' improvements are the landlord's responsibility.
  if (ownership === 'housing-association' || ownership === 'council') {
    return {
      outcome: 'not-eligible',
      schemes: [],
      reason:
        'This grant is for homeowners and private renters. As a council or housing ' +
        'association tenant, your landlord is responsible for these improvements.',
      nextSteps: [
        'Contact your landlord or housing provider about energy efficiency improvements.',
      ],
    };
  }

  // Gate 2 — income. Above £50,000 is over the threshold.
  if (income === 'over-50000') {
    return {
      outcome: 'not-eligible',
      schemes: [],
      reason:
        'Your household income is above £50,000, which is over the threshold for this grant.',
      nextSteps: [
        'Find other ways to improve your home’s energy efficiency on GOV.UK.',
      ],
    };
  }

  // What the home still needs — this drives which schemes apply.
  const needsInsulation = insulation !== 'both';
  const needsHeatPump = heating !== 'heat-pump';

  const schemes = [];
  if (needsInsulation) schemes.push('insulation');
  if (needsHeatPump) schemes.push('heat-pump');

  // Nothing left to fund — already fully insulated and already on a heat pump.
  if (schemes.length === 0) {
    return {
      outcome: 'not-eligible',
      schemes: [],
      reason:
        'Your home already has full insulation and a heat pump, so there is nothing ' +
        'this grant can fund.',
      nextSteps: [
        'No action needed — your home already meets the standards this grant supports.',
      ],
    };
  }

  // Partial: private renters need landlord permission; the middle income band
  // receives part-funding rather than the full grant.
  const partial = ownership === 'private-rent' || income === '31000-50000';

  return {
    outcome: partial ? 'partial' : 'eligible',
    schemes,
    reason: partial
      ? 'You meet the main criteria, but final funding depends on your circumstances. ' +
        'Private renters need landlord permission, and the middle income band receives ' +
        'partial funding.'
      : 'You meet all the criteria for full funding.',
    nextSteps: [
      'Apply online through the Green Home Grant service.',
      ...(ownership === 'private-rent'
        ? ['Get written permission from your landlord before work begins.']
        : []),
    ],
  };
}
