# Local Docker Run

Windows Docker Desktop 기준 로컬 실행 방법입니다.

## Environment

처음 실행할 때는 예시 파일을 복사해서 로컬 전용 `.env`를 만듭니다.

```powershell
Copy-Item .env.example .env
```

그 다음 `.env` 안의 `POSTGRES_PASSWORD`, `JWT_SECRET` 값을 로컬에서만 쓰는 값으로 바꿉니다.

## Start

```powershell
docker compose up -d --build
```

접속 주소:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- PostgreSQL: localhost:5432

DB 접속 정보는 `.env`의 `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` 값을 사용합니다.

## Check

```powershell
docker compose ps
docker compose logs -f backend
```

API 프록시 확인:

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:3000/api/tags
```

## Stop

```powershell
docker compose down
```

DB 데이터까지 초기화하려면:

```powershell
docker compose down -v
```
