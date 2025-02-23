---
title: FastApi 초기설정
excerpt: fastapi프레임워크에 대한 초기설정 및 routing, 설정, postgreSQL 연결작업
thumnail: 
categories: posts/dev/Back/FastAPI
tags: 
date: 2025/02/23 12:20:53
last_modified_at: 2025/02/23 16:11:07
---
> Set a goal, make a plan and just do it.

# 개요
Flask, django에 이은 python web api 라이브러리이다. 요새 ai가 발전하면서 작은 프로젝트에서는 ai를 분리하지 않고 백단에서 그냥 처리할 수 있는 경우가 늘어났고 그럴 때 사용하면 좋은 프레임워크이다

# API 명세서(Swagger)
기본적으로 fastapi 는 Swagger를 내장한다. 따라서 `{root}/docs` 위치로 가면 자동으로 fastAPI 내용을 볼 수 있다.
[SWAGGER관련 포스팅](posts/dev/Back/SWAGGER.md)


# 코드

## 초기 환경설정
```shell
# 가상화경 만들기
python -m venv .venv

# 가상환경 활성화(window 의 경우는 중간에 Script, mac 은 bin)
.venv\Scripts\activate

# fastApi 설치
pip install fastapi

# 설치된 pip 리스트 보기
pip list

# 만든 웹 실행을 위한 uvicorn
pip install uvicorn

# postgreSQL 연결을 위한 library 명령어
pip install "psycopg[binary, pool]"

# 리스트 저장 (npm과 같이 나중에 이걸로 설치 가능)
pip freeze > requirements.txt



# 실행코드
# 나중에 실행하는 명령어 / reload 옵션은 파일 변경시 리빌드
uvicorn main:app --reload
```

## python 코드
```python
# main.py
from fastapi import FastAPI
from typing import Union
from controller import items  # controller 폴더안에 items 위치

app = FastAPI()

@app.get("/")
def read_root():
    return {"root":"root"}

# main.py 말고 다른 곳에서 동작
app.include_router(items.router)
```


### 일반적인 화면 Routing
```python
# /controller/items.py
from typing import Unopn
from fastapi import APIRouter

# 여기에 설정하던지 아니면 main.py include_router에 설정하던지 해야함.
router = APIRouter(
    prefix="/items",
    tags=["items"], # swagger 태그 관련
    reponses={404:{"description": "Not found"}}
)

@router.get("/{item_id}")
def read_item(item_id: int, q: Union[srt, None] = None):
    return {"item_id": item_id, "q": q}
```

## 설정 세팅
```python
# config/config.py

# db연결 DSN(DATA SOURCE NAME)
PGSQL_DSN = "postgresql://user:password@host:port/database"

# connection_pool
PGSQL_POOL_MIN_SIZE = 10
PGSQL_POOL_MAX_SIZE = 30
PGSQL_POOL_MAX_IDLE = 20
PGSQL_POOL_TIMEOUT = 100

```


## DB세팅(postgreSQL 연결작업)
```python
import psycopg
import psycopg_pool
from config import config

pool_default = psycopg_pool.ConnectionPool(
    dns = config.PGSQL_DSN,
    min_size = config.PGSQL_POOL_MIN_SIZE,
    max_size = config.PGSQL_POOL_MAX_SIZE,
    max_idle = config.PGSQL_POOL_MAX_IDLE
    timeout = config.PGSQL_POOL_TIMEOUT
)

# dao 로 동작함.
async def execute_query(query: str, params: tuple = None):
    results = None
    async with pool_default.connection() as conn:
        async with conn.cursor(row_factory=psycopg.rows.dict_row) as cur:
            try:
                if params is None:
                    await cur.execute(query)
                else:
                    await cur.execute(query, params)
                results = await cur.fetchall()
            except psycopg.OperationalError as err:
                print(f"Error querying: {err}")
            except psycopg.ProgrammingError as err:
                print(f"Database error via psycopg: {err}")
                results = False
            except psycopg.IntegrityError as err:
                print(f"PostgreSQL integrity error via psycopg: {err}")
                results = False
    return results
```


```python
#/model/model.py
from pydantic import BaseModel
class Model():
    name :str
    phone :str
```


