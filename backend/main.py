import os
import random
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles

from auth import auth_user, create_access_token, get_current_user
from config import get_config
from models import ChartData, Token
from utils import credential_exception


app = FastAPI()
cfg = get_config()

origins = [
    'http://127.0.0.1/',
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.mount('/static', StaticFiles(directory=os.path.join(cfg.STATIC_PATH, 'static')), name='static')


@app.get('/')
async def index():
    return FileResponse(cfg.STATIC_PATH + '/index.html')


@app.post('/login', response_model=Token)
async def user_login(form_data: OAuth2PasswordRequestForm = Depends()) -> dict:
    user = auth_user(form_data.username, form_data.password)
    if not user:
        raise credential_exception()
    
    access_token = create_access_token({'sub': user.username})
    return {'access_token': access_token, 'token_type': 'bearer'}


@app.get('/chart-data', response_model=ChartData)
async def get_chart_data(user: dict = Depends(get_current_user)) -> ChartData:
    value = random.randint(10, 90)
    max_value = 100
    return ChartData(value=value, max=max_value)
