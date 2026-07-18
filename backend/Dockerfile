# CACHE BUST: 2026-07-18 — restructure-v4 merged, building from backend/
ARG CACHE_BUST=5

# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml first for dependency caching
COPY pom.xml .
RUN mvn -q dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn -q clean package -DskipTests

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy built JAR (wildcard tolerates finalName changes)
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0"

# Shell form so $PORT / $JAVA_OPTS expand; server.port also reads ${PORT}
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
