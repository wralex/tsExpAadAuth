FROM node:lts-alpine as builder
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install\
    && npm install typescript -g
COPY . .
RUN tsc --build

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/views ./views

ENV NODE_ENV=production

ENV GRAPH_API_ENDPOINT="https://graph.microsoft.com/"
ENV CLOUD_INSTANCE="https://login.microsoftonline.com/"
ENV EXPRESS_SESSION_SECRET="AUTH_SESSSION"

ENV EXPRESS_SESSION_COOKIE_HTTPONLY=true
ENV EXPRESS_SESSION_COOKIE_SECURE=false
ENV PORT=3080
ENV REDIRECT_URI="http://localhost:3080/auth/redirect"
ENV POST_LOGOUT_REDIRECT_URI="http://localhost:3080"

EXPOSE 3080
RUN chown -R node /usr/src/app
USER node

CMD ["npm", "start"]
