import os
import asyncio

from aiogram import Bot, Dispatcher, types
from config import Config, validate_config
from handlers import router

TG_TOKEN = Config.TELEGRAM_BOT_TOKEN


bot = Bot(token=TG_TOKEN)
dp = Dispatcher()


async def main():
    dp.include_router(router)
    await dp.start_polling(bot)


if __name__ == '__main__':

    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print('exit')
