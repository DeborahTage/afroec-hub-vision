# Repo-root Dockerfile for Render when Root Directory is blank.
# Builds the Spring Boot API from backend/.
ARG CACHE_BUST=11
ARG APP_BUILD_ID=20260721-full-apps-v11

FROM maven:3.9-eclipse-temurin-21 AS build
ARG CACHE_BUST
WORKDIR /app
COPY backend/pom.xml .
RUN mvn -q dependency:go-offline -B
COPY backend/src ./src
RUN echo "cache-bust=${CACHE_BUST}" && mvn -q clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
ARG APP_BUILD_ID
WORKDIR /app
ENV APP_BUILD_ID=${APP_BUILD_ID}
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0"
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
