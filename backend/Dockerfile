# CACHE BUST — bump APP_BUILD_ID whenever you need a guaranteed fresh image
ARG CACHE_BUST=11
ARG APP_BUILD_ID=20260721-full-apps-v11

# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-21 AS build
ARG CACHE_BUST
WORKDIR /app

COPY pom.xml .
RUN mvn -q dependency:go-offline -B

COPY src ./src
RUN echo "cache-bust=${CACHE_BUST}" && mvn -q clean package -DskipTests

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre-alpine
ARG APP_BUILD_ID
WORKDIR /app
ENV APP_BUILD_ID=${APP_BUILD_ID}

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0"

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
