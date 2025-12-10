from fastapi import FastAPI
from backend.src.api import chatbot

app = FastAPI()

app.include_router(chatbot.router, prefix="/chatbot")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
