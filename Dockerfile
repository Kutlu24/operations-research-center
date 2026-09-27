FROM python:3.11-slim

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    PYTHONUTF8=1 \
    PYTHONUNBUFFERED=1

RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH
WORKDIR $HOME/app

RUN pip install --no-cache-dir --upgrade pip

COPY --chown=user pyproject.toml ./
COPY --chown=user src ./src
# Unlike the other four apps in this batch, the frontend here lives at the
# repo root (index.html/script.js/style.css), not a frontend/ subdir - see
# app.py's own _FRONTEND_DIR (parents[3], i.e. this WORKDIR itself).
COPY --chown=user index.html script.js style.css ./

RUN pip install --no-cache-dir --user -e .

EXPOSE 8000

# No persistent volume - LP/queueing solves are stateless per-request.
CMD ["sh", "-c", "uvicorn yoneylem.api.app:app --host 0.0.0.0 --port ${PORT:-8000}"]
