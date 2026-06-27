# Codex 命理问题调用协议

本协议的目的：让 Codex 在回答命理相关问题时，优先调用本仓库引擎取得排盘事实，降低 AI 心算排盘错误。

## 1. 触发范围

当用户问题包含以下任一意图时，应触发本协议：

- 紫微斗数排盘 / 解盘；
- 八字排盘 / 用神 / 格局 / 大运 / 流年；
- 合盘；
- 取名；
- 择日；
- 根据出生年月日时判断命理结构；
- 对比两个命盘；
- 校验某个 APP 排盘是否一致。

## 2. 当前能力边界

当前引擎 Phase 1 只支持紫微斗数排盘。

支持：

```bash
npm run ziwei -- --solar YYYY-MM-DD --time-index N --gender 男|女
npm run ziwei -- --lunar YYYY-MM-DD --time-index N --gender 男|女
```

暂不支持：

- 八字四柱排盘；
- 大运起运精算；
- 真太阳时换算；
- 早晚子时规则切换；
- 多紫微流派切换；
- 合盘自动报告；
- 取名自动报告。

如果用户问暂不支持的内容，必须说明当前引擎尚未实现对应模块，不得用 LLM 假装已经计算。

## 3. 标准输入收集

紫微排盘至少需要：

```text
calendar: solar | lunar
birth date: YYYY-MM-DD
birth time / timeIndex
gender: 男 | 女
```

如用户只给“几点几分”，Codex 应先把时间转换为 iztro 所需 `timeIndex`，并在回答中标注转换依据。

如果用户出生时间接近时辰边界，应提醒需要出生地和真太阳时设置。

## 4. 标准调用

示例：

```bash
npm run ziwei -- --solar 2000-08-16 --time-index 2 --gender 女 --out outputs/ziwei-chart.json
```

然后读取 JSON，检查：

```text
meta.engine === "iztro"
palaces.length === 12
profile.soulPalaceBranch exists
profile.bodyPalaceBranch exists
profile.fiveElementsClass exists
```

## 5. 标准回答结构

回答命理问题时必须分层：

```text
一、排盘事实
- 命宫：...
- 身宫：...
- 五行局：...
- 十二宫主要星曜：...

二、术语解释
- 命宫含义：...
- 身宫含义：...

三、分析判断
- 倾向：...
- 不确定性：...
- 需要复核：...
```

不得把“分析判断”伪装成“排盘事实”。

## 6. 对账协议

如果用户提供问真、文墨、其他 APP 截图或结果，Codex 应：

1. 用本引擎生成同一输入的 JSON；
2. 对比命宫、身宫、五行局、主星、辅星、四化；
3. 输出差异表；
4. 判断差异来自：
   - 输入错误；
   - 时辰/真太阳时；
   - 农历闰月；
   - 流派差异；
   - 本引擎 adapter/normalize 错误。

## 7. 隐私规则

不要把用户真实出生信息、家人出生信息写入仓库 fixture。  
如果需要测试真实盘，只在本地临时运行，输出文件放到 `outputs/`，且不要提交。
