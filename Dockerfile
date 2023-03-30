FROM node:18.14-alpine

WORKDIR /app
COPY . .
RUN npm ci
EXPOSE 3000
RUN npm run build
CMD ["npx", "serve", "build"]

