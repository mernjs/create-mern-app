from fastapi import FastAPI
from app.controllers.item_controller import router as item_router
from app.controllers.user_controller import router as user_router
from app.database import engine, Base

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(item_router)
app.include_router(user_router)

# Run the application with: uvicorn app.main:app --reload
