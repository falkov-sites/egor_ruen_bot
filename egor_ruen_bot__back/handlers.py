from aiogram import F, Router
from aiogram.filters import CommandStart, Command
from aiogram.types import Message, CallbackQuery

import keyboards as kb

router = Router()


@router.message(CommandStart())
async def cmd_start(msg: Message):
    await msg.reply(f'Привет {msg.from_user.first_name}! Начнем проверку знаний?',
                    reply_markup=kb.inline_kb
                    )
