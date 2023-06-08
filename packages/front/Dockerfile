FROM node:18-alpine as build
WORKDIR /app
COPY package*.json /app/package.json
RUN npm i typescript
RUN npm ci --ignore-scripts
COPY . /app
RUN npm run build

FROM nginx:1.23.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
