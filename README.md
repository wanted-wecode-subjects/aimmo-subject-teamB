# 프리온보딩 1주차 AIMMO사 과제

## 개발 요구사항

- 원티드 지원 과제 내용 포함
- 게시글 카테고리
- 게시글 검색
- 대댓글(1 depth)
  - 대댓글 pagination
- 게시글 읽힘 수
  - 같은 User가 게시글을 읽는 경우 count 수 증가하면 안 됨
- Rest API 설계
- Unit Test
- 1000만건 이상의 데이터를 넣고 성능테스트 진행 결과 필요

## 개발 환경

- 언어: Typescript
- 프레임워크: NestJs
- 데이터베이스: MongoDB
- 라이브러리:
  - Passport
  - bcrypt
  - TypeORM
  - class-validator
