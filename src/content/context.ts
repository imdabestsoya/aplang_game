import type { SourceNote } from '../engine/types';
interface ContextEntry extends SourceNote {
  id: string; title: string; body: string; symbolismIds: readonly string[];
  checkedAt: string; sources: readonly { title: string; url: string }[];
}
export const historicalContext: readonly ContextEntry[] = [
  {
    id: 'drama', title: 'Miller’s Salem is a dramatic interpretation', basis: 'interpretation', actReference: 'Acts I–IV; author’s retrospective essay',
    body: 'Miller recalled that congressional investigations helped shape his writing. His play is a dramatic interpretation; this game further invents meetings, documents, numerical rules and alternate outcomes. Neither is a transcript of historical Salem.',
    sourceNote: 'Original paraphrase and adaptation distinction; the author’s account supports the writing-context claim, not every scene detail.',
    symbolismIds: ['S33'], checkedAt: '2026-10-01',
    sources: [{ title: 'Arthur Miller, Why I Wrote The Crucible (1996)', url: 'https://www.newyorker.com/magazine/1996/10/21/why-i-wrote-the-crucible' }],
  },
  {
    id: 'salem', title: 'Historical Salem involved lethal judicial power', basis: 'interpretation', actReference: 'Historical context for Acts I–IV',
    body: 'The University of Virginia archive records nineteen hangings, one death by torture and at least five deaths in jail during the 1692–1693 events. These were material consequences of legal proceedings, not merely a loss of popularity.',
    sourceNote: 'Original summary of the archive overview; its documented history is separate from Miller’s characterization and the game’s inventions.',
    symbolismIds: ['S33'], checkedAt: '2026-10-01',
    sources: [{ title: 'University of Virginia, Salem Witch Trials overview', url: 'https://salem.lib.virginia.edu/overview.html' }],
  },
  {
    id: 'mccarthy', title: 'McCarthyism belongs to a different political setting', basis: 'interpretation', actReference: 'Twentieth-century context, not an event within the play',
    body: 'The Senate records McCarthy’s 1953–1954 investigations into alleged Communist influence and his censure in December 1954. Congressional investigations operated through different institutions and procedures from Salem’s witchcraft prosecutions. Comparing accusation and pressure to conform does not make those histories identical.',
    sourceNote: 'The dates and investigation subject are checked against the Senate Historical Office. The comparison is this adaptation’s interpretation.',
    symbolismIds: ['S33'], checkedAt: '2026-10-01',
    sources: [{ title: 'U.S. Senate, McCarthy and Army-McCarthy Hearings', url: 'https://www.senate.gov/about/powers-procedures/investigations/mccarthy-and-army-mccarthy-hearings.htm' }],
  },
  {
    id: 'comparison', title: 'Compare mechanisms, not equivalent suffering', basis: 'invented', actReference: 'Postgame reflection; no modern event is asserted',
    body: 'Imagine a rumor repeated until familiarity is mistaken for evidence. Ask who can challenge it, what would count as disproof, and who has power to punish. This hypothetical can illuminate repetition and reputational pressure. Salem executions, twentieth-century political persecution and online disputes differ in power, process, scale and consequences. Criticism is not automatically persecution, and an accusation is not automatically false.',
    sourceNote: 'Original classroom thought experiment based on PRD §9. It makes no factual allegation about a modern person, platform or incident.',
    symbolismIds: ['S34'], checkedAt: '2026-10-01', sources: [],
  },
];
