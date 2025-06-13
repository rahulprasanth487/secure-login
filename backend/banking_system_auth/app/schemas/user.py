from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class UserLogin(BaseModel):
    username: str
    password: str

class EmailRequest(BaseModel):
    email: str

class OTPVerify(BaseModel):
    email: str
    otp: str