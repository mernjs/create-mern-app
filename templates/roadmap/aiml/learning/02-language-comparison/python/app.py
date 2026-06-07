from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.hash import bcrypt
from datetime import datetime, timedelta
from pydantic import BaseModel
import jwt
import os

# Environment variables
JWT_SECRET = os.getenv("JWT_SECRET", "supersecretkey")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev.db")
PORT = int(os.getenv("PORT", 8000))

# Database setup (SQLite similar to Prisma dev.db)
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# User model (like Prisma schema)
class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)


# Pydantic models for request validation
class SignupRequest(BaseModel):
    name: str = None
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI()

# Enable CORS (like express cors())
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/signup")
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    # Check if user exists
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        return JSONResponse(status_code=400, content={"message": "User already exists"})

    # Hash password
    hashed_password = bcrypt.hash(data.password)

    # Create user
    new_user = User(name=data.name, email=data.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "data": {"id": new_user.id, "email": new_user.email, "name": new_user.name},
    }


@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    # Check user
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        return JSONResponse(status_code=400, content={"message": "Invalid email or password"})

    # Compare password
    if not bcrypt.verify(data.password, user.password):
        return JSONResponse(status_code=400, content={"message": "Invalid email or password"})

    # Generate JWT
    payload = {"id": user.id, "email": user.email, "exp": datetime.utcnow() + timedelta(hours=1)}
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")

    return {
        "message": "Login successful",
        "data": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "token": token,
        },
    }


@app.get("/profile")
def profile(request: Request, db: Session = Depends(get_db)):
    auth_header = request.headers.get("authorization")
    if not auth_header:
        return JSONResponse(status_code=401, content={"message": "No token provided"})

    token = auth_header.split(" ")[1]
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(User).filter(User.id == decoded["id"]).first()
        return {
            "message": "Success",
            "data": {"id": user.id, "name": user.name, "email": user.email},
        }
    except Exception:
        return JSONResponse(status_code=401, content={"message": "Invalid token"})