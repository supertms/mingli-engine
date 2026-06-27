# mingli-engine

Use this skill when the user asks about Zi Wei Dou Shu, Ba Zi, Chinese metaphysics charts, fortune analysis, compatibility, naming, timing, or any answer that requires birth-date based chart calculation.

## Purpose

This skill makes the agent use a deterministic local chart engine before interpretation. The agent must not calculate charts from memory or by language-model reasoning alone.

## Current Capability

Phase 1 supports Zi Wei Dou Shu chart generation through `iztro`.

Run:

```bash
npm install
npm run ziwei -- --solar YYYY-MM-DD --time-index N --gender 男|女
```

Example:

```bash
npm run ziwei -- --solar 2000-08-16 --time-index 2 --gender 女
```

## Mandatory Workflow

1. Collect the required birth data.
2. Call the local engine.
3. Verify the JSON output.
4. Interpret only after chart data is available.
5. Separate chart facts from interpretive judgment.

## Do Not

- Do not manually derive Zi Wei palaces, stars, transformations, or luck stages.
- Do not claim a chart is generated unless this engine or another verified chart tool was used.
- Do not store private birth data in the repository.
- Do not answer unsupported Ba Zi calculations as if the engine supports them yet.

## Output Contract

The engine output should contain:

```ts
{
  meta: {
    engine: "iztro",
    engineVersion: string,
    generatedAt: string,
    input: object,
    assumptions: string[]
  },
  profile: object,
  palaces: object[],
  raw: object
}
```

Before interpretation, check:

```text
palaces.length === 12
profile.soulPalaceBranch exists
profile.bodyPalaceBranch exists
profile.fiveElementsClass exists
```

## Boundary Note

Phase 1 does not convert civil time to true solar time. If birth time is near a two-hour branch boundary, ask for or mention birth place and true-solar-time handling before making final claims.
