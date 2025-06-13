from fastapi import APIRouter, Depends
from app.auth.oauth2 import get_current_user

router = APIRouter(prefix="/commerce", tags=["Online Commerce"])

@router.post("/pay")
def online_payment(user: dict = Depends(get_current_user)):
    return {"message": f"{user['username']} is doing an online commerce payment"}