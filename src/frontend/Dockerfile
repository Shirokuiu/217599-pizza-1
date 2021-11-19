FROM node:12-alpine
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN apk --no-cache --virtual build-dependencies add \
        python3 \
        make \
        g++ \
&& npm install \
&& npm install @vue/cli@4.3.0 -g \
&& apk del build-dependencies
COPY . .
CMD ["npm", "run", "serve"]
