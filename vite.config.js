import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite';
import tailwindcss from '@tailwindcss/postcss';
const path = require('path')

const resolve = (filePath) => {
  const basePath = path.join(__dirname, filePath)
  return basePath
}


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // alias: {
    //   "@c": resolve('src/common'),
    //   "@comp": resolve('src/components'),
    //   "@a": resolve('src/api'),
    //   "@": resolve('src'),
    //   "@u": resolve('src/utils')
    // }
  },
  plugins: [
    uni(),
    UnifiedViteWeappTailwindcssPlugin(
      {
        rem2rpx: true,
      }
    )
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss()
      ]
    }
  }
})
