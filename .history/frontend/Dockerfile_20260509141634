FROM node:20-alpine AS builder

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

ARG VITE_API_URL
ARG VITE_APP_NAME
ARG VITE_DEBUG

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_DEBUG=false

COPY frontend/ .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf.template

EXPOSE 80

CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]