FROM node:alpine

ARG VITE_hcaptchaSitekey
ARG VITE_gatewayUrl
ARG VITE_authUrl

ENV VITE_hcaptchaSitekey=${VITE_hcaptchaSitekey}
ENV VITE_gatewayUrl=${VITE_gatewayUrl}
ENV VITE_authUrl=${VITE_authUrl}

WORKDIR /app
COPY ./package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY ./ ./

RUN npm run build
EXPOSE 4173
CMD [ "pm2-runtime", "npm run serve" ]
