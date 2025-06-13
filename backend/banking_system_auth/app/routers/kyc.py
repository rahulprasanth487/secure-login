from fastapi import APIRouter, Depends
from app.auth.oauth2 import get_current_user

router = APIRouter(prefix="/kyc", tags=["KYC Management"])

@router.post("/update")
def update_kyc(user: dict = Depends(get_current_user)):
    return {"message": f"{user['username']} is updating KYC"}