#
# MongoDB Dockerfile
#
# https://github.com/dockerfile/mongodb
#

# Pull base image.
FROM mongo


# Define mountable directories.
VOLUME ["/data/db"]

# Define working directory.
WORKDIR /data

# Expose ports.
#   - 27017: process
#   - 28017: http
#   - 8081: Backend
EXPOSE 27017
EXPOSE 28017

FROM node:20
WORKDIR /server

COPY package.json .
COPY package-lock.json ./

EXPOSE 8081

COPY . ./

CMD ["node", "server.js", "localhost:8081" ]


