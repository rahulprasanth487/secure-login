# Folder: banking_app/app/main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.openapi.utils import get_openapi
from fastapi.security import OAuth2PasswordRequestForm
from app.auth.oauth2 import authenticate_user, create_access_token
from app.schemas.user import Token

from app.auth.email_otp import request_otp, verify_otp_and_get_token, get_current_user_from_token
from app.schemas.user import Token, EmailRequest, OTPVerify
from app.routers import account, transfer, bill, kyc, password, commerce

app = FastAPI(title="Internet Banking API",
    description="Protected with Email OTP token",
    version="1.0.0",
    swagger_ui_init_oauth={"usePkceWithAuthorizationCodeGrant": True})

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(data={"sub": user["username"]})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/email/request-otp")
def send_email_otp(email_req: EmailRequest):
    return request_otp(email_req.email)

@app.post("/email/verify-otp", response_model=Token)
def verify_email_otp(data: OTPVerify):
    return verify_otp_and_get_token(data.email, data.otp)


app.include_router(account.router)
app.include_router(transfer.router)
app.include_router(bill.router)
app.include_router(kyc.router)
app.include_router(password.router)
app.include_router(commerce.router)

def custom_openapi():
    openapi_schema = get_openapi(
        title="Internet Banking API",
        version="1.0.0",
        description="API protected with OAuth2 and Email OTP token",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuthEmailOTP": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        },
        "OAuth2PasswordBearer": {
            "type": "oauth2",
            "flows": {
                "password": {
                    "tokenUrl": "/login",
                    "scopes": {}
                }
            }
        }
    }
    for path in openapi_schema["paths"].values():
        for operation in path.values():
            operation["security"] = [
                {"BearerAuthEmailOTP": []},
                {"OAuth2PasswordBearer": []}
            ]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi