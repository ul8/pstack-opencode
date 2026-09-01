# OpenCode v2 surface (beta)

OpenCode 2.0 is beta. **V1 plugin code does not run on v2.** This package ships
`plugin-v2/` as a sibling. See [opencode-v2-gaps.md](./opencode-v2-gaps.md).

Sources:

- https://opencode.ai/v2/docs/migrate-v1/
- https://opencode.ai/v2/docs/build/plugins/
- [oh-my-opencode-slim opencode-v2 compatibility](https://github.com/alvinunreal/oh-my-opencode-slim/blob/master/docs/opencode-v2-compatibility.md)

## Side-by-side

| Flavor | CLI |
| --- | --- |
| V1 | `opencode` |
| V2 | `opencode2` (beta) |

## Config deltas that matter

| V1 | V2 |
| --- | --- |
| `plugin` | `plugins` |
| Tuple `["./x", { opts }]` | `{ package: "./x", options: { opts } }` |
| `.opencode/plugin/` | Prefer `.opencode/plugins/` |
| `permission` map | Ordered `permissions`; `bash`→`shell`, `task`→`subagent`, … |
| `agent` map | `agents`; `prompt`→`system` |
| Skill dirs `skill/` | Prefer `skills/`; both often still discovered |

## V2 plugin shape (promise)

```ts
export default {
  id: "pstack-opencode",
  async setup(ctx) { /* … */ }
}
```

This package avoids a hard import of `@opencode-ai/plugin` in v2 so installs stay
light; hosts validate the `{ id, setup }` shape. Agent/system inject and compact
re-inject are best-effort against beta APIs — gaps are documented, not silent.
