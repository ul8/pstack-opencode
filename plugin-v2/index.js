/**
 * pstack-opencode — OpenCode v2 (beta) plugin sibling
 * Shape: { id, setup }. See docs/opencode-v2-gaps.md.
 * Options: { mandate: "opt-in" | "always-on" }
 */

import {
  MANDATE_ALWAYS_ON,
  compactReminder,
  mandateText,
  resolveMandateMode,
} from "../plugin-v1/mandate.js"

function optionsFrom(ctx) {
  return (ctx && (ctx.options || ctx.config || {})) || {}
}

const plugin = {
  id: "pstack-opencode",
  async setup(ctx) {
    const mode = resolveMandateMode(optionsFrom(ctx))
    if (mode !== MANDATE_ALWAYS_ON) return

    if (ctx?.agent?.transform) {
      ctx.agent.transform((draft) => {
        try {
          if (!draft || typeof draft !== "object") return draft
          if (typeof draft.system === "string") {
            if (!draft.system.includes("pstack-opencode mandate")) {
              draft.system = `${draft.system}\n\n${mandateText()}`
            }
          } else if (Array.isArray(draft.system)) {
            draft.system.push(mandateText())
          } else if (typeof draft.prompt === "string") {
            draft.prompt = `${draft.prompt}\n\n${mandateText()}`
          } else {
            draft.system = mandateText()
          }
        } catch {
          /* fail soft */
        }
        return draft
      })
    }

    if (ctx?.session?.hook) {
      ctx.session.hook("context", (parts) => {
        try {
          const text = `${compactReminder()}\n${mandateText()}`
          if (Array.isArray(parts)) parts.push({ type: "text", text })
        } catch {
          /* ignore */
        }
        return parts
      })
    }
  },
}

export default plugin
export const id = plugin.id
export const setup = plugin.setup
