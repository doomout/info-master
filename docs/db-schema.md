## 📘 Database Schema — infomaster
이 문서는 infomaster 데이터베이스에서 사용하는 기본 테이블 스키마(DDL) 를 정리한 것입니다.

⚠️ 비밀번호 등 민감 정보는 포함하지 않습니다.  
⚠️ 아래 SQL은 PostgreSQL 기준입니다. 

1. User 테이블
사용자 정보 및 인증을 위한 기본 테이블
```sql
CREATE TABLE public."User" (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

2. Question 테이블

기출 문제 정보를 저장하는 테이블
```sql
CREATE TABLE public."Question" (
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

3. Answer 테이블
사용자가 작성한 답안을 저장하는 테이블
(User : Answer = 1:N, Question : Answer = 1:N)
```sql
CREATE TABLE public."Answer" (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES public."User"(id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES public."Question"(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    score INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

4. Tag 테이블
문제 분류용 태그
```sql
CREATE TABLE public."Tag" (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);
```

5. QuestionTag 테이블
문제와 태그의 N:N 관계를 위한 매핑 테이블
```sql
CREATE TABLE public."QuestionTag" (
    question_id BIGINT NOT NULL REFERENCES public."Question"(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES public."Tag"(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, tag_id)
);
```

