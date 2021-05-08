import defaultSettings from '@/config'

const title = defaultSettings.title || '雷鸟综合业务支撑平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
