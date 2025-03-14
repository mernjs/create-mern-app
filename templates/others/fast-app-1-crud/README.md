# Books API

A simple CRUD API created with FastAPI and SQLAlchemy for PostgreSQL

## Available APIs

It is recommended to test the available APIs from ``[GET] /docs``

- ``[GET] /`` - Root (Check API status)
- ``[POST] /books`` - Create Book
- ``[GET] /books/{id}`` - Find Book
- ``[GET] /books`` - Get Books
- ``[PUT] /books`` - Update Book
- ``[DELETE] /books`` - Delete Book

## Usage

1. Install [poetry](https://python-poetry.org/)
2. Copy `.env.sample` to create `.env` and fill the environment variables accordingly
3. Run `poetry install` to install dependencies
4. Run `poetry run uvicorn app.main:app` to serve the app

(note: you'll need to have python installed)
