FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /user/src/app
WORKDIR /user/src/app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /user/src/app/node_modules /user/src/app/node_modules
COPY --from=build /user/src/app/dist /user/src/app/dist
EXPOSE 8080

CMD [ "node", "dist/src/main.js" ]
