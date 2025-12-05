# 1단계: Build Stage
FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app

# 프로젝트 소스 복사
COPY . .

# Maven 빌드 (테스트 포함)
RUN ./mvnw -B clean package -DskipTests=false

# 2단계: Run Stage (경량 이미지)
FROM eclipse-temurin:17-jre
WORKDIR /app

# builder에서 실행 가능한 jar만 복사
COPY --from=builder /app/target/*.jar app.jar

# 컨테이너 실행 커맨드
ENTRYPOINT ["java", "-jar", "app.jar"]
