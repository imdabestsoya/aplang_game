#!/usr/bin/env python3
"""Verify planning links and session dispatch without starting a real agent."""

import json
import os
from pathlib import Path
import re
import subprocess
import sys
import tempfile


def main():
    root = Path(__file__).resolve().parent.parent
    runner = root / "scripts/session.py"
    for number in ("1", "02", "3", "04", "5", "06"):
        result = subprocess.run(
            [sys.executable, str(runner), number, "--print"],
            cwd=tempfile.gettempdir(), capture_output=True, text=True,
        )
        assert result.returncode == 0, result.stderr
        assert f"session-{int(number):02d}.md" in result.stdout
    for number in ("0", "7", "-1", "abc", "../01", "001"):
        result = subprocess.run(
            [sys.executable, str(runner), number, "--print"],
            capture_output=True, text=True,
        )
        assert result.returncode == 2, number
    with tempfile.TemporaryDirectory() as directory:
        stub = Path(directory) / "codex"
        stub.write_text(
            "#!" + sys.executable + "\n"
            "import json, os, sys\n"
            "print(json.dumps({'args': sys.argv[1:], 'cwd': os.getcwd()}))\n"
        )
        stub.chmod(0o755)
        environment = dict(os.environ, PATH=directory)
        result = subprocess.run(
            [sys.executable, str(runner), "1"], env=environment,
            cwd=directory, capture_output=True, text=True,
        )
        assert result.returncode == 0, result.stderr
        observed = json.loads(result.stdout)
        assert observed["args"][:2] == ["-C", str(root)]
        assert observed["cwd"] == str(root)
        assert "session-01.md" in observed["args"][2]
        stub.unlink()
        result = subprocess.run(
            [sys.executable, str(runner), "1"], env=environment,
            capture_output=True, text=True,
        )
        assert result.returncode == 2 and "not on PATH" in result.stderr
    for number in range(1, 7):
        plan = (root / f".codex/sessions/session-{number:02d}.md").read_text()
        for heading in ("Prerequisites", "Work checklist", "Expected files touched",
                        "Verification", "Acceptance criteria"):
            assert f"## {heading}" in plan, (number, heading)
    # Deliberately check workflow docs, not links/examples inside the supplied PRD.
    documents = [root / "AGENTS.md", root / "README.md"]
    documents += list((root / ".codex").rglob("*.md"))
    documents += [p for p in (root / "docs").rglob("*.md") if p.name != "PRD.md"]
    for document in documents:
        for link in re.findall(r"\]\(([^)]+)\)", document.read_text()):
            if "://" in link or link.startswith("#"):
                continue
            assert (document.parent / link.split("#")[0]).exists(), (document, link)
    print("PASS: session inputs, prompt selection, launch dispatch, missing CLI, plan sections, documentation links.")
    print("Live Codex and application tests were not run.")


if __name__ == "__main__":
    main()
