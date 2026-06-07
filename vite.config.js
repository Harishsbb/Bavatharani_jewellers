import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Automate copying of user's background image to the public folder
try {
  const src = path.resolve('052bb9e4-8423-4827-9468-43f7a6cb2c6e.png')
  const dest = path.resolve('public/hero_bg.png')
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
    console.log('>>> Antigravity: Successfully copied hero_bg.png to public directory')
  } else {
    console.log('>>> Antigravity: Source background image not found at', src)
  }
} catch (e) {
  console.error('>>> Antigravity: Failed to copy background image:', e)
}

// Copy the generated gold logo to the public directory
try {
  const logoSrc = 'C:\\Users\\bavah\\.gemini\\antigravity\\brain\\cd55d708-9df3-4381-b033-1355c083af71\\bj_gold_logo_1780846184949.png'
  const logoDest = path.resolve('public/bj_logo.png')
  const favDest = path.resolve('public/favicon.png')
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, logoDest)
    fs.copyFileSync(logoSrc, favDest)
    console.log('>>> Antigravity: Successfully copied gold logo to public directory')
  } else {
    console.log('>>> Antigravity: Source logo image not found at', logoSrc)
  }
} catch (e) {
  console.error('>>> Antigravity: Failed to copy logo image:', e)
}


export default defineConfig({
  plugins: [react(), tailwindcss()],
})
