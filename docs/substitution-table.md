# Substitution table

Sources: open-pstack reference docs, oh-my-pstack runtime contract, OpenCode docs.

| Cursor | Claude / Codex ports | OpenCode (this package) |
| --- | --- | --- |
| `Task` + `subagent_type` | Claude `Agent`; Codex `spawn_agent` / `wait_agent` | OpenCode `task` + custom agents; **fail closed** if host denies `task` |
| `subagent_type: poteto-agent` | Shipped agent / “read poteto-mode first” | `agents/poteto-agent.md` via `task` |
| `Comment Sicko` | `comment-sicko` | `agents/comment-sicko.md` (edit/write denied) |
| `AskQuestion` | `AskUserQuestion` or plain text | Plain clarifying question / host `question` if any |
| `/loop` | Host loop skill | Explicit loop / idle watcher — host-dependent |
| `/babysit` | `gh` + loop | Same; do not pretend Cursor’s binary exists |
| `control-cli` / `control-ui` | run / verify / browser MCP | `bash` + verify skills + browser MCP if present |
| Transcripts `~/.cursor/projects/*/` | Claude jsonl / Codex history | `~/.local/share/opencode/` (or `$XDG_DATA_HOME/opencode`) |
| MCP via Cursor `mcps/` | `mcp__*` / `.mcp.json` | OpenCode MCP config |
| Cloud agents | Local background + worktrees | **Host isolation** (local or Docker). Do not invent a second cloud |
| Sticky mode UI | SessionStart hook mandate | Plugin mandate inject + compact re-inject |
| Model rule `~/.cursor/rules/…` | Claude/Codex profiles | `setup-pstack` → `.opencode/pstack-models.md` |
| Cursor automations (Benny) | Omitted or polling | **Omit** |
| Parent git/PR authority | Codex parent task | Parent session / host overlay |
| Skills install | Marketplace / cp | `skills.paths` + agents under `.opencode/agents/` |
| Plugin hooks | Claude / Codex hooks | `@opencode-ai/plugin` v1; v2 sibling |

## Canonical roles → OpenCode

| Role | Behavior | Mapping |
| --- | --- | --- |
| explorer / watcher | read-only / one transition | `explore` or read-only `task`; or in-parent |
| planner / designer / researcher / synthesizer | analysis | `task` with standalone brief |
| reviewer | independent review | `comment-sicko` |
| implementer / owner | bounded writes / lifecycle | primary session or `poteto-agent` |
| mechanical | low-judgment edits | in-parent or narrow `task` |
