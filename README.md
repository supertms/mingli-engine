# mingli-engine

一个面向 AI / Codex 工作流的命理排盘引擎。

## 项目定位

这个项目**不让大模型凭空排盘**，而是把排盘拆成可审计的程序流程：

1. 输入出生信息；
2. 调用专业排盘库；
3. 输出结构化 JSON；
4. AI / Codex 只能基于 JSON 做解释、比较、校验；
5. 排盘事实、传统术语、主观判断必须分离。

当前 Phase 1 只做：**紫微斗数排盘**，底座使用 `iztro`。

## 首要使用目标

当用户向 Codex 询问八字、紫微、命理、取名、合盘、流年等问题时，Codex 应优先使用本仓库的排盘引擎获取“排盘事实”，而不是自行推算。

第一阶段支持紫微斗数：

```bash
npm run ziwei -- --solar 2000-08-16 --time-index 2 --gender 女
```

输出 JSON 默认打印到 stdout。也可以写入文件：

```bash
npm run ziwei -- --solar 2000-08-16 --time-index 2 --gender 女 --out outputs/chart.json
```

## 为什么先做紫微

- `iztro` 是 TypeScript / JavaScript 生态，Codex 接入成本低；
- 能通过阳历/农历生日、出生时辰、性别生成星盘数据；
- 输出包含十二宫、主星、辅星、杂曜、四化/运限等数据；
- 先把“排盘事实 JSON”打稳定，再做解释层。

## 重要原则

- 禁止 LLM 自行安星、推算命宫、推算身宫、推算四化；
- 所有紫微排盘必须通过 `src/ziwei/iztroAdapter.ts`；
- 每次输出必须带 `meta`：排盘库、版本、输入、规则假设、时间设置；
- 解读层必须晚于排盘层，不得混写；
- 后续八字模块另开 `src/bazi`，不要和紫微模块混在一起。

## 目录

```text
src/
  cli.ts                  # 命令行入口
  index.ts                # 对外导出
  shared/
    schema.ts             # 输入/输出基础校验
  ziwei/
    iztroAdapter.ts       # iztro 适配层
    normalize.ts          # 统一输出格式
    types.ts              # 紫微相关类型
docs/
  ARCHITECTURE.md         # 架构说明
  CODEX_HANDOFF.md        # 给 Codex 的接手任务
  CODEX_MINGLI_PROTOCOL.md # Codex 命理问题调用协议
skills/
  mingli-engine/
    SKILL.md              # Agent/Codex skill 风格说明
```

## Phase 1 验收标准

- 能用阳历输入生成紫微盘 JSON；
- JSON 内含十二宫；
- JSON 内含命宫、身宫、命主、身主、五行局；
- 每个宫包含宫名、天干地支、主星、辅星、杂曜、大限；
- 测试能跑通；
- README 和架构文档保持同步。
