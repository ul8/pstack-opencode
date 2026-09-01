/** Shared mandate text + option resolution for pstack-opencode plugins. */

export const MANDATE_OPT_IN = "opt-in"
export const MANDATE_ALWAYS_ON = "always-on"

/**
 * @param {Record<string, unknown> | undefined} options
 * @param {NodeJS.ProcessEnv} [env]
 */
export function resolveMandateMode(options = {}, env = process.env) {
  const fromEnv = (env.PSTACK_MANDATE || env.PSTACK_OPENCODE_MANDATE || "")
    .trim()
    .toLowerCase()
  if (fromEnv === MANDATE_ALWAYS_ON || fromEnv === "always_on" || fromEnv === "on") {
    return MANDATE_ALWAYS_ON
  }
  if (fromEnv === MANDATE_OPT_IN || fromEnv === "opt_in" || fromEnv === "off") {
    return MANDATE_OPT_IN
  }
  const raw = String(options.mandate ?? options.mode ?? MANDATE_OPT_IN)
    .trim()
    .toLowerCase()
  if (raw === MANDATE_ALWAYS_ON || raw === "always_on" || raw === "on") {
    return MANDATE_ALWAYS_ON
  }
  return MANDATE_OPT_IN
}

export function mandateText() {
  return `## pstack-opencode mandate

You have access to the pstack-opencode skill tree (poteto-mode, principles, playbooks).

For **non-trivial engineering work** (features, refactors, bugfixes, investigations, PRs, verification):
1. Load the \`poteto-mode\` skill before planning or editing.
2. Match a playbook, copy steps into a task list, run skills as steps fire.
3. Prefer less code, higher quality, and verified outcomes over drive-by churn.
4. Spawn role-pinned agents via the \`task\` tool (\`poteto-agent\`, \`comment-sicko\`, explore) with standalone briefs when the host allows \`task\`. If \`task\` is denied, stay serial in-parent and report the dropout — never invent parallel results.
5. Multi-model panels (arena / interrogate) require ≥2 model lanes; otherwise record dropouts and fail closed.
6. Verify on the real app path. "Tests passed" alone is not done.
7. Parent session owns git push / PR / secrets unless the host overlay says otherwise.

For **trivial** work (typo, one-line rename, pure question): skip poteto-mode.

Explicit user instructions override this mandate. Children spawned via \`task\` ignore this mandate and follow their brief only.
`
}

export function compactReminder(playbook = "") {
  const pb = playbook ? ` Active playbook: ${playbook}.` : ""
  return `pstack-opencode still applies after compaction.${pb} Re-read poteto-mode if needed. Keep verification ownership. Fail closed on missing task/panels.`
}
