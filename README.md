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

## API Endpoint
### User(유저)
#### Register (유저생성 or 회원가입)
- Method: POST
- Endpoint: http://localhost:3000/auth/register
- Body:
  - username: string (required)
    - (Min 4 & Max 20 letters)
  - password: string (required)
    - (Min 8 & Max 20 letters)
- Request
```bash
curl --location --request POST 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=user' \
--data-urlencode 'password=password'
```
- Response
```bash
# 201
{
    "access_token": "eyJhbGciOiJIUzI1N..."
}

# 400
{
    "statusCode": 400,
    "message": [
        "username must be longer than or equal to 4 characters"
    ],
    "error": "Bad Request"
}
```
***

#### Log In (로그인)
- Method: POST
- Endpoint: http://localhost:3000/auth/login
- Body:
  - username: string (required)
  - password: string (required)
- Request
```bash
curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=user' \
--data-urlencode 'password=password'
```
- Response
```bash
# 200
{ 
    "accessToken": "eyJhbGciOiJI..."
}

# 404
{
    "statusCode": 404,
    "message": "User not found",
    "error": "Not Found"
}
```

***

### Post(게시물)
#### Create Post (글 작성)
- Method: POST
- Endpoint: http://localhost:3000/posts
- Header:
  - Authorization(token): string (required)
- Body:
  - title: string (required)
  - content: string (required)
- Request
```bash
curl --location --request POST 'http://localhost:3000/posts' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5...' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'content=some contents for this post' \
--data-urlencode 'category=GREETINGS'
```
- Response
```bash
# 200
{
    "read_user": [
        "user"
    ],
    "category": "GREETINGS",
    "content": "some contents for this post",
    "title": "This is a title",
    "_id": "61816c134f445cab0f4c68fa",
    "author": "user",
    "created_at": "2021-11-02T16:49:23.654Z",
    "updated_at": "2021-11-02T16:49:23.654Z",
    "read_count": 1,
    "user": "61816c134f445cab0f4c68fa",
    "__v": 0
}

# 400{
    "statusCode": 400,
    "message": [
        "title must be a string"
    ],
    "error": "Bad Request"
}

# 401 (Bad Token)
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```
***

#### Update Post (글 수정)
- Method: PATCH
- Endpoint: http://localhost:3000/posts/:id
- Header:
  - Authorization(token): string (required)
- Param:
  - id(글 id): string (required)
- Body:
  - title: string (optional)
  - content: string (required)
  - category: GREETINGS || RANDOM || DAILY (optional)
- Request
```bash
curl --location --request PATCH 'http://localhost:3000/posts/61816d414f445cab0f4c68ff' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5...' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'title=title update' \
--data-urlencode 'content=content update' \
--data-urlencode 'category=RANDOM'
```
- Response
```bash
# 200
{
    "_id": "61816d414f445cab0f4c68ff",
    "read_user": [
        "user"
    ],
    "category": "RANDOM",
    "content": "content update",
    "title": "title update",
    "author": "user",
    "created_at": "2021-11-02T16:54:25.161Z",
    "updated_at": "2021-11-02T16:54:56.794Z",
    "read_count": 1,
    "user": "61816b0a4f445cab0f4c68f3",
    "__v": 0
}

# 400
{
    "statusCode": 400,
    "message": "Bad Request"
}

# 401 (Bad Token)
{
    "statusCode": 401,
    "message": "Unauthorized"
}

# 404
{
    "statusCode": 404,
    "message": "Post with ID \"61816d414f445cab0f4c68fd\" not found",
    "error": "Not Found"
}
```
***

#### Delete Post (글 삭제)
- Method: DELETE
- Endpoint: http://localhost:3000/posts/:id
- Header:
  - Authorization(token): string (required)
- Param:
  - id(글 id): string (required)
- Request
```bash
curl --location --request DELETE 'http://localhost:3000/posts/61816d414f445cab0f4c68ff' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI...'
```
- Response
```bash
# 200
{
    "message": "Post deleted"
}

# 401 (Bad Token)
{
    "statusCode": 401,
    "message": "Unauthorized"
}

# 404
{
    "statusCode": 404,
    "message": "Post with ID \"61816d414f445cab0f4c68ff\" not found",
    "error": "Not Found"
}
```
***

#### Get A Post by ID (아이디로 글 하나 읽기)
- Method: GET
- Endpoint: http://localhost:3000/posts/:id
- Header:
  - Authorization(token): string (required)
- Param:
  - id(글 id): string (required)
- Request
```bash
curl --location --request GET 'http://localhost:3000/posts/61816e3b4f445cab0f4c690d' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI...'
```
- Response
```bash
# 200
{
    "_id": "61816e3b4f445cab0f4c690d",
    "read_user": [
        "user",
        "tester4"
    ],
    "category": "GREETINGS",
    "content": "some contents for this post",
    "title": "This is a title",
    "author": "user",
    "created_at": "2021-11-02T16:58:35.625Z",
    "updated_at": "2021-11-02T16:58:35.625Z",
    "read_count": 2,
    "user": "61816b0a4f445cab0f4c68f3",
    "__v": 1
}

# 401 (Bad Token)
{
    "statusCode": 401,
    "message": "Unauthorized"
}

# 404
{
    "statusCode": 404,
    "message": "Post with ID \"61816e3b4f445cab0f4c690f\" not found",
    "error": "Not Found"
}
```
***

#### Get All Posts (전체 글 일기)
- Method: GET
- Endpoint: http://localhost:3000/posts
- Header:
  - Authorization(token): string (required)
- Query:
  - limit: string (optional)
  - offset: string (optional)
  - search: string (optional)
- Request
```bash
curl --location --request GET 'http://localhost:3000/posts?limit=5&offset=0&search=test' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1...'
```
- Response
```bash
# 200
{
    "count": 5,
    "data": [
        {
            "_id": "618134e1ba4a69f19b9a536e",
            "read_user": [
                "tester2"
            ],
            "category": "GREETINGS",
            "content": "testing",
            "title": "tester2 post",
            "author": "tester2",
            "created_at": "2021-11-02T12:53:53.343Z",
            "updated_at": "2021-11-02T12:53:53.343Z",
            "count": 1,
            "user": "61812da7ba4a69f19b9a5361",
            "__v": 0
        },
        ...
    ]
}

# 401 (Bad Token)
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```
