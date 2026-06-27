import { createRequire } from "node:module";
import { astro } from "iztro";
import { ZiweiInputSchema, type ZiweiInput } from "../shared/schema.js";
import { normalizeIztroChart } from "./normalize.js";
import type { ZiweiChart } from "./types.js";

const require = createRequire(import.meta.url);

function getIztroVersion(): string {
  try {
    const pkg = require("iztro/package.json");
    return String(pkg.version ?? "unknown");
  } catch {
    return "unknown";
  }
}

/**
 * Generate Zi Wei Dou Shu chart through iztro.
 *
 * Notes for Codex:
 * - Verify the exact iztro v2.x signature after npm install.
 * - Official docs show:
 *   astro.bySolar("2000-8-16", 2, "女")
 *   astro.byLunar("2000-7-17", 2, "女")
 * - Keep all direct iztro calls inside this adapter.
 */
export function generateZiweiChart(input: ZiweiInput): ZiweiChart {
  const parsed = ZiweiInputSchema.parse(input);
  const date = parsed.date;
  const timeIndex = parsed.timeIndex;
  const gender = parsed.gender;

  let raw: unknown;

  if (parsed.calendar === "solar") {
    raw = astro.bySolar(date, timeIndex, gender as any);
  } else {
    raw = astro.byLunar(date, timeIndex, gender as any);
  }

  return normalizeIztroChart(raw, parsed, getIztroVersion());
}
