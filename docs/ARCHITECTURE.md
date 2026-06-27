# mingli-engine 架构说明

## 1. 核心目标

本工程不是“AI 算命聊天机器人”，而是一个**可审计排盘引擎**。

AI / Codex 的职责：

- 读取排盘 JSON；
- 解释术语；
- 对比不同盘；
- 生成分析报告；
- 标注不确定性。

程序库的职责：

- 历法转换；
- 安星；
- 宫位计算；
- 运限计算；
- 输出结构化数据。

## 2. 总体分层

```text
Input Layer
  ↓
Validation Layer
  ↓
Engine Adapter Layer
  ↓
Normalization Layer
  ↓
Audit Metadata Layer
  ↓
JSON Output
  ↓
AI Interpretation Layer（后续）
```

## 3. Input Layer

负责接收输入：

```ts
{
  calendar: "solar" | "lunar",
  date: "YYYY-MM-DD",
  timeIndex: 0-12,
  gender: "男" | "女",
  locale: "zh-CN",
  options: {
    useTrueSolarTime?: boolean,
    birthPlace?: string,
    longitude?: number,
    latitude?: number
  }
}
```

第一版先不做真太阳时，只把字段预留并在 `meta.assumptions` 标明。

## 4. Engine Adapter Layer

紫微斗数只允许通过：

```text
src/ziwei/iztroAdapter.ts
```

调用 `iztro`。

禁止业务层直接 import `iztro`，这样以后更换底层库或对齐问真/文墨结果时，只改 adapter。

## 5. Normalization Layer

`iztro` 原始输出可能很丰富，不适合直接长期依赖。  
我们要转成稳定的内部格式：

```ts
ZiweiChart {
  meta: ChartMeta;
  profile: ZiweiProfile;
  palaces: ZiweiPalace[];
  raw: unknown;
}
```

其中：

- `meta`：排盘库、版本、输入、规则、时间假设；
- `profile`：阳历、农历、四柱、生肖、星座、命宫、身宫、命主、身主、五行局；
- `palaces`：十二宫数据；
- `raw`：保留原始 iztro 输出，便于对账。

## 6. Phase 1：紫微斗数 MVP

### 必做

- CLI 输入阳历生日、时辰、性别；
- 调用 `astro.bySolar`；
- 输出标准 JSON；
- 保留 raw；
- 冒烟测试。

### 暂不做

- AI 解读；
- 真太阳时换算；
- 多流派切换；
- Web UI；
- 八字；
- 合盘；
- 起运细节二次校准。

## 7. Phase 2：校验与对账

需要准备一批 fixtures：

```text
tests/fixtures/
  known-chart-001.json
  known-chart-002.json
```

每个 fixture 包含：

- 输入；
- 问真/文墨/其他专业 APP 的截图或人工记录；
- iztro 输出；
- 差异备注。

目标不是盲信任何软件，而是明确：

- 哪些规则一致；
- 哪些字段有流派差异；
- 哪些地方需要配置开关。

## 8. 后续八字模块

后续新增：

```text
src/bazi/
  calendarAdapter.ts
  pillars.ts
  tenGods.ts
  luckCycles.ts
  normalize.ts
```

不要把八字放进 `ziwei` 目录，也不要让紫微依赖八字模块。
