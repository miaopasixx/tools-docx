import { defineConfig, type SiteConfig } from 'vitepress'
// 自动导入TDesign组件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

// 导入工具函数
import { createRssFileZH } from "../utils/rss";
import { handleHeadMeta } from "../utils/handleHeadMeta";
import { search as zhSearch } from './zh'

// VitePress站点配置
export default defineConfig({
  // 启用最后更新时间
  lastUpdated: true,
  // 启用干净的URL
  cleanUrls: true,
  // 忽略死链接
  ignoreDeadLinks: true,
  // 站点地图配置
  sitemap: {
    hostname: 'https://zhiyu1998.github.io/rrorange-and-friends-weekly'
  },
  // 头部配置
  head: [
    // Google Analytics配置
    ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-Z6HGDC7ZBL" }],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Z6HGDC7ZBL');`,
    ],
    // 网站图标配置
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  ],
  // 转换头部元数据
  async transformHead(context) {
    return handleHeadMeta(context)
  },
  // 构建结束时生成RSS文件
  buildEnd: (config: SiteConfig) => {
    createRssFileZH(config);
  },

  // 主题配置
  themeConfig: {
    // 网站logo配置
    logo: { src: '/favicon.png', width: 24, height: 24 },
    // 大纲配置
    outline: [2, 4],
    // 搜索配置
    search: {
      provider: "algolia",
      options: {
        ...zhSearch
      }
    },
    // 显示外部链接图标
    externalLinkIcon: true,
  },

  // Vite配置
  vite: {
    plugins: [
      // TDesign自动导入配置
      AutoImport({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
      Components({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
    ],
  },
})
