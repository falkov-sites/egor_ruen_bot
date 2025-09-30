import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    TELEGRAM_BOT_TOKEN = os.getenv('TG_EGOR_RUEN_BOT_TOKEN')
    MINIAPP_URL = os.getenv('MINIAPP_URL')

    DEV_OR_PROD = 'PROD'  # DEV | PROD

    if DEV_OR_PROD == 'DEV':
        LOG_TO_FILE = 'false'
        LOG_LEVEL = 'INFO'
    elif DEV_OR_PROD == 'PROD':
        LOG_TO_FILE = 'true'
        LOG_LEVEL = 'WARNING'
        LOG_FILE = 'logs.log'
    else:
        raise ValueError(
            "DEV_OR_PROD в файле 'config.py' должно быть только DEV или PROD")


# проверка обязательных переменных окружения
def validate_config():
    required_vars = {
        'TELEGRAM_BOT_TOKEN': Config.TELEGRAM_BOT_TOKEN,
        'MINIAPP_URL': Config.MINIAPP_URL
    }

    missing_vars = [var for var, value in required_vars.items() if not value]

    if missing_vars:
        raise ValueError(
            f"Отсутствуют обязательные переменные окружения: {', '.join(missing_vars)}")
