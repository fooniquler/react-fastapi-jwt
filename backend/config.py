from functools import cache
from pydantic_settings import BaseSettings


class Config(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    HOST_URL: str

    STATIC_PATH: str = '../frontend/build'

    def __init__(self, _env_file: str = '.env'):
        super().__init__(_env_file=_env_file)

    class Config:
        extra = 'ignore'


@cache
def get_config() -> Config:
    return Config()
