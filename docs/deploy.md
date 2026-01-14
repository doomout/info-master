## Docker Build & Deployment Strategy

본 프로젝트는 개발 환경과 운영 환경을 명확히 분리하여 Docker 이미지를 관리한다.

---
## 0. 기본 원칙(주의점)
- 개발용 Docker 명령어와 운영용 Docker 명령어는 서로 다르다.
- 운영 서버(Raspberry Pi)에서는 docker build 를 수행하지 않는다.
- 운영 서버는 이미지를 실행(run)하는 용도로만 사용한다.


## 1. 개발 환경 (Local Development)

- 목적
    - 빠른 코드 수정
    - 로컬 테스트
    - 디버깅
- 환경
    - 개발 PC (Windows 10)
    - 아키텍처: amd64
    - Docker Desktop 사용
```bash
# 개발용 빌드(로컬 PC에서만 사용, 운영 서버에서 사용 금지)
./mvnw clean package -DskipTests
docker build -t info-master-dev .

# 개발용 실행
docker run -d -p 8080:8080 --name info-master-dev info-master-dev

# 개발 중 컨테이너 정리
docker stop info-master-dev
docker rm info-master-dev

docker images
docker ps -a
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

- 운영용 이미지 빌드 (CI 또는 개발 PC, 운영 서버에서 수행하지 않는다)
```bash
# 멀티 아키텍처 빌드 & 배포
# 이 명령어는 이미지를 로컬에 저장하지 않고 Dcoker Hub로 직접 push 한다.
docker buildx build --platform linux/amd64,linux/arm64 -t doomout/info-master:latest --push .
```
✔ Docker Hub로 직접 push  
✔ amd64 / arm64 자동 분기

## 3. 운영 서버 배포 (Raspberry Pi 4)
- Raspberry Pi는 이미지를 빌드하지 않으며 실행 전용 서버로 사용한다.

```bash
# 이미지 다운로드
docker pull doomout/info-master:latest

# 컨테이너 실행
docker compose -f docker-compose.prod.yml up -d
```
- 재배포(수동 CD)
```bash
docker pull doomout/info-master:latest
docker compose down
docker compose up -d
```
- 운영상태 확인
```bash
docker ps
docker logs -f info-master-backend
```

## 4. 개발 vs 운영 명령어 비교표
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

## 5. CI/CD 흐름 요약
```text
[개발]
git push
  ↓
[GitHub Actions - CI]
Docker buildx
Docker Hub push
  ↓
[운영 서버 - CD]
docker pull
docker compose up -d
```

## 6. 요약
```text
개발용 Docker 명령어는 "빠름"을 목표로 하고,
운영용 Docker 명령어는 "안정성"을 목표로 한다.
두 환경의 명령어를 절대 섞어 쓰지 않는다.
```