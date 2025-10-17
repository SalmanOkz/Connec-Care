'use client'

import { redirect, usePathname } from 'next/navigation'

import type { Locale } from '@configs/i18n'
import themeConfig from '@configs/themeConfig'
import { getLocalizedUrl } from '@/utils/i18n'

const AuthRedirect = ({ lang }: { lang: Locale }) => {
  const pathname = usePathname()

  const redirectUrl = `/${lang}/login?redirectTo=${pathname}`
  const login = `/${lang}/login`
  const homePage = getLocalizedUrl(themeConfig.homePageUrl, lang)

  // ✅ If user is on the landing page, DO NOT redirect
  if (pathname === homePage) {
    return null
  }

  // ✅ If already on login, stay there
  if (pathname === login) {
    return null
  }

  // ✅ Otherwise, redirect to login
  return redirect(redirectUrl)
}

export default AuthRedirect
