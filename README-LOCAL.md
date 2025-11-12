# Local Dev Quickstart (Fixed)

## 1) Requirements
- Node 18.18+ or 20.x
- Docker (to run Postgres locally) or a reachable Postgres instance

## 2) Database (Docker)
```bash
docker run --name pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=techbot -p 5432:5432 -d postgres:16
```
Copy `.env.example` to `.env` and adjust if needed.

## 3) Install & Prisma
```bash
rm -rf node_modules package-lock.json
npm i
npx prisma generate
npx prisma migrate dev
```

## 4) Run
```bash
npm run dev
```
Open http://localhost:3000
