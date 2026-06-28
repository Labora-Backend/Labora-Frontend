# Labora Frontend

Labora is a role-based freelancing platform frontend built with React 19, TypeScript, and Vite.  
This repository contains the initial frontend architecture with routing, state management, API layers, and reusable UI foundations.

## Tech stack

- React 19 + TypeScript + Vite
- React Router v7
- Redux Toolkit + React Redux
- TanStack React Query
- Axios
- React Hook Form + Zod
- Tailwind CSS
- Native WebSocket integration placeholders (for Django Channels)

## Architecture overview

- `src/app/`: app-level composition (store, providers, router, guards)
- `src/services/`: API clients and WebSocket integrations
- `src/features/`: domain/role-based feature modules
- `src/components/`: reusable UI, layout, and common components
- `src/pages/`: public pages (landing/auth/not-found)
- `src/utils/` and `src/types/`: shared utilities and TypeScript models

## Folder structure

```text
src/
├── app/
│   ├── store/
│   ├── router/
│   └── providers/
├── services/
│   ├── api/
│   └── websocket/
├── features/
│   ├── auth/
│   ├── jobs/
│   ├── applications/
│   ├── chat/
│   ├── payments/
│   ├── reviews/
│   ├── notifications/
│   ├── freelancer/
│   ├── client/
│   └── admin/
├── components/
│   ├── ui/
│   ├── layout/
│   └── common/
├── hooks/
├── utils/
├── types/
├── assets/
├── styles/
├── pages/
├── App.tsx
└── main.tsx
```

## Environment variables

Copy `.env.example` to `.env` and adjust values:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_BASE_URL=ws://localhost:8000/ws
VITE_APP_NAME=Labora Freelancing Platform
```

## Setup and run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
