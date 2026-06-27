import type { ZiweiChart, ZiweiPalace, ZiweiProfile, ChartMeta } from "./types.js";
import type { ZiweiInput } from "../shared/schema.js";

function stars(value: unknown): Array<any> {
  return Array.isArray(value) ? value : [];
}

export function normalizeIztroChart(raw: any, input: ZiweiInput, engineVersion = "unknown"): ZiweiChart {
  const profile: ZiweiProfile = {
    solarDate: raw?.solarDate,
    lunarDate: raw?.lunarDate,
    chineseDate: raw?.chineseDate,
    time: raw?.time,
    timeRange: raw?.timeRange,
    sign: raw?.sign,
    zodiac: raw?.zodiac,
    soulPalaceBranch: raw?.earthlyBranchOfSoulPalace,
    bodyPalaceBranch: raw?.earthlyBranchOfBodyPalace,
    soul: raw?.soul,
    body: raw?.body,
    fiveElementsClass: raw?.fiveElementsClass
  };

  const palaces: ZiweiPalace[] = Array.isArray(raw?.palaces)
    ? raw.palaces.map((p: any) => ({
        name: p?.name,
        isBodyPalace: p?.isBodyPalace,
        isOriginalPalace: p?.isOriginalPalace,
        heavenlyStem: p?.heavenlyStem,
        earthlyBranch: p?.earthlyBranch,
        majorStars: stars(p?.majorStars),
        minorStars: stars(p?.minorStars),
        adjectiveStars: stars(p?.adjectiveStars),
        changsheng12: p?.changsheng12,
        boshi12: p?.boshi12,
        jiangqian12: p?.jiangqian12,
        suiqian12: p?.suiqian12,
        stage: p?.stage,
        ages: Array.isArray(p?.ages) ? p.ages : undefined
      }))
    : [];

  const meta: ChartMeta = {
    engine: "iztro",
    engineVersion,
    generatedAt: new Date().toISOString(),
    input,
    assumptions: [
      "Phase 1 does not convert civil time to true solar time.",
      "Ziwei chart data is generated through iztro only.",
      "AI interpretation is intentionally excluded from this chart-generation layer.",
      "If input is near a time-boundary, verify timeIndex and any true-solar-time conversion before interpretation."
    ]
  };

  return {
    meta,
    profile,
    palaces,
    raw
  };
}
