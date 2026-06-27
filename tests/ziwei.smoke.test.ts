import { describe, expect, it } from "vitest";
import { generateZiweiChart } from "../src/index.js";

describe("ziwei chart generation", () => {
  it("generates a normalized chart through iztro", () => {
    const chart = generateZiweiChart({
      calendar: "solar",
      date: "2000-08-16",
      timeIndex: 2,
      gender: "女",
      locale: "zh-CN",
      options: {}
    });

    expect(chart.meta.engine).toBe("iztro");
    expect(chart.palaces).toHaveLength(12);
    expect(chart.profile.soulPalaceBranch).toBeTruthy();
    expect(chart.profile.bodyPalaceBranch).toBeTruthy();
    expect(chart.profile.fiveElementsClass).toBeTruthy();
  });
});
