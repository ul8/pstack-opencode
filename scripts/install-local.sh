#!/usr/bin/env bash
# Wire pstack-opencode into a project for local OpenCode testing.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT="${1:-.}"
PROJECT="$(cd "$PROJECT" && pwd)"
MANDATE="${PSTACK_MANDATE:-opt-in}"

mkdir -p "$PROJECT/.opencode/agents"
cp -f "$ROOT/agents/poteto-agent.md" "$PROJECT/.opencode/agents/poteto-agent.md"
cp -f "$ROOT/agents/comment-sicko.md" "$PROJECT/.opencode/agents/comment-sicko.md"

CONFIG="$PROJECT/opencode.json"
if [[ -f "$CONFIG" ]]; then
  echo "Note: $CONFIG already exists — writing snippet instead."
  OUT="$PROJECT/opencode.pstack.snippet.json"
else
  OUT="$CONFIG"
fi

cat > "$OUT" <<JSON
{
  "\$schema": "https://opencode.ai/config.json",
  "plugin": [
    ["$ROOT/plugin-v1", { "mandate": "$MANDATE" }]
  ],
  "skills": {
    "paths": ["$ROOT/skills"]
  },
  "instructions": ["$ROOT/host-contract.md"]
}
JSON

echo "Installed pstack-opencode into $PROJECT"
echo "  agents:  .opencode/agents/{poteto-agent,comment-sicko}.md"
echo "  config:  $OUT (mandate=$MANDATE)"
