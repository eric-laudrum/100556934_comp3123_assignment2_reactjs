FROM node:20-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8090
CMD ["npm", "run", "dev"]
