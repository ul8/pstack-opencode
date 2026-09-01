# Upstream pstack pin

Researched: **2026-08-30**. Locked to then-current release.

## Pin

| Field | Value |
| --- | --- |
| Repository | `https://github.com/cursor/plugins.git` |
| Path | `pstack/` |
| Version | **0.14.5** (`pstack/.cursor-plugin/plugin.json`) |
| Commit | `6fecddba65801f9b9c08b8b328d998ee5b09d290` |
| Subject | `fix(pstack): register make-bot-ui at skills root (#275)` |
| Date | 2026-08-27 |
| License | MIT — Copyright (c) 2026 Lauren Tan |

Machine-readable: [`../UPSTREAM.lock.json`](../UPSTREAM.lock.json).

## cursor-team-kit imports (MIT, same repo/commit)

- `deslop`
- `thermo-nuclear-code-quality-review`
- `make-pr-easy-to-review`
- `fix-ci`
- `fix-merge-conflicts`
- `get-pr-comments`
- `what-did-i-get-done`

## Inventory at pin (as shipped in this package)

| Kind | Count |
| --- | --- |
| Skill directories | **52** (45 from pstack + 7 kit) |
| `principle-*` skills | **21** |
| poteto-mode playbooks | **23** |
| Agents | `poteto-agent`, `comment-sicko` |

## Drift

`origin/main` may move past `6fecddb` without bumping pstack. Re-check
`pstack/.cursor-plugin/plugin.json` `version` before each upstream sync.
