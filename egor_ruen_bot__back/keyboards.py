from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.types import WebAppInfo

from dotenv import load_dotenv



inline_kb = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(
        text='Начать проверку знаний 🥲',
        web_app=WebAppInfo(url='https://ruen.falkov.site')
    )
    ]
])
