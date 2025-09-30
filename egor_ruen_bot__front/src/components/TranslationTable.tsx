// src/components/TranslationTable.tsx
import React, { useState, useCallback } from 'react'
import Card from './Card'
import type { TranslationBlock } from '../data/data'

interface TranslationTableProps {
  data: TranslationBlock[]
}

type ToggleableColumn = 'english' | 'negative' | 'interrogative'

// Создаем начальное состояние: false для всех переключаемых колонок
const getInitialState = (data: TranslationBlock[]) => {
  const initialState: Record<number, Record<ToggleableColumn, boolean>> = {}
  data.forEach((_, rowIndex) => {
    initialState[rowIndex] = { english: false, negative: false, interrogative: false }
  })
  return initialState
}

const TranslationTable: React.FC<TranslationTableProps> = ({ data }) => {
  const [visibilityState, setVisibilityState] = useState(getInitialState(data))
  const [isAllVisible, setIsAllVisible] = useState(false)

  // Хендлер для клика по отдельной карточке
  const toggleCardVisibility = useCallback((rowIndex: number, column: ToggleableColumn) => {
    setVisibilityState((prevState) => ({
      ...prevState,
      [rowIndex]: {
        ...prevState[rowIndex],
        [column]: !prevState[rowIndex][column],
      },
    }))
  }, [])

  // Хендлер для кнопки "Показать/Скрыть все"
  const toggleAllCards = useCallback(() => {
    const newState = !isAllVisible
    setIsAllVisible(newState)

    const newVisibilityState: Record<number, Record<ToggleableColumn, boolean>> = {}
    data.forEach((_, rowIndex) => {
      newVisibilityState[rowIndex] = {
        english: newState,
        negative: newState,
        interrogative: newState,
      }
    })
    setVisibilityState(newVisibilityState)
  }, [isAllVisible, data])

  return (
    <>
      <div className='mb-4 flex justify-center gap-4'>
        <button className='ff_show_hide_translate_buttons' onClick={toggleAllCards} type='button'>
          {isAllVisible ? 'Скрыть переводы' : 'Показать переводы'}
        </button>
      </div>

      {/* <div className='grid grid-cols-[20px_1fr_1fr_1fr_1fr] gap-3 text-sm md:text-base'> */}
      <div className='grid w-full grid-cols-[5px_1fr_1fr_1fr_1fr] gap-2 md:max-w-4xl md:grid-cols-[50px_1fr_1fr_1fr_1fr] md:gap-3'>
        <div className='p-2 text-center'></div>
        <div className='ff_grid-title'>русский</div>
        <div className='ff_grid-title'>утвержд</div>
        <div className='ff_grid-title'>отриц</div>
        <div className='ff_grid-title'>вопрос</div>

        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className='flex cursor-default items-center justify-center text-[10px] text-black/50 dark:text-white/50'>
              {index + 1}
            </div>
            {/* Русский (всегда видим) */}
            <Card text={item.russian} isVisible={true} cardType='russian' />

            {/* Утверждение (English) */}
            <Card
              text={item.english}
              isVisible={visibilityState[index]?.english ?? false}
              cardType='english'
              onClick={() => toggleCardVisibility(index, 'english')}
            />

            {/* Отрицание (Negative) */}
            <Card
              text={item.negative}
              isVisible={visibilityState[index]?.negative ?? false}
              cardType='negative'
              onClick={() => toggleCardVisibility(index, 'negative')}
            />

            {/* Вопрос (Interrogative) */}
            <Card
              text={item.interrogative}
              isVisible={visibilityState[index]?.interrogative ?? false}
              cardType='interrogative'
              onClick={() => toggleCardVisibility(index, 'interrogative')}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default TranslationTable
