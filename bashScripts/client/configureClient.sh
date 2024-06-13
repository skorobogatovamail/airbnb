cd client
npx degit Elbrus-Bootcamp/vite-react-ts
npm i
npm i axios react-router-dom @mui/material @emotion/react @emotion/styled @mui/styled-engine-sc styled-components @mui/icons-material react-redux zod @reduxjs/toolkit 
echo "import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
" > vite.config.ts

rm -r public/
cd src
rm -r assets/
rm App.css index.css