# pstack-opencode

OpenCode port of [Lauren Tan](https://x.com/poteto)’s
[pstack](https://github.com/cursor/plugins/tree/main/pstack).

> if you want to go fast, go deep first. pstack helps you write less, but higher
> quality code. rigorous agent workflows you can parallelize with confidence.

This package is **host-neutral OpenCode**. It does not depend on Cursor UI,
Claude Code, Codex, or any particular SaaS control plane. Any OpenCode host can
depend on it.

Pinned upstream: **pstack v0.14.5** @ `6fecddb…` — see `UPSTREAM.lock.json`.
Also imports seven MIT skills from `cursor-team-kit`.

## Install (local OpenCode)

```bash
git clone https://github.com/ul8/pstack-opencode.git ~/src/pstack-opencode
cd your-project
~/src/pstack-opencode/scripts/install-local.sh .
# default mandate=opt-in; for always-on:
PSTACK_MANDATE=always-on ~/src/pstack-opencode/scripts/install-local.sh .
opencode
```

Or merge into `opencode.json`:

```jsonc
{
  "plugin": [
    ["/absolute/path/to/pstack-opencode/plugin-v1", { "mandate": "opt-in" }]
  ],
  "skills": {
    "paths": ["/absolute/path/to/pstack-opencode/skills"]
  },
  "instructions": ["/absolute/path/to/pstack-opencode/host-contract.md"]
}
```

Copy or link agents:

```bash
mkdir -p .opencode/agents
cp /path/to/pstack-opencode/agents/*.md .opencode/agents/
```

### Mandate setting

| Value | Behavior |
| --- | --- |
| `opt-in` (default) | No auto inject; invoke `poteto-mode` when you want it |
| `always-on` | Inject short routing mandate + re-inject on compact |

Env override: `PSTACK_MANDATE=opt-in|always-on`.

Hosts that want sticky routing should pass `{ "mandate": "always-on" }` in
plugin options.

### OpenCode v2

```jsonc
{
  "plugins": [
    { "package": "/path/to/pstack-opencode/plugin-v2", "options": { "mandate": "always-on" } }
  ]
}
```

See [docs/opencode-v2-gaps.md](./docs/opencode-v2-gaps.md).

## What’s included

- Full pstack skill tree (poteto-mode + playbooks + principles + workflows)
- Agents: `poteto-agent`, `comment-sicko` (Task/subagent first-class)
- Seven cursor-team-kit skills (`deslop`, `thermo-nuclear-code-quality-review`, …)
- plugin-v1 + plugin-v2
- [host-contract.md](./host-contract.md) — fail-closed OpenCode bindings

## What’s not included

- Benny Slack automations
- Cursor sticky-mode UI / cloud VMs / control-cli
- Silent one-model “panels” — multi-model skills fail closed without ≥2 lanes

## Smoke

```bash
node scripts/smoke-plugin.mjs
```

## License

MIT. Upstream pstack © Lauren Tan. cursor-team-kit skills © their authors.
See [NOTICE.md](./NOTICE.md). No package author field.

## Research notes

Design research for this port (standalone, no host-product coupling) lives in
[`docs/`](./docs/README.md): upstream pin, ports survey, OpenCode v1/v2 surfaces,
substitution table, cannot-port list, install layouts, and PLAN.
