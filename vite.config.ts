import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'
import vitePrerender from 'vite-plugin-prerender'
import legacy from "@vitejs/plugin-legacy"

const Renderer = vitePrerender.PuppeteerRenderer
// 当前执行node命令时文件夹的地址(工作目录)
const root = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, root)
  return {
    // root,
    base: './',
    server: {
      host: '0.0.0.0',// 解决vite use--host to expose
      port: 8090,
      open: true,
      // 本地跨域代理
      proxy: {
        '/admin-api': {
          target: env.VITE_BASE_URL,
          ws: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^/admin-api`), ''),
        },
      },
    },
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        {
          find: '@',
          replacement: resolve(__dirname, 'src')
        }
      ]
    },
    build: {
      reportCompressedSize: false,
      minify: 'terser',
      outDir: 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true' ? 'inline' : false,
      // brotliSize: false,
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true'
        }
      }
    },
    plugins: [
      vue(),
      // element组件自动引入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      // element组件自动引入
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue', 'src/**/*.ts', 'src/*.ts']
      }),
      // 需要预渲染的页面，要与router路由一致
      vitePrerender({
        // 要渲染的路由
        routes: ['/'],
        // 静态文件目录
        staticDir: resolve(__dirname, 'dist'),
        // 渲染时是否显示浏览器窗口，值写false可用于调试
        renderer: new Renderer({
          headless: true
        })
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
  }
})
