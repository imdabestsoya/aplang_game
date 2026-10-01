# Connect GitHub After Bootstrap

`origin` is configured as `https://github.com/imdabestsoya/aplang_game.git`. At Session 02 start, local `main` and the recorded `origin/main` both referenced `1480466`. Session 02 makes no remote writes and does not infer current authentication or visibility from the tracking reference. Commit author is configured locally as iamdabestsoya <krish@krishbehl.com>. The checklist below remains a reference for future publication work.

## Required destination information

For an existing repository, obtain its URL. For a new repository, establish owner, name, and visibility before creating it. Use the user’s authenticated Git/GitHub environment; do not put tokens in files or remote URLs. GitHub CLI (`gh`) was not on the bootstrap PATH.

## Connection sequence

1. Inspect `git status --short --branch`, `git remote -v`, and the intended diff; verify only intended files will be published.
2. Create a local commit with an appropriate configured author. Do not fabricate identity or change global Git configuration. Review/stage the explicit project paths before committing.
3. For an existing destination, use `git remote add origin <repository-url>` only if origin is absent; inspect an existing origin before changing it.
4. Inspect remote branches/history before pushing. If remote history exists, fetch and reconcile deliberately; never force-push or overwrite unrelated work.
5. Push the agreed branch (`git push -u origin main` for an empty destination), then verify the remote and tracking state.
6. Record the repository URL, branch, actual commit, and observed push result in status/handoff.

For a new repository, create the agreed empty GitHub destination using an authenticated available interface, then follow the same connection steps. Do not create a deployment as part of connecting GitHub.
