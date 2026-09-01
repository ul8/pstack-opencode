# What cannot be ported faithfully

## Hard no (do not fake)

| Capability | Why |
| --- | --- |
| Cursor sticky-mode chrome (`mode` / `icon` / `color` / `reminder`) | Cursor UI only |
| Cursor cloud VMs (`environment: "cloud"`) | Isolation is the host’s job (local OpenCode, Docker, etc.) |
| Benny as Cursor event-triggered Slack automation | No Cursor automations bus in OpenCode |
| Driving Cursor Electron (`control-cli` / `control-ui`) | Not present |
| Cursor closed-source `/babysit` binary | Reimplement with `gh` + loop **only if** those tools exist; otherwise document dropout |
| Perfect Codex hook-trust receipts / OS jail | Different host; approximate with permissions, don’t claim receipts |
| Perfect 1:1 SessionStart semantics | Approximate with plugin inject + compact hooks |
| Claiming multi-model arena/interrogate while only one model lane exists | **Fail closed** — report dropout |
| Claiming Task/subagent fan-out while the host denies `task` | **Fail closed** — serial in-parent + report |

## Soft approximate

| Upstream | OpenCode approximation |
| --- | --- |
| Sticky poteto-mode | Plugin mandate (`opt-in` / `always-on`) + compact re-inject |
| `Task` + `poteto-agent` | OpenCode `task` + agents `poteto-agent` / `comment-sicko` when allowed |
| `AskQuestion` | Plain clarifying question (or host `question` tool if present) |
| `/loop` / babysit | Explicit loop skill / session.idle / `gh` polling — host-dependent |
| `control-cli` verify | `bash` + project verify skills + browser MCP if configured |
| Transcripts / recall | `$XDG_DATA_HOME/opencode` or `~/.local/share/opencode` |
| Model role map | `setup-pstack` → `.opencode/pstack-models.md` |
| Worktree per child | Prefer serial children, or host-minted worktrees |

## Portable (keep close to poteto)

| Content | Notes |
| --- | --- |
| Principle skills | Keep principle text; rewrite tool bindings only |
| Playbooks | Markdown under poteto-mode |
| Workflow skills | OpenCode tools: `read`, `grep`, `glob`, `edit`, `write`, `bash`, `skill`, `task`, `webfetch` |
| Doctrine | Less code, higher quality, verifiable work, then parallelism |
| Parent authority | Parent session owns push/PR/secrets unless host overlay says otherwise |
| NOTICE / MIT | Lauren Tan pstack + cursor-team-kit imports |
