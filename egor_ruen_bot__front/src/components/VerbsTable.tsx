// src/components/VerbsTable.tsx
import React, { useState, useCallback } from 'react'
import Card from './Card'
import type { IrregularVerb } from '../data/data'

interface VerbsTableProps {
  data: IrregularVerb[]
}

type ToggleableColumn = 'form1' | 'form2' | 'form3'

// Создаем начальное состояние: false для всех переключаемых колонок
const getInitialState = (data: IrregularVerb[]) => {
  const initialState: Record<number, Record<ToggleableColumn, boolean>> = {}
  data.forEach((_, rowIndex) => {
    initialState[rowIndex] = { form1: false, form2: false, form3: false }
  })
  return initialState
}

const VerbsTable: React.FC<VerbsTableProps> = ({ data }) => {
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
        form1: newState,
        form2: newState,
        form3: newState,
      }
    })
    setVisibilityState(newVisibilityState)
  }, [isAllVisible, data])

  return (
    <>
      <div className='mb-4 flex justify-center gap-4'>
        <button className='ff_show_hide_translate_buttons' onClick={toggleAllCards} type='button'>
          {isAllVisible ? 'Скрыть формы' : 'Показать формы'}
        </button>
      </div>

      <div className='grid w-full grid-cols-[5px_1fr_1fr_1fr_1fr] gap-2 md:max-w-4xl md:grid-cols-[50px_1fr_1fr_1fr_1fr] md:gap-3'>
        <div className='p-2 text-center'></div>
        <div className='ff_grid-title'>русский</div>
        <div className='ff_grid-title'>V1 (Infinitive)</div>
        <div className='ff_grid-title'>V2 (Past Simple)</div>
        <div className='ff_grid-title'>V3 (Participle)</div>

        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className='flex cursor-default items-center justify-center text-[10px] text-black/50 dark:text-white/50'>
              {index + 1}
            </div>
            {/* Русский (всегда видим) */}
            <Card text={item.russian} isVisible={true} cardType='russian' />

            {/* Form 1 */}
            <Card
              text={item.form1}
              isVisible={visibilityState[index]?.form1 ?? false}
              cardType='form1'
              onClick={() => toggleCardVisibility(index, 'form1')}
            />

            {/* Form 2 */}
            <Card
              text={item.form2}
              isVisible={visibilityState[index]?.form2 ?? false}
              cardType='form2'
              onClick={() => toggleCardVisibility(index, 'form2')}
            />

            {/* Form 3 */}
            <Card
              text={item.form3}
              isVisible={visibilityState[index]?.form3 ?? false}
              cardType='form3'
              onClick={() => toggleCardVisibility(index, 'form3')}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default VerbsTable
