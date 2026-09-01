/**
 * pstack-opencode — OpenCode v1 plugin
 *
 * Options:
 *   { mandate: "opt-in" | "always-on" }   default opt-in
 *
 * Env:
 *   PSTACK_MANDATE=opt-in|always-on
 */

import {
  MANDATE_ALWAYS_ON,
  compactReminder,
  mandateText,
  resolveMandateMode,
} from "./mandate.js"

/**
 * @param {import("@opencode-ai/plugin").PluginInput} input
 * @param {Record<string, unknown>} [options]
 * @returns {Promise<import("@opencode-ai/plugin").Hooks>}
 */
export async function pstackOpencodePlugin(input, options = {}) {
  const mode = resolveMandateMode(options)
  const alwaysOn = mode === MANDATE_ALWAYS_ON

  /** @type {Map<string, { playbook?: string }>} */
  const sessions = new Map()

  return {
    async config(cfg) {
      // Ensure custom agents are visible when plugin loads from a package path.
      // OpenCode also discovers agents/ next to project config; document copy/link in README.
      cfg.plugin_meta ??= {}
      cfg.plugin_meta["pstack-opencode"] = {
        mandate: mode,
        version: "0.1.0",
      }
    },

    async event({ event }) {
      if (!event || typeof event !== "object") return
      const type = event.type
      if (type === "session.created") {
        const id = event.properties?.sessionID || event.properties?.info?.id
        if (id) sessions.set(id, {})
      }
      if (type === "session.compacted") {
        const id = event.properties?.sessionID
        if (id && !sessions.has(id)) sessions.set(id, {})
      }
    },

    "experimental.chat.system.transform": async (inputArgs, output) => {
      if (!alwaysOn) return
      // Skip injecting into known child/subagent names if provided
      // (agent field not always present on this hook — best effort).
      const text = mandateText()
      if (!output.system.includes(text)) {
        output.system.push(text)
      }
    },

    "experimental.session.compacting": async (inputArgs, output) => {
      if (!alwaysOn) return
      const state = sessions.get(inputArgs.sessionID) || {}
      output.context.push(compactReminder(state.playbook || ""))
      output.context.push(mandateText())
    },
  }
}

/** Default OpenCode v1 export */
export default pstackOpencodePlugin

/** Dual-loader shape used by some hosts */
export const id = "pstack-opencode"
export const server = pstackOpencodePlugin
