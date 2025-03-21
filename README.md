# Установка зависимостей
## Фронт
Перейдите в папку frontend и установите зависимости:
```
    cd frontend
    npm install
```
## Бэк
Перейдите в папку backend и установите зависимости:
```
    cd backend
    pip install -r requirements.txt
```

# Сборка
## Фронт
Перед запуском бэка необходимо собрать фронт. В папке frontend:
```
    npm run build
```
Эта команда создаст статические файлы для бэка
## Бэк
После сборки фронта перейдите в папку backend и выполните:
```
    uvicorn main:app
```
Сервер по дефолту будет запущен на http://127.0.0.1:8000/

# Переменные окружения
Для настройки приложения модифицируйте файл .env