FROM node:18-alpine3.17 as build
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build
CMD ["sh", "-c", "tail -f /dev/null"]