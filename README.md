# 数智京山 · 公众端

面向市民与游客的网球产业服务入口，与 `jingshan-one-map`（一张图 + 后端）、`jingshan-admin`（管理后台）同属 `jingshan-digital-twin` 组织。

## 当前状态

骨架阶段。首页已列出三个待开发模块：

- **场馆预约**：场馆查询、时段预约、订单
- **赛事资讯**：赛程发布、报名入口、观赛指南
- **产业招商**：产业链图谱、招商载体、政策解读

## 本地启动

后端不在本仓库。需要先在 `jingshan-one-map` 中把 API 跑起来（默认 `127.0.0.1:3001`）：

```bash
npm install
npm run dev     # http://127.0.0.1:5174
```

开发服务器把 `/api` 代理到 `API_TARGET`（默认 `http://127.0.0.1:3001`），换后端地址时改环境变量即可，不需要动代码。

```bash
API_TARGET=http://192.168.1.20:3001 npm run dev
```

## 约定

1. **接口只走 `/api`**，不引用 `jingshan-one-map` 的源码。后端结构与字段变更以对方仓库为准，本仓库只依赖 HTTP 契约。
2. 页面按模块拆：`src/modules/<module>/`，公共组件放 `src/components/`。
3. 提交前跑 `npm run build`，保持 `main` 可构建。
4. 分支从最新 `main` 切出，命名为 `feat/xxx` 或 `fix/xxx`，通过 PR 合并。

## 目录

```
index.html
src/
  main.ts        入口
  App.vue        首页与模块入口
  style.css      全局样式
vite.config.ts   端口 5174，/api 代理
```
