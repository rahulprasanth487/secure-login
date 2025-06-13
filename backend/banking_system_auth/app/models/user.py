from app.auth.security import get_password_hash

fake_users_db = {
"user1": {
        "username": "user1",
        "email": "user1@example.com",
        "hashed_password": get_password_hash("secret1")
    },
    "user2": {
        "username": "user2",
        "email": "user2@example.com",
        "hashed_password": get_password_hash("secret2")
    },
    "user1@example.com": {
        "username": "user1",
        "hashed_password": get_password_hash("secret1")
    },
    "user2@example.com": {
        "username": "user2",
        "hashed_password": get_password_hash("secret2")
    }
}