import path from "node:path"
import fs from "node:fs"
import { pathToFileURL } from "node:url"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")

const { resolveMandateMode, mandateText, MANDATE_ALWAYS_ON } = await import(
  pathToFileURL(path.join(root, "plugin-v1/mandate.js")).href
)

console.assert(resolveMandateMode({}) === "opt-in", "default opt-in")
console.assert(resolveMandateMode({ mandate: "always-on" }) === MANDATE_ALWAYS_ON)
console.assert(resolveMandateMode({}, { PSTACK_MANDATE: "always-on" }) === MANDATE_ALWAYS_ON)
console.assert(mandateText().includes("poteto-mode"), "mandate mentions poteto-mode")

for (const rel of ["plugin-v1/package.json", "plugin-v2/package.json"]) {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"))
  console.assert(pkg.type === "module", `${rel} is ESM`)
  console.assert(pkg.main === "index.js", `${rel} main`)
}

const mod = await import(pathToFileURL(path.join(root, "plugin-v1/index.js")).href)
const hooks = await mod.default(
  { directory: root, worktree: root, project: { id: "smoke" } },
  { mandate: "always-on" },
)

console.assert(typeof hooks["experimental.chat.system.transform"] === "function", "system transform")
console.assert(typeof hooks["experimental.session.compacting"] === "function", "compacting")

const system = []
await hooks["experimental.chat.system.transform"]({}, { system })
console.assert(system.length === 1 && system[0].includes("pstack-opencode mandate"), "injected")

const context = []
await hooks["experimental.session.compacting"]({ sessionID: "s1" }, { context })
console.assert(context.length >= 1, "compact context")

const hooks2 = await mod.default({ directory: root, worktree: root, project: {} }, {})
const system2 = []
if (hooks2["experimental.chat.system.transform"]) {
  await hooks2["experimental.chat.system.transform"]({}, { system: system2 })
}
console.assert(system2.length === 0, "opt-in injects nothing")

const v2 = await import(pathToFileURL(path.join(root, "plugin-v2/index.js")).href)
console.assert(v2.id === "pstack-opencode", "v2 id")
console.assert(typeof v2.setup === "function", "v2 setup")
const v2Default = v2.default
console.assert(v2Default && v2Default.id === "pstack-opencode", "v2 default id")
await v2Default.setup({
  options: { mandate: "always-on" },
  agent: { transform: (fn) => fn({ system: "" }) },
})

const skillCount = fs.readdirSync(path.join(root, "skills")).length
console.assert(skillCount === 52, `expected 52 skill dirs, got ${skillCount}`)

const leftover = [
  "playbooksbabysit",
  "subagent_type",
  'environment: "cloud"',
  "cloud_base_branch",
  "~/.cursor/projects",
  ".cursor/skills",
  "~/.cursor/skills",
  "~/.cursor/plugins",
  "Cursor's built-in",
  "Cursor cloud",
  "cursor-team-kit plugin",
]
const runtimeRoots = ["skills", "agents", "plugin-v1", "plugin-v2", "scripts"]
const hits = []

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      walk(p)
      continue
    }
    if (!/\.(md|js|mjs|sh)$/.test(ent.name)) continue
    if (p.includes("smoke-plugin")) continue
    const text = fs.readFileSync(p, "utf8")
    for (const needle of leftover) {
      if (text.includes(needle)) hits.push(`${path.relative(root, p)}: ${needle}`)
    }
  }
}

for (const rel of runtimeRoots) walk(path.join(root, rel))
if (hits.length) {
  console.error("leftover Cursor bindings in runtime files:")
  for (const h of hits) console.error("  " + h)
  process.exit(1)
}

console.log(`smoke ok — skill dirs: ${skillCount}`)
