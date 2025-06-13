from fastapi import APIRouter, Depends
from app.auth.oauth2 import get_current_user
from app.auth.email_otp import get_current_user_from_token
from app.auth.combined_auth import dynamic_auth

router = APIRouter(prefix="/account", tags=["Account Info"])

@router.get("/view")
def view_account(user: dict = Depends(dynamic_auth)):
    return {"message": f"Hello {user['username']}, here’s your account info"}