📘 Database Schema — infomaster (v4)

이 문서는 블로그형 기술사 기출 문제 관리 서비스를 위한  
infomaster 데이터베이스 스키마 v4입니다.  
  
관리자 단일 운영, 일반 사용자는 조회(Read) 전용  
로그인 / 회원 기능 없음 을 전제로 설계되었습니다.  
---
🔄 v4 변경 사항 요약 (2026.01)  
❌ 제거

Member 테이블 제거  
Question / Answer의 작성자(member_id) 제거  
로그인/인증 기반 설계 제거  

✅ 변경  
관리자는 시스템 운영자 개념으로만 존재  
Question–Answer 관계를 1:1 Aggregate로 명확화  
Answer는 Question에 완전히 종속됨  

🎯 설계 방향  
단일 관리자 CMS 구조  
인증은 향후 확장 가능성만 열어둔 상태  
현재는 URL(/admin) 기준 관리자 접근  

⚠️ 비밀번호 등 민감 정보는 포함하지 않습니다.  
⚠️ PostgreSQL 16 기준입니다.  
---
## 1. admin 테이블
- 관리자 계정 저장
```sql
CREATE TABLE admin (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```
| 컬럼명     | 타입          | 설명            |
| ---------- | ------------ | ------------- |
| id         | BIGSERIAL    | 회원 고유 ID      |
| username   | VARCHAR(200) | 관리자 아이디 (유니크) |
| password   | VARCHAR(200) | 암호 (해시 저장)    |
| created_at | TIMESTAMP    | 생성 시각         |
---
## 2. Tag 테이블
- 문제 분류용 태그 (문제당 1개)
```sql
CREATE TABLE public.tag (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);
```
| 컬럼명  | 타입           | 설명          |
| ---- | ------------ | ----------- |
| id   | BIGSERIAL    | 태그 ID       |
| name | VARCHAR(100) | 태그 이름 (유니크) |
---
## 3. Question 테이블
- 기출 문제 정보
```sql
CREATE TABLE question (
    id BIGSERIAL PRIMARY KEY,
    exam_year INT NOT NULL,
    round INT NOT NULL,
    number INT NOT NULL,
    question_text TEXT NOT NULL,
    difficulty VARCHAR(20),
    tag_id BIGINT NOT NULL,
    CONSTRAINT fk_question_tag FOREIGN KEY (tag_id) REFERENCES tag(id)
);
```
| 컬럼명        | 타입         | 설명              |
| ------------- | ----------- | --------------- |
| id            | BIGSERIAL   | 문제 고유 ID        |
| exam_year     | INT         | 시험 연도 (예: 2024) |
| round         | INT         | 시험 회차           |
| number        | INT         | 문제 번호           |
| question_text | TEXT        | 문제 본문           |
| difficulty    | VARCHAR(20) | 난이도 (상/중/하)    |
| tag_id        | BIGINT      | 문제 분류 태그 (FK) |
---
## 4. Answer 테이블
- 문제당 1개
- Question에 완전히 종속됨
```sql
CREATE TABLE answer (
    id BIGSERIAL PRIMARY KEY,
    question_id BIGINT NOT NULL UNIQUE,
    answer_text TEXT NOT NULL,
    score INT,
    comment TEXT,
    CONSTRAINT fk_answer_question FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
);
```
| 컬럼명         | 타입        | 설명                  |
| ----------- | --------- | ------------------- |
| id          | BIGSERIAL | 답안 고유 ID            |
| question_id | BIGINT    | 문제 ID (1:1, UNIQUE) |
| member_id   | BIGINT    | 작성자 ID              |
| answer_text | TEXT      | 답안 본문               |
| score       | INT       | 점수                  |
| comment     | TEXT      | 코멘트                 |
---
## 5. 📐 테이블 관계 요약
```text
admin      (인증 전용, 도메인과 분리)

tag        1 ─── N   question
question   1 ─── 1   answer

```
- Answer는 Question 없이는 존재할 수 없음
- Question 삭제 시 Answer 자동 삭제 (CASCADE)
---
## 6. 설계 의도 요약
- 블로그형 정보 관리 서비스에 최적화
- 관리자 단일 운영 전제 → 불필요한 사용자 도메인 제거
- Question을 Aggregate Root로 설정
- Answer는 독립 CRUD를 갖지 않음
- 도메인 단순화를 통해 유지보수 비용 최소화
---