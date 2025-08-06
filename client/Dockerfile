FROM oven/bun:slim AS builder

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

ARG NEXT_PUBLIC_CONTRACT_ID
ARG NEXT_PUBLIC_BACKEND_URL

ENV NEXT_PUBLIC_CONTRACT_ID=${NEXT_PUBLIC_CONTRACT_ID}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

RUN mv docker.next.config next.config.mjs

ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM oven/bun:slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["bun", "server.js"]