---
name: setup-pstack
description: Configure which models pstack-opencode uses per role. Detects available OpenCode models and writes a project or user model map. Use for setup-pstack, "configure pstack models", or changing pstack model choices.
---

> **OpenCode host:** Write OpenCode-visible config only. Do not write `~/.cursor/rules`.

# Setup pstack (OpenCode)

Write a model-role map that poteto-mode and panel skills can read. Prefer a
**project** file so teammates share it; fall back to a user file.

## Target files (first that the user accepts)

1. `.opencode/pstack-models.md` in the current project (preferred)
2. `~/.config/opencode/pstack-models.md` (user default)

Also remind the user they can set plugin options in `opencode.json`:

```jsonc
{
  "plugin": [
    ["../path/to/pstack-opencode/plugin-v1", { "mandate": "opt-in" }]
  ]
}
```

`mandate`: `opt-in` (default) | `always-on`

## Steps

### 1. Detect available models

List model ids this OpenCode session can use (from `/models`, config providers,
or the user paste). Never write a slug you have not confirmed. Aliases
`inherit-parent` and `auto` are always valid.

### 2. Load current state

If a target file already exists, treat it as current. Otherwise start from the
defaults below.

### 3. Map and confirm

Show every role with its current model. Ask whether to accept or change roles.
For panel roles the value is a **list** — one child per entry. If fewer than two
distinct models are available for a panel skill, tell the user that arena /
interrogate will **fail closed** until more lanes exist.

### 4. Validate

Every real slug must be in the detected set; `inherit-parent` / `auto` always
pass.

### 5. Write the map

Overwrite the chosen file idempotently:

```markdown
# pstack model configuration (OpenCode)
# One line per role. Delete a line to fall back to skill defaults.
# `inherit-parent` or `auto`: role runs on the parent session model.
feature, refactoring: inherit-parent
bug-fix: inherit-parent
perf-issue: inherit-parent
hillclimb: inherit-parent
judgment and prose: inherit-parent
hardest tasks: inherit-parent
how explorer: inherit-parent
how explainer: inherit-parent
how critics: inherit-parent
why investigators: inherit-parent
why synthesizer: inherit-parent
reflect tooling: inherit-parent
reflect judgment, divergent, synthesizer: inherit-parent
arena runners: inherit-parent
arena cross-judge pool: inherit-parent
swarm workers: inherit-parent
architect runners: inherit-parent
interrogate reviewers: inherit-parent
```

Replace `inherit-parent` with concrete ids when the user picks them.

### 6. Confirm

Tell the user which file was written and that new sessions pick it up. Offer
`create-verification-skill` once if the project has no verify harness.
