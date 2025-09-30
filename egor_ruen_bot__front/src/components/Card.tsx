// src/components/Card.tsx
import React from 'react'
import cn from 'classnames'

interface CardProps {
  text: string
  isVisible: boolean
  cardType: string
  onClick?: () => void
  symbol?: string
}

const Card: React.FC<CardProps> = ({ text, isVisible, cardType, onClick }) => {
  const baseClasses =
    'relative p-0.5 rounded-sm ff_shadow border border-black/40 dark:border-white/40 flex items-center text-center transition-colors duration-300 h-full'

  let colorClasses = ''
  let finalClasses = ''

  // Адаптивный размер текста: xs на мобильных, sm на средних экранах
  const textClasses = 'text-xs md:text-sm'

  if (cardType === 'russian') {
    // Выравнивание по левому краю для Русского
    finalClasses = `${baseClasses} justify-start bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 cursor-default p-1 ${textClasses}`
  } else {
    // Стиль для пустой/скрытой ячейки
    if (!isVisible) {
      finalClasses = `${baseClasses} justify-center bg-gray-300 dark:bg-gray-800 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-700`
      return (
        <div className={finalClasses} onClick={onClick}>
          {/* Отображение пустой ячейки */}
        </div>
      )
    }

    // Стиль для видимой ячейки (перевода)
    switch (cardType) {
      case 'english':
      case 'form1':
        colorClasses =
          'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800'
        break
      case 'negative':
      case 'form2':
        colorClasses =
          'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800'
        break
      case 'interrogative':
      case 'form3':
        colorClasses =
          'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-800'
        break
      default:
        colorClasses = ''
    }

    // Выравнивание по центру для всех карточек, кроме русского
    finalClasses = `${baseClasses} justify-center ${colorClasses} cursor-pointer ${textClasses}`
  }

  return (
    <div className={finalClasses} onClick={onClick}>
      {text}
    </div>
  )
}

export default Card
