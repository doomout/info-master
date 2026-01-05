## 개발 진행 상황
## 📘 InfoMaster Backend Development Progress  
정보관리기술사 학습 지원 서비스 — 백엔드 개발 진척도 문서  

백엔드 스택: Spring Boot 3 · Java 17 · PostgreSQL 16 · JPA
---

# 1. 프로젝트 초기 설정

## ✔ 프로젝트 생성 & 기본 설정
- [x] Spring Boot 프로젝트 생성 (Java 17)
- [X] 필수 Dependency 추가 (Web, JPA, Lombok, PostgreSQL)
- [X] GitHub 연결
- [X] .gitignore 정리 (민감 정보 제외)
- [X] application.yml / application-secret.yml 분리

---

# 2. 데이터베이스 구축 (PostgreSQL 16)

## ✔ DB 기본 설정
- [X] PostgreSQL 설치 및 실행
- [X] 데이터베이스 생성: infomaster
- [X] 접속 계정 생성: doomout1
- [X] 계정에 스키마/테이블/시퀀스 권한 부여

## ✔ DB 테이블 생성
- [X] admin 테이블 생성
- [X] question 테이블 생성
- [X] answer 테이블 생성
- [X] tag 테이블 생성

## ✔ DB 권한 문제 해결
- [X] search_path 오류 해결
- [X] "member 접근 권한 없음" 해결
- [X] 시퀀스 권한 오류 해결 (member_id_seq 등)
- [X] DEFAULT PRIVILEGES 설정

---

# 3. 백엔드 도메인 구축 (Domain / Repository / Service / Controller)

## Question 기능 (CRUD)
- [x] Question 엔티티 생성
- [x] QuestionRepository 생성
- [x] QuestionService 생성
- [x] QuestionController 생성
- [x] Postman으로 문제 등록 테스트
- [x] 문제 조회/수정/삭제 테스트

## Answer 기능 (CRUD)
- [x] Answer 엔티티 생성
- [x] AnswerRepository 생성
- [x] AnswerService 생성
- [x] AnswerController 생성
- [x] CRUD 테스트

## Tag 기능 (CRUD)
- [x] Tag CRUD
- [x] Tag 기반 Question 검색 API

---

# 4. DTO & Validation (리팩토링 단계)

- [x] DTO 생성
- [x] Controller에서 Entity ↔ DTO 변환 적용
- [x] Validation 일부 적용 (@NotBlank, @NotNull)
- [x] 전체 엔티티 Validation 적용

---

# 5. 글로벌 오류 처리

- [x] @RestControllerAdvice 생성
- [x] 공통 오류 포맷 지정
- [x] IllegalArgumentException 처리
- [x] 404, 400, 500 공통 처리 구조 구축

---

# 6. CI/CD (CD는 다 완성 후 적용 예정)

- [x] 도커 이미지 생성
- [x] 도커 컨테이너 생성
- [x] GitHub Actions 적용(CI)
- [x] 도커 허브 생성
- [ ] 운영서버에 자동 업데이트(CD)
---

# 7. 프론트엔드(React) 연동

- [x] React 프로젝트 생성
- [x] Member CRUD 화면
- [x] Question CRUD 화면
- [x] Answer CRUD 화면
- [x] Tag CRUD 화면
- [x] 전체 UI 개선
- [x] 문제 <-> 태그 연결
- [x] DB 변경에 따른 프론트 전체 수정
---

# 8. 인증/인가 (JWT)
- [x] Spring Security 기본 설정
- [x] JWT 라이브러리 의존성 추가
- [x] SecurityFilterChain 구성
- [x] JWT 인증 필터 구조 추가
- [x] UserPrincipal 구현 (Member 기반 UserDetails)
- [x] @AuthenticationPrincipal로 로그인 사용자 주입
- [x] Question 생성 시 로그인 필수 적용
- [x] Question 엔티티에 작성자(Member) 컬럼 추가
- [x] Question 수정/삭제 시 작성자 권한 체크 로직 구현
- [x] SecurityContext 직접 주입 방식 테스트 전략 수립
- [x] 보안 적용 후 QuestionController 테스트 리팩토링

---
# 9. 테스트 
 - [x] Question CRUD 테스트
 - [x] Tag CRUD 테스트
 - [x] Question Validation 테스트
 - [x] Answer Validation 테스트
 - [x] Tag Validation 테스트
 - [x] Question 테스트에 로그인 컨텍스트 적용
 - [x] Answer 테스트에 로그인 컨텍스트 적용
 - [x] Tag 테스트에 로그인 컨텍스트 적용

---
# 10. 문서 (Docs)

- [x] DB 스키마 문서 완성
- [ ] ERD 생성하여 docs에 추가
- [ ] API 명세서(API Spec) 작성
- [ ] 개발 로그(Dev Log) 기록

---

## ⏭️ 다음 할 일 (우선순위 정리)

### 1단계: 프론트 화면 UX 
- [x] 관리자 화면 개발
- [x] 홈 화면 변경
- [x] 관리자 모드 세부 UI 개선
- [x] 사용자 모드 세부 UI 개선
- [ ] 관리자 로그인 화면

### 2단계: 서버 설정 운영
- [ ] 라즈베리파이 4 환경 설정
- [ ] 라즈베리파이 4 서버에 CD 적용

### 3단계: 전체 테스트
- [ ] 외부 접속 테스트
- [x] 관리자만 CUD 되는지 테스트

---
# 현재 진행 상태 (2026.01.06)

| 기능               | 상태      |
| ---------------- | ------- |
| Question CRUD    | ✔ 완료    |
| Answer CRUD      | ✔ 완료    |
| Tag CRUD         | ✔ 완료    |
| DTO 적용           | ✔ 완료    |
| DTO Validation   | ✔ 완료 |
| Global Exception | ✔ 완료    |
| 테스트 구축           | ✔ 완료    |
| GitHub Actions 구축(CI) | ✔ 완료    |
| 도커 컨테이너 구축 | ✔ 완료    |
| React 연동         | ✔ 완료  |
| 관리자 로그인 기능  | 개발 중  |
| 문서/ERD           | ❌ 미완료   |
---

# 백엔드 완성 후 도커 명령어
```docker
# 기존 도커 이미지, 컨테이너 삭제(도커 데탑에서 마우스로도 가능)
docker compose down
docker compose build --no-cache
docker compose up -d

# 테스트 코드는 제외하고 도커 이미지 생성
.\mvnw clean package -DskipTests

# 도커 이미지 생성
docker build -t info-master-backend .

# 컨테이너 실행
docker run -d -p 8080:8080 --name info-master-backend info-master-backend

# 로그 확인
docker logs -f info-master-backend
```