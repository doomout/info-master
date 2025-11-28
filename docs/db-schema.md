## 📘 Database Schema — infomaster
이 문서는 infomaster 데이터베이스에서 사용하는 기본 테이블 스키마(DDL) 를 정리한 것입니다.

⚠️ 비밀번호 등 민감 정보는 포함하지 않습니다.  
⚠️ 아래 SQL은 PostgreSQL 기준입니다. 

### 1. Member 테이블 : 사용자 정보 및 인증을 위한 기본 테이블
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
| 컬럼명        | 타입           | 설명                  |
| ---------- | ------------ | ------------------- |
| id         | BIGSERIAL    | 회원 고유 ID (자동 증가 PK) |
| email      | VARCHAR(200) | 로그인용 이메일 (유니크)      |
| password   | VARCHAR(200) | 암호(해시 저장 예정)        |
| name       | VARCHAR(100) | 사용자 이름              |
| created_at | TIMESTAMP    | 생성 시각 (자동)          |
| updated_at | TIMESTAMP    | 수정 시각 (자동)          |


### 2. Question 테이블 : 기출 문제 정보를 저장하는 테이블
```sql
CREATE TABLE public.question (
    id BIGSERIAL PRIMARY KEY,
    year INT NOT NULL,
    round INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    number INT NOT NULL,
    question_text TEXT NOT NULL,
    difficulty VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```
| 컬럼명           | 타입           | 설명                          |
| ------------- | ------------ | --------------------------- |
| id            | BIGSERIAL    | 문제 고유 ID                    |
| year          | INT          | 시험 연도 (예: 2024, 2023)       |
| round         | INT          | 시험 회차 (예: 128회)             |
| subject       | VARCHAR(100) | 과목/교시 (예: 1교시 / 정보시스템 구축관리) |
| number        | INT          | 문제 번호 (예: 1번, 2번)           |
| question_text | TEXT         | 문제 본문 전체                    |
| difficulty    | VARCHAR(20)  | 난이도 (상/중/하 등)               |
| created_at    | TIMESTAMP    | 생성 시각                       |
| updated_at    | TIMESTAMP    | 수정 시각                       |


### 3. Answer 테이블 : 사용자가 작성한 답안을 저장하는 테이블(User : Answer = 1:N, Question : Answer = 1:N)
```sql
CREATE TABLE public.answer (
    id BIGSERIAL PRIMARY KEY,
    member_id BIGINT NOT NULL REFERENCES public.member(id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES public.question(id) ON DELETE CASCADE,
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
| member_id   | BIGINT    | 답안을 작성한 사용자 ID (FK) |
| question_id | BIGINT    | 해당 문제 ID (FK)       |
| answer_text | TEXT      | 사용자가 작성한 답안 본문      |
| score       | INT       | 점수 (채점 시스템 도입 시 사용) |
| comment     | TEXT      | 코멘트 또는 피드백          |
| created_at  | TIMESTAMP | 생성 시각               |
| updated_at  | TIMESTAMP | 수정 시각               |


### 4. Tag 테이블 : 문제 분류용 태그
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


### 5. QuestionTag 테이블 : 문제와 태그의 N:N 관계를 위한 매핑 테이블
```sql
CREATE TABLE public.question_tag (
    id BIGSERIAL PRIMARY KEY,
    question_id BIGINT NOT NULL REFERENCES public.question(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES public.tag(id) ON DELETE CASCADE,
    UNIQUE (question_id, tag_id)
);
```
| 컬럼명         | 타입     | 설명             |
| ----------- | ------ | -------------- |
| question_id | BIGINT | 문제 ID (FK)     |
| tag_id      | BIGINT | 태그 ID (FK)     |
| (PK)        | (복합키)  | 동일 문제-태그 중복 방지 |
