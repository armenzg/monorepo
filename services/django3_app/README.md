# Django3 app

Simple Django app.

## Prerequisites

* Python 3.7
* [poetry](https://github.com/python-poetry/poetry) as the package manager

## Installation

Run `poetry install`.

## Usage

To run the project: `poetry run ./manage.py runserver`.
To run the migrations: `poetry manage.py migrate`.
To run the tests: `poetry run pytest`.
To add a dependency: `poetry add a_package && poetry export -f requirements.txt -o requirements.txt`
