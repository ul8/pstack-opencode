# Existing pstack ports

Researched: **2026-08-30**. Do not vendor blindly.

## Comparison

| Repo | Target | What it is | What it rewrote |
| --- | --- | --- | --- |
| [ericlitman/open-pstack](https://github.com/ericlitman/open-pstack) | Claude Code + Codex | Editorial port; tracked pstack v0.14.3 | Cursor → Claude/Codex; SessionStart mandate; 7 kit skills; `CHANGES` / `UPSTREAM` / `NOTICE` |
| [michael-denyer/pstack-claude](https://github.com/michael-denyer/pstack-claude) | Claude / Codex / Prime | Ancestor of open-pstack | Same class of substitutions; SessionStart mandate |
| [Aqua-123/pstack-for-codex](https://github.com/Aqua-123/pstack-for-codex) | Codex-native | Marketplace plugin; playbooks + skills | `$poteto-mode`; TOML agent profiles; hook-trust; parent authority; Bun scripts; Benny paused |
| [sm0ol/pstack-codex](https://github.com/sm0ol/pstack-codex) | Codex | Thinner marketplace | Namespaced `$pstack-codex:*` |
| [shrimpwtf/oh-my-pstack](https://github.com/shrimpwtf/oh-my-pstack) | Pi / OMP / Claude / Codex / **OpenCode** | Host-neutral skills dump + `pstack-pi` | OpenCode = `cp` skills only; **no** plugin hooks; **no** OpenCode agents |
| [kkgogogo17/pi-pstack](https://github.com/kkgogogo17/pi-pstack) | Pi | Pi-native agents + sticky `/poteto-mode` | Pi package + model map |

## Dual-stack OpenCode reference (not a pstack port)

[alvinunreal/oh-my-opencode-slim](https://github.com/alvinunreal/oh-my-opencode-slim) `docs/opencode-v2-compatibility.md` — dual v1/v2 plugin packaging (`{ id, server, setup }`). Study; don’t copy blindly.

## Why not “just cp skills” (oh-my-pstack gap)

1. No SessionStart / sticky analog.
2. Skill bodies don’t name OpenCode tools.
3. No first-class `poteto-agent` / `comment-sicko` OpenCode agents.
4. No provider-dispatch for arena / interrogate panels.
5. No parent-authority / isolation contract wired to OpenCode.
6. Manual `cp`, collision risk.
7. Recall doesn’t know OpenCode’s data dir.
8. Compaction drops mandate without a plugin re-inject.

## Patterns worth borrowing

| Pattern | Source |
| --- | --- |
| Upstream pin discipline | open-pstack `UPSTREAM.md` |
| Short sticky mandate | open-pstack / pstack-claude SessionStart |
| Parent keeps git/PR/secrets | pstack-for-codex adaptation docs |
| Fail closed on missing lanes | pstack-for-codex |
| Host-neutral role table | oh-my-pstack `runtime.md` |
| OpenCode v1+v2 dual export | oh-my-opencode-slim |
