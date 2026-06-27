import { Command } from "commander";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { generateZiweiChart } from "./index.js";
import type { ZiweiInput } from "./shared/schema.js";

const program = new Command();

program
  .name("mingli-engine")
  .description("Auditable chart engine. Phase 1: Zi Wei Dou Shu via iztro.")
  .version("0.1.0");

program
  .command("ziwei")
  .description("Generate Zi Wei Dou Shu chart JSON")
  .option("--solar <date>", "Solar date, e.g. 2000-08-16")
  .option("--lunar <date>", "Lunar date, e.g. 2000-07-17")
  .requiredOption("--time-index <number>", "Chinese time index used by iztro, e.g. 2")
  .requiredOption("--gender <gender>", "男 or 女")
  .option("--locale <locale>", "Locale", "zh-CN")
  .option("--out <path>", "Write JSON to file")
  .action((opts) => {
    if (opts.solar && opts.lunar) {
      throw new Error("Use either --solar or --lunar, not both.");
    }

    if (!opts.solar && !opts.lunar) {
      throw new Error("Missing --solar or --lunar.");
    }

    const input: ZiweiInput = {
      calendar: opts.solar ? "solar" : "lunar",
      date: opts.solar ?? opts.lunar,
      timeIndex: Number(opts.timeIndex),
      gender: opts.gender,
      locale: opts.locale,
      options: {}
    };

    const chart = generateZiweiChart(input);
    const json = JSON.stringify(chart, null, 2);

    if (opts.out) {
      mkdirSync(dirname(opts.out), { recursive: true });
      writeFileSync(opts.out, json, "utf8");
      console.log(`Wrote ${opts.out}`);
    } else {
      console.log(json);
    }
  });

program.parseAsync();
