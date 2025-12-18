📘 Database Schema — infomaster (v2, 단순화 버전)

이 문서는 자격증 기출 문제 학습 서비스를 위한
infomaster 데이터베이스의 최종 스키마(v2) 입니다.

✅ 설계 기준

문제 : 답 = 1 : 1

문제 : 태그 = 1 : 1

불필요한 N:N 관계 제거

기출 문제 도메인에 맞게 단순화

⚠️ 비밀번호 등 민감 정보는 포함하지 않습니다.
⚠️ PostgreSQL 기준입니다.
---
## 1. Member 테이블
- 사용자 정보 및 인증
```sql
CREATE TABLE public.member (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```
| 컬럼명        | 타입           | 설명            |
| ---------- | ------------ | ------------- |
| id         | BIGSERIAL    | 회원 고유 ID      |
| email      | VARCHAR(200) | 로그인 이메일 (유니크) |
| password   | VARCHAR(200) | 암호 (해시 저장)    |
| name       | VARCHAR(100) | 사용자 이름        |
| created_at | TIMESTAMP    | 생성 시각         |
| updated_at | TIMESTAMP    | 수정 시각         |
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
CREATE TABLE public.question (
    id BIGSERIAL PRIMARY KEY,
    exam_year INT NOT NULL,
    round INT NOT NULL,
    number INT NOT NULL,
    question_text TEXT NOT NULL,
    difficulty VARCHAR(20),
    tag_id BIGINT NOT NULL REFERENCES public.tag(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```
| 컬럼명           | 타입          | 설명              |
| ------------- | ----------- | --------------- |
| id            | BIGSERIAL   | 문제 고유 ID        |
| exam_year     | INT         | 시험 연도 (예: 2024) |
| round         | INT         | 시험 회차           |
| number        | INT         | 문제 번호           |
| question_text | TEXT        | 문제 본문           |
| difficulty    | VARCHAR(20) | 난이도 (상/중/하)     |
| tag_id        | BIGINT      | 문제 분류 태그 (FK)   |
| created_at    | TIMESTAMP   | 생성 시각           |
| updated_at    | TIMESTAMP   | 수정 시각           |
---
## 4. Answer 테이블
- 문제에 대한 사용자 답안 (문제당 1개)
```sql
CREATE TABLE public.answer (
    id BIGSERIAL PRIMARY KEY,
    question_id BIGINT NOT NULL UNIQUE REFERENCES public.question(id) ON DELETE CASCADE,
    member_id BIGINT NOT NULL REFERENCES public.member(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    score INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
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
| created_at  | TIMESTAMP | 생성 시각               |
| updated_at  | TIMESTAMP | 수정 시각               |
---
## 5. 📐 테이블 관계 요약
```text
Member   1 ─── N   Answer
Question 1 ─── 1   Answer
Question 1 ─── 1   Tag
```
---
## 6. 설계 의도 요약

- 기출 문제 학습이라는 명확한 도메인에 맞춰 단순화

- 불필요한 N:N 관계 제거

- 설계 변경 시 영향 범위를 최소화하는 구조

- 실제 사용 시나리오에 맞는 제약을 DB 레벨에서 강제