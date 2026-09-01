# Install layouts (vanilla OpenCode)

## Recommended: path-based plugin + skills.paths

```bash
git clone https://github.com/ul8/pstack-opencode.git ~/src/pstack-opencode
~/src/pstack-opencode/scripts/install-local.sh /path/to/project
```

Writes/merges `opencode.json`:

```jsonc
{
  "plugin": [
    ["/abs/pstack-opencode/plugin-v1", { "mandate": "opt-in" }]
  ],
  "skills": {
    "paths": ["/abs/pstack-opencode/skills"]
  },
  "instructions": ["/abs/pstack-opencode/host-contract.md"]
}
```

Copies agents into `.opencode/agents/`.

### Always-on mandate

```bash
PSTACK_MANDATE=always-on ./scripts/install-local.sh .
# or plugin options: { "mandate": "always-on" }
# or env: PSTACK_MANDATE=always-on
```

## Alternative: npm / git dependency

Once published:

```jsonc
{
  "plugin": [
    ["pstack-opencode/plugin-v1", { "mandate": "opt-in" }]
  ],
  "skills": {
    "paths": ["./node_modules/pstack-opencode/skills"]
  }
}
```

(Exact npm resolution may require a `file:` or git URL until the package is on a
registry.)

## V2 hosts

```jsonc
{
  "plugins": [
    {
      "package": "/abs/pstack-opencode/plugin-v2",
      "options": { "mandate": "always-on" }
    }
  ]
}
```

## Opt out

- Omit the plugin entry, or set `mandate: "opt-in"` and don’t invoke poteto-mode
- `PSTACK_MANDATE=opt-in`
- Explicit user instructions always win over the mandate
