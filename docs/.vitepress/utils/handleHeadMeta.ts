import { type HeadConfig, type TransformContext } from "vitepress";

/**
 * 处理每个页面的元数据
 * @param context VitePress转换上下文
 * @returns 页面头部元数据配置数组
 */
export function handleHeadMeta(context: TransformContext) {
  const { description, title, relativePath, frontmatter } = context.pageData;

  // 获取页面描述，如果页面没有描述则使用全局描述
  const curDesc = description || context.description;
  // 获取封面图片，如果没有则使用默认图片
  const cover = frontmatter.cover || 'https://zhiyu1998.github.io/rrorange-and-friends-weekly/favicon-512x512.png'
  // 根据是否有封面图片决定Twitter卡片类型
  const cardType = frontmatter.cover ? 'summary_large_image' : 'summary'

  // 构建Open Graph元数据
  const ogUrl: HeadConfig = ["meta", { property: "og:url", content: addBase(relativePath) }]
  const ogTitle: HeadConfig = ["meta", { property: "og:title", content: title }]
  const ogDescription: HeadConfig = ["meta", { property: "og:description", content: curDesc }]
  const ogImage: HeadConfig = ["meta", { property: "og:image", content: cover }]

  // 构建Twitter卡片元数据
  const twitterCard: HeadConfig = ["meta", { name: "twitter:card", content: cardType }]
  const twitterImage: HeadConfig = ["meta", { name: "twitter:image:src", content: cover }]
  const twitterDescription: HeadConfig = ["meta", { name: "twitter:description", content: curDesc }]

  const twitterHead: HeadConfig[] = [
    ogUrl, ogTitle, ogDescription, ogImage,
    twitterCard, twitterDescription, twitterImage,
  ]

  // 预加载字体配置
  const preloadHead: HeadConfig[] = handleFontsPreload(context)

  return [ ...twitterHead, ...preloadHead ]
}

/**
 * 为相对路径添加基础URL
 * @param relativePath 相对路径
 * @returns 完整的URL
 */
export function addBase(relativePath: string) {
  const host = 'https://zhiyu1998.github.io/rrorange-and-friends-weekly'
  if (relativePath.startsWith('/')) {
    return host + relativePath
  } else {
    return host + '/' + relativePath
  }
}

/**
 * 处理字体预加载配置
 * @param param0 VitePress转换上下文中的assets属性
 * @returns 字体预加载配置数组
 */
export function handleFontsPreload({ assets }: TransformContext) {
  // 只预加载正文字体，代码字体不预加载，因为可能不会使用或者很少使用
  const SourceHanSerifCN = assets.find(file => /SourceHanSerifCN-VF\.\w+\.woff2/)
  
  if (SourceHanSerifCN) {
    return [
      [
        'link',
        {
          rel: 'preload',
          href: SourceHanSerifCN,
          as: 'font',
          type: 'font/woff2',
          crossorigin: ''
        }
      ]
    ] as HeadConfig[]
  }

  return []
}
