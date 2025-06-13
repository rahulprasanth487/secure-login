from fastapi import APIRouter, Depends
from app.auth.oauth2 import get_current_user

router = APIRouter(prefix="/bill", tags=["Bill Payment"])

@router.post("/pay")
def pay_bill(user: dict = Depends(get_current_user)):
    return {"message": f"{user['username']} is paying a bill"}