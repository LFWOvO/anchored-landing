# MiraDawn — 落地页（服务先行验证版）

「① YouTube→SEO 博客自动化」选品的落地页。定位：**The last 10%** —— 保真可溯源的视频转博客。
商业模式（2026-10-30 校准后）：**$29 定金预留试点席位 → 服务先行（$99/篇手工交付试点）→ 产品化**。第一客户：教练 / 课程创作者 / Newsletter 作者。

技术栈：Next.js 15 (App Router) + TypeScript + Tailwind CSS，零第三方依赖，可直接部署 Vercel。

## 本地运行

```bash
npm install
npm run build   # 改完代码必须 build
npm start       # ⚠️ build 之后必须重启 npm start，否则进程继续吐旧构建（已踩过坑）
```

## 转化漏斗（当前版本）

```
Hero/Pricing/FinalCTA CTA（$29 定金话术）
  → 表单提交（/api/waitlist，记录 email/role/volume/audience/plan/variant/utm）
    → 成功页：NEXT_PUBLIC_DEPOSIT_PAYMENT_URL 有值 → 直接跳收款链接（埋点 deposit_paid=点击代理）
             无值 → 显示"24h 内邮件送达付款链接，可回复选 PayPal/Wise"（手动收款兜底）
```

**判定标准（回函修订版）**：验证成功 = **≥2 人实付 $29 定金**（以 PayPal/Wise 到账记录为准，不以页面点击为准）。不再是 waitlist 人数/转化率。

## 项目结构（改文案看这里）

| 位置 | 内容 |
|---|---|
| `components/Hero.tsx` | A/B 双版 Hero（a=质量叙事 / b=资产叙事），eyebrow/CTA/信任条 |
| `components/Sections.tsx` | 竞品对比表、三大卖点、Before/After、人群卡（教练置顶 + Partner 分成卡） |
| `components/Pricing.tsx` | $29/$59/$149 三档 + 定金说明 + Agency 卡内 partner plan 入口 |
| `components/FAQ.tsx` | 10 条 FAQ（含 Who owns / live cohorts / why deposit） |
| `components/Waitlist.tsx` | 定金两步流：表单预留 → 成功页收款链接/手动兜底 + partner referral |
| `components/FinalCTA.tsx` | 底部转化带 + Footer |
| `app/api/waitlist/route.ts` | 表单接收（字段含 audience），日志/webhook 转发 |
| `app/api/track/route.ts` | 埋点接收 |
| `app/privacy/page.tsx` | 隐私页（含定金支付条款，联系邮箱走 env） |

## 环境变量（.env.example 有完整说明）

| 变量 | 用途 |
|---|---|
| `WAITLIST_WEBHOOK_URL` | 注册+埋点转发（飞书机器人/Make），可选 |
| `NEXT_PUBLIC_SITE_URL` | 正式域名，用于 metadata/OG |
| `NEXT_PUBLIC_DEPOSIT_PAYMENT_URL` | $29 定金收款链接（PayPal.me/Wise/支付宝国际版）。留空则走"邮件送达"兜底文案 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 隐私页联系邮箱（部署前必须改掉默认值） |

## 埋点事件名（当前）

`cta_click`（hero）/ `pricing_cta` / `deposit_reservation`（表单提交成功）/ `deposit_paid`（⚠️ 收款链接**点击**代理，非支付成功；真实以 PayPal/Wise 到账记录人工对账）

## A/B 测试怎么读数据

- 分组：首次访问 50/50 随机写 localStorage；`?v=a` / `?v=b` 强制指定（外联分账用）
- 判定指标改为：**每个 variant 的定金实付数**（外联量为小样本，看绝对数别看比率）
- 访客统计：Vercel Analytics 或 Umami（脚本加到 `app/layout.tsx` 的 `<body>`）

## 投放/外联前 checklist

- [ ] 域名绑定 + HTTPS 生效
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL` 设为真实邮箱（privacy 页默认值是占位符）
- [ ] `NEXT_PUBLIC_DEPOSIT_PAYMENT_URL` 配好 PayPal/Wise 收款链接并**自己付一单测试退款**
- [ ] OG 分享图检查（opengraph.xyz）
- [ ] 两版 Hero 手机端各过一遍
- [ ] 冷启动外联按《出海产品-30天执行清单.md》：40 人名单、社区 DM 先行、9:1 有用/推广比

## 止损线（回函修订版）

1. 第 30 天拿不到付费意向 → 换垂类，不写产品代码
2. 第 60 天没有第一个实付定金 → 停下复盘外联与定价，不加功能
3. 第 90 天 MRR < $100 且名单无转化 → 换方向（备选 #20 SaaS 定价页监控）
