---
name: get-pr-comments
description: Fetch and summarize review comments from the active pull request
---

> **OpenCode host:** Use OpenCode tools (`task`, `skill`, `bash`, `read`, `edit`, `write`, `grep`, `glob`, `webfetch`). Spawn `poteto-agent` / `comment-sicko` via the `task` tool. If `task` is denied, stay in-parent and report the dropout — do not fake a panel. See `host-contract.md`.

# Get PR comments

## Trigger

Need a concise, actionable summary of feedback on the active pull request.

## Workflow

1. Resolve the active PR for the current branch.
2. Fetch review comments and discussion comments.
3. Group feedback by severity and actionability.
4. Return a concise action list.

## Output

- Grouped feedback summary
- Action list ordered by priority
- Open questions that still need clarification