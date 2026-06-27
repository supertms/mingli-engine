import type { ZiweiInput } from "../shared/schema.js";

export interface ChartMeta {
  engine: "iztro";
  engineVersion: string;
  generatedAt: string;
  input: ZiweiInput;
  assumptions: string[];
}

export interface ZiweiProfile {
  solarDate?: string;
  lunarDate?: string;
  chineseDate?: string;
  time?: string;
  timeRange?: string;
  sign?: string;
  zodiac?: string;
  soulPalaceBranch?: string;
  bodyPalaceBranch?: string;
  soul?: string;
  body?: string;
  fiveElementsClass?: string;
}

export interface ZiweiStar {
  name: string;
  type?: string;
  scope?: string;
  brightness?: string;
  mutagen?: string;
}

export interface ZiweiPalace {
  name: string;
  isBodyPalace?: boolean;
  isOriginalPalace?: boolean;
  heavenlyStem?: string;
  earthlyBranch?: string;
  majorStars: ZiweiStar[];
  minorStars: ZiweiStar[];
  adjectiveStars: ZiweiStar[];
  changsheng12?: string;
  boshi12?: string;
  jiangqian12?: string;
  suiqian12?: string;
  stage?: unknown;
  ages?: number[];
}

export interface ZiweiChart {
  meta: ChartMeta;
  profile: ZiweiProfile;
  palaces: ZiweiPalace[];
  raw: unknown;
}
