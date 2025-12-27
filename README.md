# INFO MASTER 📚  
정보 관리 기술사 준비를 위한 학습/기출 관리 웹 서비스

이 프로젝트는 정보 관리 기술사 공부를 위해  
문제 관리, 답안 작성, 카테고리 기능을 제공하는  
**React 19 + Spring Boot 3.5 + PostgreSQL 16 기반 웹 서비스**입니다.

---
## 📄 문서

- **Database Schema (DDL)**  
  → [`DB 구조`](docs/db-schema.md)

- **설계 문서**
  → [`설계 문서`](docs/design.md) 

- **프로젝트 진행사항**  
  → [`프로젝트 진행`](docs/Development-progress.md)
---

## 🛠 기술 스택

### Backend
- Java 17
- Spring Boot 3.5.8
- Spring Data JPA
- PostgreSQL 16

### Frontend
- React 19
- Vite
- Axios

### Dev & Tools
- VS Code
- GitHub + GitHub Actions (CI 기능)
- pgAdmin4 (DB 툴)
- 도커 데스크탑(테스트용), 도커 허브(CD 전 임시) 
- react-markdown (답안에 마크다운 방식 채택)
- remark-gfm (마크 다운 미리 보기)
- react-syntax-highlighter (코드 하이라이트 기능)
---