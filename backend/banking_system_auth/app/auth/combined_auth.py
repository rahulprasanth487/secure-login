import os
from fastapi import Depends, HTTPException, Request
from app.auth.oauth2 import get_current_user
from app.auth.email_otp import get_current_user_from_token

AUTH_MODE = int(os.getenv("AUTH_MODE", 2))

# Combined authentication logic
async def dynamic_auth(request: Request):
    if AUTH_MODE == 1:
        return await get_current_user(request)
    elif AUTH_MODE == 2:
        return await get_current_user_from_token(request)
    else:
        raise HTTPException(status_code=400, detail="Invalid AUTH_MODE")