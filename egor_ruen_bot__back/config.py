import os
import logging
from dotenv import load_dotenv

load_dotenv()


class Config:
    TELEGRAM_BOT_TOKEN = os.getenv('TG_EGOR_RUEN_BOT_TOKEN')
    MINIAPP_URL = os.getenv('MINIAPP_URL')

    DEV_OR_PROD = 'PROD'  # DEV | PROD

    if DEV_OR_PROD == 'DEV':
        LOG_TO_FILE = False
        LOG_LEVEL = 'INFO'
    elif DEV_OR_PROD == 'PROD':
        LOG_TO_FILE = True
        LOG_LEVEL = 'WARNING'
        LOG_FILE = 'logs.log'
    else:
        raise ValueError(
            "DEV_OR_PROD в файле 'config.py' должно быть только DEV или PROD")


# проверка обязательных переменных окружения --------------
def validate_config():
    required_vars = {
        'TELEGRAM_BOT_TOKEN': Config.TELEGRAM_BOT_TOKEN,
        'MINIAPP_URL': Config.MINIAPP_URL
    }

    missing_vars = [var for var, value in required_vars.items() if not value]

    if missing_vars:
        raise ValueError(
            f"🔴 Отсутствуют обязательные переменные окружения: {', '.join(missing_vars)}")
    else:
        print('🟢 validate_config is OK')


# logging -------------------------------------------------
def setup_logging():
    log_level = getattr(logging, Config.LOG_LEVEL, logging.INFO)

    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)

    for handler in root_logger.handlers[:]:
        root_logger.removeHandler(handler)

    if Config.LOG_TO_FILE:
        file_handler = logging.FileHandler(
            Config.LOG_FILE,
            encoding='utf-8'
        )
        file_handler.setLevel(log_level)
        file_handler.setFormatter(formatter)
        root_logger.addHandler(file_handler)
        print(f"Логи записываются в файл: {Config.LOG_FILE}")
    else:
        console_handler = logging.StreamHandler()
        console_handler.setLevel(log_level)
        console_handler.setFormatter(formatter)
        root_logger.addHandler(console_handler)
        print("Логи выводятся в консоль")

    logging.getLogger('aiogram').setLevel(logging.WARNING)
    logging.getLogger('httpx').setLevel(logging.WARNING)

    logger = logging.getLogger(__name__)
    logger.info(f"Логирование настроено. Уровень: {Config.LOG_LEVEL}")
    logger.info(f"Режим: {'Файл' if Config.LOG_TO_FILE else 'Консоль'}")
