// from shadcn - https://ui.shadcn.com/docs/dark-mode/astro
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'

export function ModeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setTheme(isDarkMode ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    const isDark = theme === 'dark'
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  }, [theme])

  return (
    <div className='flex gap-2'>
      <button className='rounded-full border border-transparent p-1 transition-all' onClick={() => setTheme('light')}>
        <SunIcon className='h-[1.5rem] w-[1.5rem] hover:fill-current' />
      </button>

      <button className='rounded-full border border-transparent p-1 transition-all' onClick={() => setTheme('dark')}>
        <MoonIcon className='h-[1.5rem] w-[1.5rem] hover:fill-current' />
      </button>
    </div>
  )
}
