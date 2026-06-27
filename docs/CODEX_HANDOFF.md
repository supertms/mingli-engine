# Codex Handoff：mingli-engine Phase 1

## 任务背景

我要搭建一个命理排盘引擎。第一阶段只做紫微斗数，底层库使用 `iztro`。

关键原则：

- 不允许 LLM 自行排盘；
- 不允许用大模型猜命宫、身宫、主星、四化；
- 所有紫微排盘都必须调用 `iztro`；
- 输出必须是可审计 JSON；
- 解读功能暂时不做。

## 你要完成的目标

请把当前脚手架补成可运行 MVP：

```bash
npm install
npm run ziwei -- --solar 2000-08-16 --time-index 2 --gender 女
npm test
```

## 必须完成

1. 检查并修正 `iztro` 的实际 API 调用签名；
2. 实现/校验 `src/ziwei/iztroAdapter.ts`；
3. 实现/校验 `src/ziwei/normalize.ts`；
4. 实现 CLI：
   - `--solar YYYY-MM-DD`
   - `--lunar YYYY-MM-DD`
   - `--time-index number`
   - `--gender 男|女`
   - `--locale zh-CN`
   - `--out path`
5. 输出标准结构：

```ts
{
  meta: {...},
  profile: {...},
  palaces: [...],
  raw: {...}
}
```

6. 写至少一个冒烟测试，确认：
   - `palaces.length === 12`
   - `profile.soulPalaceBranch` 存在
   - `profile.bodyPalaceBranch` 存在
   - `profile.fiveElementsClass` 存在

## 不要做

- 不要写 AI 解读；
- 不要接 OpenAI API；
- 不要做 Web UI；
- 不要加八字模块；
- 不要引入大型框架；
- 不要把个人出生信息写入仓库。

## 验收

运行：

```bash
npm run build
npm test
npm run ziwei -- --solar 2000-08-16 --time-index 2 --gender 女
```

应成功输出 JSON。

## 后续扩展

完成 MVP 后，再做：

1. fixtures 对账；
2. 真太阳时预处理；
3. 多流派配置；
4. 报告解释层；
5. 八字模块。
