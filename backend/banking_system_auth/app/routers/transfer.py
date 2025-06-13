from fastapi import APIRouter, Depends
from app.auth.oauth2 import get_current_user

router = APIRouter(prefix="/transfer", tags=["Fund Transfers"])

@router.post("/send")
def send_funds(user: dict = Depends(get_current_user)):
    return {"message": f"{user['username']} is sending money"}