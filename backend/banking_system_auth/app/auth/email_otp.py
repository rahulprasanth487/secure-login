import random
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException, Request
from app.auth.oauth2 import create_access_token
from app.models.user import fake_users_db
from app.auth.oauth2 import SECRET_KEY, ALGORITHM, create_access_token

otp_store = {}


def generate_otp():
    return str(random.randint(100000, 999999))

def request_otp(email: str):
    if email not in fake_users_db:
        raise HTTPException(status_code=404, detail="User not found")
    otp = generate_otp()
    expiry = datetime.utcnow() + timedelta(minutes=5)
    otp_store[email] = {"otp": otp, "expires": expiry}
    # Simulate email sending
    print(f"[EMAIL OTP SENT] Email: {email}, OTP: {otp}")
    return {"message": "OTP sent to email"}

def verify_otp_and_get_token(email: str, otp: str):
    entry = otp_store.get(email)
    if not entry or entry["otp"] != otp or datetime.utcnow() > entry["expires"]:
        raise HTTPException(status_code=401, detail="Invalid or expired OTP")
    token = create_access_token(data={"sub": email})
    return {"access_token": token, "token_type": "bearer"}

def get_current_user_from_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None or email not in fake_users_db:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return fake_users_db[email]
    except JWTError:
        raise HTTPException(status_code=401, detail="Token validation failed")