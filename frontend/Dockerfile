# ---------- Base ----------
FROM node:20-alpine AS base
WORKDIR /app

# ---------- Dependencies ----------
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# ---------- Build ----------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time envs (required for NEXT_PUBLIC_*)
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_VAPID_KEY
ARG NEXT_PUBLIC_IEEE_BACKEND_URL
ARG API_KEY
ARG NEXT_PUBLIC_SNACKBAR_TIMEOUT_ONE
ARG NEXT_PUBLIC_SNACKBAR_TIMEOUT_TWO

ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_VAPID_KEY=$NEXT_PUBLIC_VAPID_KEY
ENV NEXT_PUBLIC_IEEE_BACKEND_URL=$NEXT_PUBLIC_IEEE_BACKEND_URL
ENV API_KEY=$API_KEY
ENV NEXT_PUBLIC_SNACKBAR_TIMEOUT_ONE=$NEXT_PUBLIC_SNACKBAR_TIMEOUT_ONE
ENV NEXT_PUBLIC_SNACKBAR_TIMEOUT_TWO=$NEXT_PUBLIC_SNACKBAR_TIMEOUT_TWO

RUN npm run build

# ---------- Production ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy runtime necessities
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start"]