python -m venv env
source env/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
