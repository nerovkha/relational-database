# Part 13 — Relational databases

Exercises for [Full Stack Open](https://fullstackopen.com) part 13
(CSM14114): the bloglist backend rebuilt on PostgreSQL with Sequelize,
Umzug SQL migrations, and user sessions.

## Run

Requires a PostgreSQL database and a `.env` file:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/bloglist
SECRET=devsecret
```

```bash
npm install
npm run migrate      # apply Umzug SQL migrations
npm run seed         # insert seed data
npm run dev          # http://localhost:3002/api/blogs
npm run cli:blogs    # print all blogs from the database
```

A quick local database:

```bash
docker run -d --name bloglist-pg -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=bloglist postgres:17
```

## Test in CI

`.github/workflows/ci.yml` starts a PostgreSQL service, runs the
migrations, seeds the database and queries it back on every push and
pull request. This directory is self-contained — copy its contents into
a new repository and CI works without any extra setup.
