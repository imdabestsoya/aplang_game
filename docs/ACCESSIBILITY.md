# Accessibility and Presentation Checks

Session 05, 2026-10-01. These are scoped checks, not a claim of complete accessibility certification.

## Contrast

The tests use sRGB relative luminance and unrounded ratios, targeting 4.5:1 for normal text and 3:1 for focus/control boundaries. See W3C’s [contrast explanation](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Rounded results below are for reporting only. `tests/unit/contrast.test.ts` reads the actual palette tokens.

| Foreground | Background | Ratio |
|---|---|---:|
| parchment `#f2e6cc` | charcoal `#171719` | 14.46:1 |
| muted `#b9b2a7` | charcoal `#171719` | 8.52:1 |
| blue `#6f9cab` | charcoal `#171719` | 5.98:1 |
| gold `#b58a45` | charcoal `#171719` | 5.70:1 |
| parchment `#f2e6cc` | panel `#222224` | 12.83:1 |
| muted `#b9b2a7` | panel `#222224` | 7.55:1 |
| gold `#b58a45` | panel `#222224` | 5.06:1 |
| charcoal `#171719` | parchment `#f2e6cc` | 14.46:1 |
| oxblood `#8b2936` | parchment `#f2e6cc` | 6.87:1 |
| paper-muted `#514a40` | parchment `#f2e6cc` | 7.06:1 |
| parchment `#f2e6cc` | dawn `#302820` | 11.70:1 |
| gold `#b58a45` | dawn `#302820` | 4.61:1 |
| muted `#b9b2a7` | dawn `#302820` | 6.89:1 |
| blue `#6f9cab` | dawn `#302820` | 4.84:1 |
| paper-focus `#365866` | parchment `#f2e6cc` | 6.18:1 |
| paper-border `#746a5b` | parchment `#f2e6cc` | 4.29:1 |

Parchment panels use a darker blue focus token (`#365866`) and a visible form-border token (`#746a5b`). The original muted blue remains appropriate on charcoal; it is not reused as a low-contrast focus ring on parchment. The warm resistance background stays dark. These supporting shades serve contrast, without additional symbolic claims. Disabled controls and purely decorative line art are not counted as active text/control pairs.

## Interaction and layout

- Native buttons, selects, details and a labeled modal dialog support keyboard interaction. The guide opens only through an explicit spoiler reveal; Escape/Close restores focus to the invoking button. Continue, restart and chapter replay focus the updated heading after React commits; endings focus the ending heading.
- Story actions, summaries, settings labels and functional buttons aim for at least 44px height. Long selected answers have wrapping text below native selects. Qualitative danger warnings use words and borders, not color alone.
- Full route play runs at desktop and 360px. The zoom check uses Chromium CSS page zoom at 200%, with a 720px viewport yielding 360px of layout space. It verifies usable choices, no horizontal overflow, and a reachable dialog close button. This is an automated zoom proxy, not a completed cross-browser or text-only-zoom audit. W3C describes the [200% text-resizing requirement](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).
- Both the saved Reduce motion setting and OS reduced-motion query disable decorative seal movement. The frame changes its line spacing without reducing the content column or hit targets. No flashing or timed interaction is used.
- Sound requires Enable optional ambience each page load. The real AudioContext test confirms no creation before that gesture, volume changes on mute/unmute, and silence at the final desk. Captions remain visible; audio failure leaves gameplay intact. Hidden tabs fade silent. Physical speaker/headphone listening was not performed.

## Remaining review

Session 06 still needs independent human playtesting, a screen-reader pass, browser-menu/text-only zoom and additional browser coverage. Literary quotations and historical parallels remain separate source-verification gates. Test screenshots are retained under ignored `test-results/` and selected Session 05 evidence is copied into `docs/screenshots/session-05/`.

## Session 06 additional evidence

The clean-copy production suite now includes a complete resistance route navigated by sequential Tab/type-ahead/Enter and a separate 360px touch-emulated route, both after network access is disabled. Q2’s explicit Skip control restores its summary focus, and the consequence region remains atomic/live. The full suite passed 34 tests. These strengthen automated evidence; they do not substitute for the independent reviews listed above.

## Local-play follow-up — 2026-10-01

Converted fixed font sizes to relative units while preserving their default appearance. The new browser check doubles the default text size, verifies the computed dialogue size doubles, exercises evidence and Q2 at that size, checks overflow, and inspects accessible control names. This is automated text-size evidence, not a claim of human screen-reader or physical browser-menu review. Use [PLAYTEST.md](PLAYTEST.md) for the remaining observations.
