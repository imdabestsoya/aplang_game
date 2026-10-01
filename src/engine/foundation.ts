export function reputationLabel(value: number): string {
  if (value === 0) return 'Condemned';
  if (value < 25) return 'Under suspicion';
  if (value < 50) return 'Watched';
  if (value < 75) return 'Accepted';
  return 'Favored';
}

export function hysteriaLabel(value: number): string {
  if (value === 100) return 'Town Rupture';
  if (value < 25) return 'Uneasy';
  if (value < 50) return 'Rumors spreading';
  if (value < 80) return 'Fear governs';
  return 'Near rupture';
}
