import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  root: './front',
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          filename: 'index.html',
          template: './front/index.html', 
          title: "Mock: backstagetalks",
          injectScript: `<script type="module" src="/js/index.js"></script>
          <script type="module" src="/js/generateMenuAnimation.js"></script>`
        }
      }
    })
  ]
});
