# OpenCode v1 surface

Targeted while developing this package against OpenCode **1.18.x**
(`@opencode-ai/plugin` types from 1.18.25). Prefer live types on your install
when they disagree.

Public docs:

- https://opencode.ai/docs/plugins/
- https://opencode.ai/docs/agents/
- https://opencode.ai/docs/skills/

## Skills

| Location | Notes |
| --- | --- |
| `.opencode/skills/<name>/SKILL.md` | Preferred |
| `.opencode/skill/<name>/SKILL.md` | Also discovered |
| `~/.config/opencode/skills/` | User global |
| Config `skills.paths` | Absolute/extra trees (this package uses this) |

Frontmatter: `name`, `description`, optional `license`, `compatibility`,
`metadata`. Native `skill` tool loads them.

## Agents

| Kind | Notes |
| --- | --- |
| Built-in primary | `build` / `plan` |
| Built-in subagents | `general` / `explore` / … via `task` |
| Custom | `.opencode/agents/<name>.md` or `agent` map in config |
| Invoke | `task` tool, `@mention`, or host `session.prompt({ agent })` |

This package ships `poteto-agent` and `comment-sicko` as subagents.

## Plugins (v1)

Config key: **`plugin`** — package strings or `[path, options]` tuples.

```ts
export type Plugin = (input: PluginInput, options?: PluginOptions) => Promise<Hooks>
```

Hooks used by pstack-opencode:

| Hook | Use |
| --- | --- |
| `experimental.chat.system.transform` | Inject mandate when `always-on` |
| `experimental.session.compacting` | Re-inject mandate + compact reminder |
| `event` | Track `session.created` / `session.compacted` (best effort) |
| `config` | Record plugin meta |

Also available (not required): `chat.message`, `tool.execute.before/after`,
`permission.ask`, etc.

## History

Default: `~/.local/share/opencode/` (or `$XDG_DATA_HOME/opencode`), including
`opencode.db`. Ephemeral if the home dir is wiped with the container.

## Permissions relevant to pstack

If the host sets `permission.task: deny` (or equivalent), multi-agent playbooks
must run serial in-parent and **report** the dropout. This package does not
force-enable `task`.
