from sqlalchemy import Column, Integer, String, Text
from app.database import Base
from pydantic import BaseModel
from typing import Optional

class ItemModel(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text, nullable=True)

class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
