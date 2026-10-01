#!/usr/bin/env python3
"""Start a documented implementation session without global configuration."""

import argparse
from pathlib import Path
import re
import shutil
import subprocess


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("number", help="Session 1–6 (01–06 also accepted)")
    parser.add_argument("--print", action="store_true", dest="print_only",
                        help="Print the prompt without launching Codex")
    args = parser.parse_args()
    if not re.fullmatch(r"0?[1-6]", args.number):
        parser.error("session must be 1–6 or 01–06")
    root = Path(__file__).resolve().parent.parent
    number = f"{int(args.number):02d}"
    plan = root / ".codex" / "sessions" / f"session-{number}.md"
    if not plan.is_file():
        parser.error(f"session plan missing: {plan}")
    prompt = (
        f"Run session {number} for The Weight. Read AGENTS.md and "
        ".codex/commands/session.md, then execute that protocol using "
        f".codex/sessions/session-{number}.md. Follow docs/PRD.md, "
        "check prerequisites, implement the session, verify acceptance criteria, "
        "and update docs/STATUS.md plus the session handoff. Resume existing "
        "work; do not just provide a plan. Do not begin later sessions."
    )
    if args.print_only:
        print(prompt)
        return 0
    executable = shutil.which("codex")
    if executable is None:
        parser.error("Codex CLI is not on PATH; use --print and paste the prompt into your agent")
    return subprocess.call([executable, "-C", str(root), prompt], cwd=root)


if __name__ == "__main__":
    raise SystemExit(main())
