# BUILD
# $ docker build --no-cache  -t asset-mgt-backend . 
# asset-mgt-backend is the name of the image that will be built. You can choose any name you like for your image.

# RUN
# $ docker run -p 3000:3000 --name asset-mgt-backend \
#  -e DATABASE=mongodb://host.docker.internal:27017/asset_mgt_local \
#  -e CORS_ORIGIN=http://localhost:4200 \
#  asset-mgt-backend
# -e DATABASE=mongodb://host.docker.internal:27017/asset_mgt_local is the environment variable that sets the database connection string for the application.
# and if your database is running OUTSIDE the docker container, you can use host.docker.internal to connect to it from within the container. 
# This allows the application running inside the container to access the database running on the host machine.
# -----
# -e DATABASE=mongodb://admin:password@host.docker.internal:27018/asset_mgt_local?authSource=admin \
# database running inside the docker container, you can use host.docker.internal to connect to it from within the container.

# STOP
# $ docker rm -f asset-mgt-backend 
# This command is used to forcefully remove a Docker container named asset-mgt-backend. 
# The -f flag stands for "force," which means that the container will be stopped if it's running and then removed, even if it has active processes. 
# This is useful for cleaning up containers that are no longer needed or for resetting the environment before running a new instance of the container.

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/main"]