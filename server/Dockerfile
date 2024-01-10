#
# MongoDB Dockerfile
#
# https://github.com/dockerfile/mongodb
#

# Pull base image.
FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME agent1
ENV MONGO_INITDB_ROOT_PASSWORD 123
ENV MONGO_INITDB_DATABASE melochord

ADD mongo-init.js /docker-entrypoint-initdb.d/

# Modify child mongo to use /data/db2 as dbpath (because /data/db wont persist the build)
RUN mkdir -p /data/db2 \
    && echo "dbpath = /data/db2" > /etc/mongodb.conf \
    && chown -R mongodb:mongodb /data/db2

COPY . /data/db2

RUN mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db2 --smallfiles \
    && CREATE_FILES=/data/db2/scripts/*-create.js \
    && for f in $CREATE_FILES; do mongo 127.0.0.1:27017 $f; done \
    && INSERT_FILES=/data/db2/scripts/*-insert.js \
    && for f in $INSERT_FILES; do mongo 127.0.0.1:27017 $f; done \
    && mongod --dbpath /data/db2 --shutdown \
    && chown -R mongodb /data/db2

# Make the new dir a VOLUME to persists it 
VOLUME /data/db2

CMD ["mongod", "--config", "/etc/mongodb.conf", "--smallfiles"]

# Expose ports.
#   - 27017: process
#   - 8081: Backend
EXPOSE 27017

FROM node:20
WORKDIR /server

COPY package.json .
COPY package-lock.json ./

EXPOSE 8081

COPY . ./

CMD ["node", "server.js", "localhost:8081" ]


