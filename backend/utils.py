from fastapi import HTTPException, status


def credential_exception() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Неверные данные'
    )
