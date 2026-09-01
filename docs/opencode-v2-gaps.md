# OpenCode v2 gaps (pstack-opencode)

OpenCode 2.0 plugin APIs are **beta**. This package ships `plugin-v2/` so the
port is dual-stack ready. Behavior parity with v1 is best-effort.

## Verified against

`@opencode-ai/plugin@1.18.25` promise v2 types (`define` + `setup(ctx)`).

## Mapped

| v1 hook | v2 attempt |
| --- | --- |
| `experimental.chat.system.transform` | `ctx.agent.transform` mutate `system`/`prompt` |
| `experimental.session.compacting` | `ctx.session.hook("context")` when present |

## Likely gaps (fail soft, document)

- `session.hook` may be missing on some beta builds — compact re-inject skipped.
- Agent draft field names (`system` vs `prompt`) may change — transform is
  defensive and may no-op.
- Event pump for `session.created` is not required for always-on mandate when
  agent.transform runs each turn.
- Config key must be `plugins` (plural) on v2 hosts; example:

```jsonc
{
  "plugins": [
    { "package": "pstack-opencode/plugin-v2", "options": { "mandate": "always-on" } }
  ]
}
```

When a hook cannot be expressed, we **do not** silently claim sticky mandate.
Check plugin load logs; use `mandate: "opt-in"` and invoke `poteto-mode` manually
if transforms no-op.
