FROM node:14 AS build-env
WORKDIR /app/fe
COPY . /app/fe
RUN yarn install
RUN yarn run build

FROM nginx:alpine
COPY --from=build-env /app/fe/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]