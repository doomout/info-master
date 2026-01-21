## Docker Build & Deployment Strategy

본 프로젝트는 개발 환경과 운영 환경을 명확히 분리하여 Docker 이미지를 관리한다.

---
## 0. 기본 원칙(주의점)
- 개발용 Docker 명령어와 운영용 Docker 명령어는 서로 다르다.
- 운영 서버(Raspberry Pi)에서는 docker build 를 수행하지 않는다.
- 운영 서버는 이미지를 실행(run)하는 용도로만 사용한다.

## Profile 사용 규칙
- 개발 환경: spring.profiles.default=dev
- 운영 환경: SPRING_PROFILES_ACTIVE=prod (실행 시 외부에서 주입)
- 운영 모드는 application.yml에서 직접 지정하지 않는다.

## Git 브랜치 & CI/CD 전략

본 프로젝트는 개발과 배포를 Git 브랜치 단위로 명확히 분리한다.
- main
    - 개발 전용 브랜치
    - 기능 구현, UI 수정, 실험, 리팩토링
    - GitHub Actions 실행 ❌
    - Docker 이미지 빌드 ❌

- release
    - 운영 배포 전용 브랜치
    - 검증된 코드만 병합
    - GitHub Actions 실행 ⭕
    - 멀티 아키텍처 Docker 이미지 빌드 & Docker Hub push

- 브랜치 사용 규칙
```text
개발 작업        → main 브랜치
운영 배포 트리거 → release 브랜치
```
- 운영 배포 흐름
```bash
# 개발 완료 후
git checkout release
git merge main
git push origin release
```


## 1. 개발 환경 (Local Development)
- DB는 로컬 PC에 구축되어 있으며, 백엔드 컨테이너는 이 DB에 연결하여 사용한다.

- 백엔드는 Docker 이미지 기반으로 실행하며, 운영 환경과 유사한 방식으로 개발한다.

- 개발 중에는 프론트엔드(UI) 개발에 집중하고, 백엔드 코드는 변경 시에만 재빌드한다.

- 목적
    - 프론트엔드 UI 개발
    - 로컬 환경에서의 기능 테스트
    - 운영 환경과 유사한 실행 방식 유지

- 환경
    - 개발 PC (Windows 10)
    - 아키텍처: amd64
    - Docker Desktop 사용
    - 로컬 PostgreSQL 사용

```bash
# 0. 개발용 환경 변수(DB, JWT 정보)
.env.dev 

# 1. 개발용 이미지 빌드(백엔드 코드 수정 시에만)
./mvnw clean package -DskipTests
docker build -t info-master-dev .
# 백엔드 코드가 변경되지 않았다면 이 단계는 생략한다.

# 2. 개발용 컨테이너 실행(주 사용)
docker compose -f docker-compose.dev.yml up -d

# 3. 개발 중단 시(전체 정리)
docker compose -f docker-compose.dev.yml down

# 4. 컨테이너 상태 확인
docker ps
docker logs -f info-master-dev
```

## 2. 운영 환경 (Production)

- 목적
    - 안정적인 서비스 운영
    - 재현 가능한 배포
    - Raspberry Pi(ARM64) 지원

- 환경
    - Raspberry Pi 4
    - 아키텍처: arm64
    - Docker Engine only (Docker Desktop ❌)

- 운영용 이미지 빌드 (GitHub Actions CI에서 수행, 운영 서버에서는 절대 수행하지 않는다)

```bash
# 멀티 아키텍처 빌드 & 배포
# 이 명령어는 이미지를 로컬에 저장하지 않고 Docker Hub로 직접 push 한다.
docker buildx build --platform linux/amd64,linux/arm64 -t doomout/info-master:latest --push .
```
✔ Docker Hub로 직접 push  
✔ amd64 / arm64 자동 분기

## 3. 개발 vs 운영 명령어 비교표
| 구분 | 개발(Dev) | 운영(Prod) |
|----|----|----|
| 빌드 위치 | 로컬 PC | CI 또는 개발 PC |
| docker build | ⭕ | ❌ |
| docker buildx | ❌ | ⭕ |
| 이미지 저장 | 로컬 | Docker Hub |
| 실행 위치 | 로컬 PC | Raspberry Pi |
| docker run | ⭕ | ❌ |
| docker compose | dev용 | prod용 |
| 아키텍처 | amd64 | amd64 + arm64 |

## 4. CI/CD 흐름 요약
```text
[개발]
git push (main)
  ↓
❌ GitHub Actions 실행 안 됨

[배포]
git merge main → release
git push (release)
  ↓
[GitHub Actions - CI]
Docker buildx (amd64 / arm64)
Docker Hub push
  ↓
[운영 서버 - CD]
docker pull
docker compose up -d
```
## 5. Raspberry Pi 운영 현황

### 실행 중인 컨테이너
- PostgreSQL (DB)
- Spring Boot Backend
- Nginx Frontend

### 포트 구성
- 80   : Frontend (Nginx)
- 8080 : Backend (Spring Boot)
- 5432 : PostgreSQL

### 최종 구조
```text
[Browser]
   ↓
[Nginx Frontend :80]
   ↓
[Backend API :8080]
   ↓
[PostgreSQL :5432]
```
## 6. 백엔드 배포 방법
- Raspberry Pi는 이미지를 빌드하지 않으며 실행 전용 서버로 사용한다.

```bash
# 1. 도커 허브에 있는 이미지 다운로드
docker pull doomout/info-master:latest

# 2. 컨테이너 실행
docker compose -f docker-compose.prod.yml up -d
```
- 재배포(수동 CD)
```bash
docker pull doomout/info-master:latest

# ⚠️ docker compose down/up 명령어는 반드시 해당 docker-compose 파일이 있는 디렉터리에서 실행한다.
cd ~/docker/backend
docker compose -f docker-compose.prod.yml down
docker compose up -d
```
- 운영상태 확인
```bash
docker ps
docker logs -f info-master-backend
```

## 7. 프론트 배포 방법

- 프론트 프로젝트 구성(필수 파일)
```bash
info-master-frontend/
 ├─ Dockerfile
 ├─ nginx.conf
 ├─ package.json
 ├─ src/
 └─ dist/           # build 결과 (배포 시 생성)
```

- 프론트 빌드 & 이미미 생성
```bash
# 1. React 빌드
npm install
npm run build

# 2. 멀티 아키텍처 이미지 빌드 & Docker Hub 푸시
docker buildx build --platform linux/amd64,linux/arm64 -t doomout/info-master-frontend:latest --push .
```

- 운영 서버 실행 명령
```bash
cd ~/docker/backend

# 기존 컨테이너 정리
docker compose -f docker-compose.prod.yml down

# 최신 이미지 실행
docker compose -f docker-compose.prod.yml up -d
```

## 8. 깃 명령어
- 전체적 흐름 
릴리즈로 커밋 -> 깃허브 푸쉬 -> 깃허브 액션 자동 빌드 -> 도커 허브로 이미지를 전송 -> 서버에서 컨테이너 생성
```bash
# 1. 현재 브랜치 확인 (release 에 있다면 OK)
git branch

# 2. main 에 있다면
git checkout release
git pull origin release

# 3. main 브랜치로 이동
git checkout main
git pull origin main 

# 4. release -> main 병합
git merge release

# 5. main 브랜치 푸시
git push origin main
```