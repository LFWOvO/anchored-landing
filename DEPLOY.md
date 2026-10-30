# 部署清单（Anchored Landing）— 从本地到正式上线

> 按顺序执行，全程约 1 小时（不含域名注册等待）。

## 0. 首次 commit 前：设置 git 身份（一次性）

```bash
git config --global user.name "你的名字"
git config --global user.email "你的GitHub邮箱"
```

⚠️ 本仓库当前的 commit 用了占位身份（`Anchored Local <dev@local.invalid>`），推送前可用
`git commit --amend --reset-author` 修正最近一条，或保持现状（不影响功能）。

## 1. 推到 GitHub

1. GitHub → New repository → 命名 `anchored-landing` → **不要**勾选 README/gitignore 初始化
2. 本地执行（在 `anchored-landing/` 下）：

```bash
git remote add origin https://github.com/<你的用户名>/anchored-landing.git
git push -u origin main
```

## 2. Vercel 部署

1. [vercel.com](https://vercel.com) 用 GitHub 登录 → Add New... → Project → Import `anchored-landing`
2. Framework Preset 会自动识别 **Next.js**，其余默认 → Deploy
3. 部署完成后得到 `xxx.vercel.app` 预览域名，先过一遍页面确认正常

## 3. 环境变量（Vercel → Settings → Environment Variables）

| Key | Value | 说明 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://你的域名.com` | 部署域名牌之后再加并 Redeploy |
| `NEXT_PUBLIC_DEPOSIT_PAYMENT_URL` | PayPal.me 链接或 Wise 收款页 | 留空则显示"24h 内邮件送达" |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 真实邮箱 | 隐私页用，**必须改**（默认是占位符） |
| `WAITLIST_WEBHOOK_URL` | 飞书群机器人 webhook（可选） | 每条注册实时推送 |

改完任一变量 → Deployments 页 → 最新一条 → Redeploy。

## 4. 绑域名

1. Vercel → Settings → Domains → Add 你的域名
2. 按提示到注册商处加解析（Vercel 会显示要填的记录，一般是）：
   - 根域 `A` → `76.76.21.21`
   - www `CNAME` → `cname.vercel-dns.com`
3. 等证书签发（ usually <10 分钟），HTTPS 亮锁后用手机开一遍全页

## 5. 上线当天动作（照清单，别跳）

- [ ] `?v=a` / `?v=b` 两版 Hero 各检查一遍（手机端也要）
- [ ] 用 [opengraph.xyz](https://www.opengraph.xyz) 检查分享卡片
- [ ] [富结果测试](https://search.google.com/test/rich-results) 跑一下首页（JSON-LD 应识别出 FAQPage + SoftwareApplication）
- [ ] Google Search Console 添加资源 → 提交 `https://域名/sitemap.xml` → URL Inspection 请求收录
- [ ] **自己付一单 $29 定金 → 验证收款到账 → 自己退款**（收款和退款各走通一次，这是第 30 天门禁项）
- [ ] 隐私页邮箱确认非占位符

## 6. 常见坑

- **改了代码忘 build/restart**：本地 `npm run build && npm start` 必须重启才生效；Vercel 推送即自动构建，无此问题
- **环境变量只加了 Production**：Preview 部署会读不到，建议 Environment 三栏全勾
- **PayPal.me 链接带金额参数**：`https://paypal.me/xxx/29usd` 可直接锁定 $29
- 域名解析没生效就急着绑：TTL 最长等 48h，用 `nslookup 域名` 确认解析已生效再排查 Vercel
