import type { Card, Choice, Ending, Flags, Meters } from './types';

export function canResist(flags: Flags): boolean {
  return flags.poppetProvenance && flags.landMotiveExamined && flags.courtContradiction
    && !flags.falseAccusation && !flags.signedFalseConfession;
}

export function resolveEnding(state: Meters & { flags: Flags }, card: Card, choice: Choice): Ending | null {
  if (state.hysteria === 100) return {
    id: 'town-rupture', title: 'Town Rupture', variant: 'threshold',
    condemnation: state.reputation === 0,
    explanation: `Collective panic has reached its breaking point.${state.reputation === 0 ? ' The court also condemns you; its rejection is not proof of wrongdoing.' : ''}`,
  };
  if (state.reputation === 0) return {
    id: 'condemned', title: 'Condemned', variant: 'threshold', condemnation: true,
    explanation: 'Your public standing has collapsed. The court’s rejection is not proof of wrongdoing.',
  };
  if (!card.final) return null;
  if (choice.finalAction === 'refuse' && canResist(state.flags)) return {
    id: 'name-preserved', title: 'A Name Preserved', variant: 'resistance', condemnation: false,
    explanation: 'You refuse the false confession without naming another person falsely. You have resisted the court’s definition of truth. Proctor’s tragic fate remains: moral resistance is not physical escape.',
  };
  const confession = choice.finalAction === 'sign';
  return {
    id: 'within-system', title: 'Within the System',
    variant: confession ? 'confession' : 'unresolved-resistance', condemnation: false,
    explanation: confession
      ? 'You sign a false confession. The prospect of survival comes with a statement that supports the court’s account; survival is not the same as moral resistance.'
      : `You refuse, but your resistance remains unresolved.${state.flags.falseAccusation ? ' An earlier false accusation remains part of your record.' : ''}${state.flags.signedFalseConfession ? ' An earlier false confession remains part of your record.' : ''}${!state.flags.poppetProvenance || !state.flags.landMotiveExamined || !state.flags.courtContradiction ? ' Your examination of the court’s evidence and logic is incomplete.' : ''} Refusal alone cannot erase those actions.`,
  };
}
