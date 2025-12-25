📘 Info-Master 설계 문서 (초안)
# 1. 프로젝트 개요

본 프로젝트는 문제(Question) 중심의 학습/관리 시스템으로,  
각 문제는 하나의 답안(Answer) 을 가질 수 있다.

본 문서는 도메인 설계 결정 사항과 API 구조를 명확히 기록하기 위해 작성되었다.

---

# 2. 핵심 도메인 모델
## 2.1 엔티티 관계
```text
Member (1) ── (N) Question (1) ── (1) Answer
```
- Member는 여러 Question을 작성할 수 있다.
- Question은 최대 1개의 Answer를 가진다.
- Answer는 Question에 종속되며, 독립적으로 존재하지 않는다.

---

# 3. 설계 원칙
## 3.1 Aggregate Root
- Question은 Aggregate Root이다.
- Answer는 Question의 하위 엔티티로 취급한다.
- Answer는 단독 CRUD 대상이 아니다.
- Answer는 Question을 통해서만 생성·수정·조회된다.

---

## 3.2 Answer 설계 결정
| 항목           | 결정                    |
| ------------ | --------------------- |
| Answer 단독 조회 | ❌ 없음                  |
| Answer 단독 삭제 | ❌ 없음                  |
| Answer 단독 수정 | ❌ 없음                  |
| Answer 생성    | Question 하위에서만        |
| Answer 수정    | Question 하위에서만        |
| Answer 삭제    | Question 삭제 시 cascade |

---

# 4. API 설계
## 4.1 - Question API
| 기능       | Method | URL                   | 인증 |
| -------- | ------ | --------------------- | -- |
| 문제 생성    | POST   | `/api/questions`      | ✅  |
| 문제 단건 조회 | GET    | `/api/questions/{id}` | ❌  |
| 문제 전체 조회 | GET    | `/api/questions`      | ❌  |
| 문제 수정    | PUT    | `/api/questions/{id}` | ✅  |
| 문제 삭제    | DELETE | `/api/questions/{id}` | ✅  |

---

## 4.2 Answer API (Question 하위 리소스)
| 기능                | Method | URL                          | 인증 |
| ----------------- | ------ | ---------------------------- | -- |
| 답안 생성/수정 (Upsert) | PUT    | `/api/questions/{id}/answer` | ✅  |

- 📌 Answer 조회는 GET /api/questions/{id} 응답에 포함된다.

---

# 5. 인증 / 권한 정책
## 5.1 인증(Authentication)
- Spring Security 기반
- 로그인 사용자 정보는 UserPrincipal로 주입받는다.
- 로그인 ID는 email
- DB PK는 member.id (Long)
- 📌 email ≠ member.id

---

## 5.2 권한(Authorization) – 현재 단계

- 권한(Role) 개념은 아직 도입하지 않는다.
- CUD(Create/Update/Delete)는 로그인 사용자만 가능
- 소유자 검증은 서비스 계층에서 처리한다.
```java
questionService.delete(questionId, loginMemberId);
```

---

# 6. Controller 설계 원칙
## 6.1 Controller 책임
- Controller는 행위자(actor)와 요청 데이터만 전달
- 도메인 판단은 Service에서 수행
```java
@PathVariable  → 대상(resource)
@AuthenticationPrincipal → 행위자(actor)
```

---

## 6.2 Controller 구조
```markdown
controller
 └─ QuestionController
     ├─ Question CRUD
     └─ Answer Upsert
```
- AnswerController는 존재하지 않는다.

---

# 7. Service 설계
## 7.1 QuestionService
- Question CRUD
- 소유자 검증
- Question 삭제 시 Answer cascade 삭제

---

## 7.2 AnswerService

- 역할: Answer upsert
- AnswerRepository 직접 사용 ❌
- QuestionRepository를 통해 Answer 관리
```java
PUT /api/questions/{id}/answer
→ 답안 없으면 생성
→ 답안 있으면 수정
```

---

# 8. 설계상 주의 사항 (헷갈리기 쉬운 포인트)
## 8.1 userId의 의미

- user.getId()는 행위자 식별자
- 삭제 대상은 항상 PathVariable로 전달됨
```java
delete(questionId, userId)
```
- ❌ 사용자 삭제
- ✅ 문제 삭제 권한 검증

---

## 8.2 Answer “조회 vs 검색”
- Answer 조회는 존재함 (Question 조회 시 포함)
- Answer 검색 API는 존재하지 않음

---

# 9. 향후 확장 계획
- ADMIN 계정 도입
- ADMIN은 Question/Answer 전체 관리 가능
- 필요 시 Answer를 독립 Aggregate로 승격 가능

---

# 10. 설계 변경 이력
- Answer 단독 CRUD 제거
- AnswerController 제거
- Question 중심 Aggregate 구조 확정
---