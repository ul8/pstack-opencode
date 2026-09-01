# PLAN: pstack-opencode

Standalone OpenCode port of Lauren Tan’s pstack. **No host product coupling.**

## Locked decisions

| Item | Decision |
| --- | --- |
| Name | `pstack-opencode` |
| GitHub | `ul8/pstack-opencode` |
| Mandate | Setting: default **opt-in**; hosts may set **always-on** |
| Upstream | pstack **v0.14.5** @ `6fecddb…` |
| Task / subagents | First-class; fail closed if host denies `task` |
| cursor-team-kit | Import 7 MIT skills |
| Benny | Omit |
| License | MIT; NOTICE attributes Lauren Tan; **no package author** |
| Scope | Full skill tree + agents + plugin-v1 + plugin-v2 |

## Goals (done)

1. Full port at 0.14.5 + kit skills  
2. OpenCode tool bindings + host-contract  
3. plugin-v1 + plugin-v2; mandate opt-in/always-on  
4. Agents `poteto-agent`, `comment-sicko`  
5. Local smoke (`scripts/smoke-plugin.mjs`)  
6. User README + NOTICE  

## Non-goals

- Benny / Cursor sticky UI / Cursor cloud / control-cli  
- Silent one-model “panels”  
- Hardcoding any SaaS control plane inside the package  

## Layout

```text
pstack-opencode/
  README.md
  NOTICE.md
  LICENSE
  UPSTREAM.lock.json
  host-contract.md
  skills/
  agents/
  plugin-v1/
  plugin-v2/
  scripts/
  config/
  docs/                 # this research pack
```

## Mandate

| Mode | Behavior |
| --- | --- |
| `opt-in` (default) | No auto inject |
| `always-on` | System inject + compact re-inject |

## Status

Phase C implemented. Runtime bindings rewritten for OpenCode (`task` agents,
skill/agent paths, plugin package.json). Local smoke: `node scripts/smoke-plugin.mjs`.
