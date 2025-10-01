import os
import asyncio

from aiogram import Bot, Dispatcher, types
from config import Config, validate_config, setup_logging
from handlers import router


async def main():
    try:
        import logging
        setup_logging()
        logger = logging.getLogger(__name__)

        validate_config()
        logger.info("Конфигурация проверена успешно")

        bot = Bot(token=Config.TELEGRAM_BOT_TOKEN)
        dp = Dispatcher()

        dp.include_router(router)

        # Регистрация команд меню
        await bot.delete_my_commands()  # сначала удалить прежние команды
        commands = [
            types.BotCommand(command="start", description="Начать работу с ботом"),
            # types.BotCommand(command="help", description="Получить справку по использованию"),
        ]
        await bot.set_my_commands(commands)
        logger.info("Команды меню зарегистрированы")

        # Запускаем бота
        logger.info("Бот запущен")
        await dp.start_polling(bot)

    except Exception as e:
        import logging
        logging.error(f"Ошибка при запуске бота: {e}", exc_info=True)


if __name__ == '__main__':

    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print('exit')
