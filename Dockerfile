FROM node:20-alpine

# Build tools for native modules + cifs-utils for SMB mount
RUN apk add --no-cache python3 make g++ cifs-utils

# Create mount point for game server share
RUN mkdir -p /mnt/gameserver

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY . .

RUN mkdir -p /app/data/kb

# Startup script: mount CIFS if configured, then start app
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3100

ENTRYPOINT ["/entrypoint.sh"]
