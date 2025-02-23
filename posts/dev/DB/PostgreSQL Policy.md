

```shell
# postgreSQL 스타트
pg_ctl start


# shell 에서 postgre 시작하는 명령어
psql -U postgres

# 로그인
psql -U test_user -d test_db


```



```sql
-- Role 생성
create user test_user with password 'password';

create database test_db with encoding='utf-8' owner test_user;



```