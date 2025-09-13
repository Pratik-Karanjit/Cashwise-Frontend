FROM node:22-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Force production build
ENV NODE_ENV=production
RUN npm run build

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
