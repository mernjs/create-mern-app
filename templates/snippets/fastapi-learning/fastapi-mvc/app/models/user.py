from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Column, Integer, String
from app.database import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, nullable=True)

class User(BaseModel):
    id: int
    username: str
    email: Optional[str] = None
