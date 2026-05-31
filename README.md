# WeBo Monorepo

This repository contains both projects:

- `webo-app/` - Next.js frontend
- `backend-server/` - Node/Express backend API

## Prerequisites

- Node.js 18+
- npm 9+

## Install dependencies

Install per project first:

```bash
cd webo-app && npm install
cd ../backend-server && npm install
```

Install root tooling:

```bash
cd ..
npm install
```

## Run both apps together

From repo root:

```bash
npm run dev
```

This starts:

- frontend: `webo-app` (`npm run dev`)
- backend: `backend-server` (`npm run dev`)

## Run apps separately

```bash
npm run dev:web
npm run dev:api
```

## Production start

```bash
npm run start
```

## Environment files

- Frontend env: `webo-app/.env.local`
- Backend env: `backend-server/.env`
