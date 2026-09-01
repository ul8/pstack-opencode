# Host contract (OpenCode)

pstack-opencode is host-neutral doctrine with OpenCode bindings. Fail closed when
a capability is missing. Never claim a child, review, transcript, or live check
happened unless the host reported it.

## Tools

| Intent | OpenCode |
| --- | --- |
| Delegate child | `task` → agent `poteto-agent`, `comment-sicko`, `explore`, `general`, … |
| Load workflow | `skill` |
| Shell | `bash` |
| Read / search | `read`, `grep`, `glob` |
| Edit | `edit`, `write` |
| Web | `webfetch` (when allowed) |
| User question | plain text, or host `question` tool if present |

If `task` is denied: stay in-parent, run serial playbook steps, and **report**
that panels/children are unavailable. Do not invent parallel results.

When spawning a child, pass OpenCode fields only: agent (`poteto-agent`,
`comment-sicko`, `explore`, `general`, …), a standalone brief, and `model` when
the role map names one. Never Cursor Task fields (subagent type, cloud
environment, cloud base branch). Isolation is the host’s job (local session,
worktree, or Docker).

## Roles → OpenCode agents

| pstack role | OpenCode mapping |
| --- | --- |
| owner / implementer | primary session or `poteto-agent` |
| explorer / watcher | `explore` or read-only `task` |
| planner / designer / researcher / synthesizer | `task` with a standalone brief |
| reviewer (comments) | `comment-sicko` (edit/write denied) |
| mechanical | in-parent or narrowly scoped `task` |

Every child brief must stand alone: goal, role, writable scope, acceptance,
verification, forbidden scope, report format.

## Models / panels

Model inventory is not model delegation. Arena / interrogate / multi-critic
panels require **≥2 configured model lanes**. If fewer lanes exist, record
dropouts and stop that arm — do not silently collapse to one model while
claiming a panel.

Role→model map: `.opencode/pstack-models.md` or
`~/.config/opencode/pstack-models.md` (see `setup-pstack`).

## Parent authority

The parent session owns integration, git push, PR open, and secrets unless the
host explicitly documents otherwise. Children get narrow permissions and
standalone briefs. Hosts that own git outside the agent (e.g. a control plane)
should state that in an overlay; this package does not hardcode any SaaS.

## Verify

“Done” means verified on the real app path the change affects — not “tests
passed” alone. Prefer project `verify-*` skills, then bash, then browser MCP if
present. If you cannot drive the app, say so.

## Transcripts / recall

OpenCode data lives under `$XDG_DATA_HOME/opencode` or
`~/.local/share/opencode` (including `opencode.db`). Do not assume Cursor or
Claude paths. Docker/ephemeral homes may wipe history on recycle.

## Mandate plugin

| Option | Behavior |
| --- | --- |
| `mandate: "opt-in"` (default) | No auto inject; user invokes `poteto-mode` |
| `mandate: "always-on"` | Inject short routing mandate on session + re-inject on compact |

Env override: `PSTACK_MANDATE=opt-in|always-on`.

## Not provided

Cursor sticky UI, Cursor cloud VMs, Benny Slack automations, Cursor control-cli/ui,
closed-source babysit binaries, Codex hook-trust receipts.
