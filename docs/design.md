# 📘 Info-Master 설계 문서 (v2.0 – 관리자 단일 모델)

## 1. 프로젝트 개요

본 프로젝트는 관리자(Admin) 단일 계정이 관리하는 문제(Question) 중심 학습/관리 시스템이다.  

일반 사용자는 읽기 전용(조회만 가능)이며, 생성·수정·삭제(CUD)는 관리자만 수행한다.

각 문제는 하나의 답안(Answer)을 가질 수 있다.

본 문서는 현재 구현 기준의 도메인 설계, API 구조, 설계 결정 사항을 기록한다.

## 2. 핵심 도메인 모델

### 2.1 엔티티 관계
```text
Admin (1) ── (N) Question (1) ── (1) Answer
         │
         └─ (N) Tag
```
- Admin은 여러 Question을 생성·관리한다.

- Question은 최대 1개의 Answer를 가진다.

- Answer는 Question에 종속된다.

- Question은 하나 이상의 Tag와 연결될 수 있다.

- 현재 단계에서는 Admin은 고정 계정(Seed Data)으로만 존재한다.
---
## 3. 설계 원칙

### 3.1 Aggregate Root

- Question은 Aggregate Root이다.

- Answer는 Question의 하위 엔티티로 취급한다.

- Answer는 독립 CRUD 대상이 아니다.

- Answer는 Question을 통해서만 생성·수정·조회된다.

### 3.2 Answer 설계 결정

| 항목           | 결정                    |
| ------------ | --------------------- |
| Answer 단독 조회 | ❌ 없음                  |
| Answer 단독 생성 | ❌ 없음                  |
| Answer 단독 수정 | ❌ 없음                  |
| Answer 단독 삭제 | ❌ 없음                  |
| Answer 생성/수정 | Question 하위 Upsert    |
| Answer 삭제    | Question 삭제 시 cascade |
---

## 4. API 설계

### 4.1 Question API
| 항목           | 결정                    |
| ------------ | --------------------- |
| Answer 단독 조회 | ❌ 없음                  |
| Answer 단독 생성 | ❌ 없음                  |
| Answer 단독 수정 | ❌ 없음                  |
| Answer 단독 삭제 | ❌ 없음                  |
| Answer 생성/수정 | Question 하위 Upsert    |
| Answer 삭제    | Question 삭제 시 cascade |

- 현재 단계에서는 인증을 적용하지 않으며 관리자 여부는 AdminContext를 통해 처리한다.
---
### 4.2 Answer API (Question 하위 리소스)

| 기능                | Method | URL                          |
| ----------------- | ------ | ---------------------------- |
| 답안 생성/수정 (Upsert) | PUT    | `/api/questions/{id}/answer` |

- Answer 조회는 Question 조회 응답에 포함된다.
- Answer 전용 GET API는 존재하지 않는다.

### 4.3 Tag API
| 기능       | Method | URL              |
| -------- | ------ | ---------------- |
| 태그 생성    | POST   | `/api/tags`      |
| 태그 단건 조회 | GET    | `/api/tags/{id}` |
| 태그 전체 조회 | GET    | `/api/tags`      |
| 태그 수정    | PUT    | `/api/tags/{id}` |
| 태그 삭제    | DELETE | `/api/tags/{id}` |

- Tag 역시 관리자에 의해 관리되며, 일반 사용자는 조회만 가능하다.

## 5. 관리자(Admin) 정책

### 5.1 관리자 모델

- Admin은 DB에 사전 생성된다.

- 회원가입 / 로그인 / 인증 로직은 없다.

- 관리자 ID는 고정 값으로 관리된다.
```java
AdminContext.getAdminId()를 통해 관리자 ID를 사용한다.
```
- AdminContext는 임시 보안 대체 수단이며, 향후 Spring Security 도입 시 제거 예정이다.

## 6. Controller 설계 원칙
### 6.1 Controller 책임

- Controller는 요청 데이터 전달만 담당한다.

- 권한 및 도메인 판단은 Service 계층에서 처리한다.
```java
PathVariable → 대상 리소스
AdminContext → 행위자(관리자)
```
### 6.2 Controller 구조
```text
controller
 ├─ QuestionController
 │   ├─ Question CRUD
 │   └─ Answer Upsert
 └─ TagController
```
- AnswerController는 존재하지 않는다.

## 7. Service 설계

### 7.1 QuestionService

- Question CRUD

- 관리자 소유 검증

- Question 삭제 시 Answer cascade 삭제

### 7.2 AnswerService

- 역할: Answer Upsert

- Answer가 없으면 생성

- Answer가 있으면 수정

- AnswerRepository 직접 사용하지 않는다.

- 항상 Question을 통해 관리한다.

## 8.설계상 주의 사항

### 8.1 adminId의 의미

- adminId는 행위자 식별자이며
- PathVariable id는 대상 리소스이다.
```java
update(questionId, adminId)
```
- 관리자를 수정하는 것이 아니라, 문제 수정 권한을 검증한다.

### 8.2 Answer 조회 정책

- Answer는 항상 Question 조회 시 포함된다.

- Answer 단독 조회 / 검색 API는 존재하지 않는다.

## 9.향후 확장 계획

- Spring Security 도입

- 관리자 로그인 기능 추가

- Role 기반 권한 모델 확장


## 10. 설계 변경 이력

- 사용자 참여형 모델 제거

- Spring Security 임시 제거

- Admin 단일 고정 모델 도입

- Answer 단독 CRUD 제거

- Aggregate 구조 단순화


## 11. 테스트 전략

- Question + Answer 통합 테스트 중심

- Answer 단독 테스트 없음

- Tag CRUD 별도 테스트
