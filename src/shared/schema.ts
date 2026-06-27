import { z } from "zod";

export const GenderSchema = z.enum(["男", "女"]);

export const CalendarSchema = z.enum(["solar", "lunar"]);

export const ZiweiInputSchema = z.object({
  calendar: CalendarSchema.default("solar"),
  date: z.string().regex(/^\d{4}-\d{1,2}-\d{1,2}$/),
  timeIndex: z.number().int().min(0).max(12),
  gender: GenderSchema,
  locale: z.string().default("zh-CN"),
  options: z
    .object({
      useTrueSolarTime: z.boolean().default(false),
      birthPlace: z.string().optional(),
      longitude: z.number().optional(),
      latitude: z.number().optional()
    })
    .default({})
});

export type ZiweiInput = z.infer<typeof ZiweiInputSchema>;
