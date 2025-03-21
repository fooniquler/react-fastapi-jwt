from datetime import datetime, timedelta
import datetime as date
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from config import get_config
from models import User
from utils import credential_exception


cfg = get_config()
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2 = OAuth2PasswordBearer(tokenUrl='login')

db_data = {
    'user1': User(username='user1', password=pwd_context.hash('qwerty123')),
    'user2': User(username='user2', password=pwd_context.hash('password'))
}


def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(date.timezone.utc) + timedelta(minutes=cfg.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': int(expire.timestamp())})
    encoded_jwt = jwt.encode(to_encode, cfg.SECRET_KEY, cfg.ALGORITHM)
    return encoded_jwt


def auth_user(username: str, password: str) -> User | None:
    user = db_data.get(username)
    if user and verify_password(password, user.password):
        return user
    return None


async def get_current_user(token: str = Depends(oauth2)) -> User:
    try:
        payload = jwt.decode(token, cfg.SECRET_KEY, cfg.ALGORITHM)
        username = payload.get('sub')
        if not username:
            raise credential_exception()

    except JWTError:
        raise credential_exception()
    
    user = db_data.get(username)
    if not user:
        raise credential_exception()
    return user
