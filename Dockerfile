# 1단계: Build Stage
FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app

COPY . .

# Maven wrapper 실행 권한 부여
RUN chmod +x mvnw

# Maven 빌드 (테스트 스킵)
RUN ./mvnw -B clean package -DskipTests

# 2단계: Run Stage
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
