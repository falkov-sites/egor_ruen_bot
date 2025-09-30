document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const isDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark

  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  const lightThemeBtn = document.getElementById('light-theme-btn')
  const darkThemeBtn = document.getElementById('dark-theme-btn')

  if (lightThemeBtn && darkThemeBtn) {
    lightThemeBtn.addEventListener('click', () => {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    })
    darkThemeBtn.addEventListener('click', () => {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    })
  }
})
