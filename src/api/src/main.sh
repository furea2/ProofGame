
export PYTHONDONTWRITEBYTECODE=1



uvicorn server:app --host '0.0.0.0' --port 8000 --reload
