export interface PuzzleField { label: string; options: readonly { value: string; label: string }[] }
const options = (items: readonly (readonly [string, string])[]) => items.map(([value, label]) => ({ value, label }));
const events = options([['gift', 'The poppet reaches Elizabeth'], ['accusation', 'The object is interpreted as evidence against Elizabeth'], ['sewing', 'Mary makes the poppet in court']]);
const classifications = options([['inference', 'Inference'], ['observation', 'Observation'], ['allegation', 'Allegation']]);
export const puzzleForms: Record<string, readonly PuzzleField[]> = {
  P1: [
    ...['First event', 'Second event', 'Third event'].map(label => ({ label, options: events })),
    { label: 'What does possession establish?', options: options([['possession-proves-intent', 'Possession proves harmful intent'], ['possession-not-intent', 'Possession alone does not establish intent']]) },
  ],
  P2: [
    ...['Property-interest note', 'Giles’s claim', 'Court claim'].map(label => ({ label, options: classifications })),
    { label: 'What follows from a possible motive?', options: options([['motive-proves-guilt', 'A possible benefit proves guilt'], ['scrutiny-not-proof', 'A possible motive merits scrutiny but is not proved by allegation alone']]) },
  ],
  P3: [
    { label: 'How does the court treat an accusation?', options: options([['accusation-confirms', 'An accusation establishes suspicion'], ['accusation-tested', 'An accusation must be independently tested first']]) },
    { label: 'How does the court treat defense?', options: options([['defense-disproves', 'Defense can disprove guilt'], ['defense-confirms', 'Defending the accused creates more suspicion']]) },
    { label: 'What is the logical result?', options: options([['no-disproof', 'Counterargument becomes confirmation; meaningful disproof is impossible'], ['fair-test', 'Both sides receive a fair test']]) },
  ],
};
