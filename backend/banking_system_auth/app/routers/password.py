from fastapi import APIRouter, Depends
from app.auth.oauth2 import get_current_user

router = APIRouter(prefix="/password", tags=["Password Reset"])

@router.post("/reset")
def reset_password(user: dict = Depends(get_current_user)):
    return {"message": f"{user['username']} requested password reset"}