## 0. 기본 원칙 (절대 규칙)

- 운영 서버(Raspberry Pi)에서는 docker build / buildx 금지

- Docker 이미지는 GitHub Actions(CI) 에서만 생성

- Raspberry Pi는 이미지 pull + 실행(CD) 전용

- Frontend / Backend는 서로 다른 Docker 이미지

- docker-compose 파일은 운영 기준 1개만 유지

## 1. Profile & Environment 규칙
- 개발 환경
```text
spring.profiles.default=dev
```
- 운영 환경
```text
SPRING_PROFILES_ACTIVE=prod
```
- application.yml에 직접 지정 ❌

- docker-compose / env_file 로만 주입 ⭕

## 2. Git 브랜치 전략
- main
    - 개발 전용
    - 기능 구현/UI 수정/리팩토링
    - GitHub Actions 실행 ❌
    - Docker 이미지 빌드 ❌

- release
    - 운영 배포 전용 브랜치
    - GitHub Actions 실행
    - 멀티 아키텍처 Docker 이미지 빌드 & Docker Hub push

- 운영 배포 흐름
```bash
# 개발 완료 후(main에서 완료 후 release 모드로 배포한다.)
git checkout release
git merge main
git push origin release
```
- ❌ release → main merge (잘못된 흐름)
- ⭕ main → release merge

## 3. CI/CD 구조(레포 1개, 워크플로우 2개)
```text
info-master (GitHub Repo)
├─ backend/
│  └─ Dockerfile
├─ frontend/
│  └─ Dockerfile
└─ .github/workflows/
   ├─ backend.yml    # backend/** 변경 시
   └─ frontend.yml   # frontend/** 변경 시
```
- Docker Hub 이미지  

| 서비스    | 이미지                       |  
| -------- | ---------------------------- |  
| Backend  | doomout/info-master          |  
| Frontend | doomout/info-master-frontend |  

## 4. 개발 환경
```bash
# 개발용 환경 변수
.env.dev

# 백엔드 변경 시에만 빌드
./mvnw clean package -DskipTests
docker build -t info-master-dev .

# 개발용 실행
docker compose -f docker-compose.dev.yml up -d

# 종료
docker compose -f docker-compose.dev.yml down
```

## 5. 운영 환경(라즈베리 파이4 서버)
- 🚨 운영 서버에서 하는 일은 딱 하나

- “최신 이미지를 pull 해서 컨테이너를 재생성”

## 6. 운영 docker-compose(단일 파일 유지)
```yaml
services:
  backend:
    image: doomout/info-master:latest
    container_name: info-master-backend
    ports:
      - "8080:8080"
    env_file:
      - .env.prod
    volumes:
      - /home/doomout/config/info-master:/config
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_CONFIG_ADDITIONAL_LOCATION=file:/config/
    restart: always

  frontend:
    image: doomout/info-master-frontend:latest
    container_name: info-master-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always
```
- compose 파일을 frontend / backend 로 나누지 않는다.

## 7. 운영 배포 명령(프론트 / 백엔드 공통)
- 워크플로우가 2개여도 서버 명령은 1개다.
```bash
cd /docker/backend
docker compose -f docker-compose.prod.yml up -d --pull always --force-recreate
```
- 이 명령의 의미
    - frontend 이미지가 바뀌었으면 → frontend만 재생성
    - backend 이미지가 바뀌었으면 → backend만 재생성
    - 둘 다 바뀌면 → 둘 다 재생성

## 8. 배포 시나리오 정리
- 프론트만 수정시
```text
frontend 코드 변경
→ git push release
→ frontend.yml 실행
→ frontend 이미지 갱신
→ 서버에서 compose up
```

- 백엔드만 수정시
```text
backend 코드 변경
→ git push release
→ backend.yml 실행
→ backend 이미지 갱신
→ 서버에서 compose up
```

- 둘 다 수정시 : 워크플로우 2개 모두 실행됨

## 9. 절대 하지 말아야 할 것
❌ 운영 서버에서 docker build  
❌ 운영 서버에서 docker push  
❌ docker pull 개별 실행  
❌ frontend / backend compose 분리 

## 10. 최종 구조 요약
```text
[Browser]
   ↓
[Nginx Frontend :80]
   ↓
[Spring Boot Backend :8080]
   ↓
[PostgreSQL :5432]
```