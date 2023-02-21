# # Stage 1 - Build
# FROM maven:3.8.3-jdk-11 AS build
# COPY pom.xml /app/be/
# COPY src /app/be/src/
# WORKDIR /app/be/
# RUN mvn package

# Stage 2 - Run
FROM openjdk:15-jdk-alpine
COPY ./target/be-0.0.1-SNAPSHOT.jar /app/be.jar
ENTRYPOINT ["java", "-jar", "/app/be.jar"]