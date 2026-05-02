## 0. 현재 운영 구조 (로컬 x86 서버)

- 현재 Windows PC에서 Docker Desktop으로 실행
- GitHub Actions / Docker Hub 배포는 현재 사용하지 않음
- backend / frontend 이미지는 로컬에서 build
- PostgreSQL도 Docker container 사용
- docker-compose 파일 1개로 관리


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
  - 기능 개발
  - 로컬 테스트
  - docker compose 로 실행

- release
  - 향후 실제 외부 서버 운영 시 사용 예정 (현재 미사용)

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
## 3. 현재 실행 구조

info-master
├─ backend Dockerfile
├─ frontend Dockerfile
├─ docker-compose.yml
├─ .env
└─ .env.example

실행:
docker compose up -d --build
```
- Docker Hub 이미지  

| 서비스    | 이미지                       |  
| -------- | ---------------------------- |  
| Backend  | doomout/info-master          |  
| Frontend | doomout/info-master-frontend |  

## 4. 개발 환경
```bash
# 실행
docker compose up -d --build
# 종료
docker compose down
```

## 5. 향후 운영 계획

- 새 PC 구매 예정
- 현재 PC를 Linux 서버로 전환 예정
- 현재 docker-compose 구조 그대로 이관 가능
- x86 환경이라 ARM 멀티 빌드 불필요

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


## 8. 주의사항

❌ .env GitHub 업로드 금지
❌ JWT_SECRET 하드코딩 금지
❌ POSTGRES_PASSWORD 하드코딩 금지
❌ 로컬 PostgreSQL과 Docker PostgreSQL 포트 혼동 금지

## 9. 최종 구조 요약
```text
## Docker DB 접속 주의

- backend → db:5432 사용
- pgAdmin → localhost:5433 사용

로컬 PostgreSQL과 포트 충돌 방지
```