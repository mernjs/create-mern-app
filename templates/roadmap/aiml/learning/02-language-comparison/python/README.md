
# **Python + FastAPI – Step by Step Setup**

**Step 1: Install Python**

* Download Python from [python.org](https://python.org) (Python 3.10+ recommended)
* Or use `pyenv` to manage multiple Python versions:

```bash
pyenv install 3.11.7
pyenv global 3.11.7
```

**Step 2: Verify Installation**

```bash
python --version
pip --version
```


**Step 3:** Create project folder

```bash
mkdir python-auth-api
```

**Step 4:** Move into folder

```bash
cd python-auth-api
```

**Step 5:** Create virtual environment

```bash
python -m venv venv
```

**Step 6:** Activate virtual environment

```bash
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

**Step 7:** Install dependencies

```bash
pip install -r requirements.txt
```

**Step 8:** Run FastAPI server

```bash
uvicorn app:app --reload --port 8000
```

**Step 9:** Test APIs via Postman or curl:

* `POST /signup`
* `POST /login`
* `GET /profile`