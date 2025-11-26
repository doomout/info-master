# INFO MASTER 📚  
정보관리 기술사 준비를 위한 학습/기출 관리 웹 서비스

이 프로젝트는 정보관리 기술사(ITPE) 공부를 위해  
기출문제 관리, 답안 작성, 노트 정리 기능을 제공하는  
**React + Spring Boot 3 + PostgreSQL 기반 웹 서비스**입니다.

---

## 📂 프로젝트 구조
```text
infomaster/
├─ backend/ # Spring Boot API 서버
├─ frontend/ # React 프론트엔드
└─ docs/ # 문서 모음
└─ db-schema.md # 데이터베이스 스키마(DDL)
```

---

## 📄 문서

- **Database Schema (DDL)**  
  → [`docs/db-schema.md`](docs/db-schema.md)

- **프로젝트 아키텍처 (예정)**  
  → docs/architecture.md

- **API 명세 (예정)**  
  → docs/api-spec.md

---

## 🛠 기술 스택

### Backend
- Java 25
- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL

### Frontend
- React 19
- Vite
- Axios

### Dev & Tools
- VS Code
- GitHub
- pgAdmin4

---

## 🚀 로컬 실행 방법

### 1) Backend 실행
```bash
cd backend
./mvnw spring-boot:run
