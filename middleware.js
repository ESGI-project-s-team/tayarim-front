import {NextResponse} from 'next/server'
import acceptLanguage from 'accept-language'
import {fallbackLng, languages, cookieName} from './app/il8n/settings'



acceptLanguage.languages(languages)

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};

export function middleware(req) {
    let lng
    if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
    if (!lng) lng = fallbackLng

    // Handle requests for images in the public directory
    if (req.nextUrl.pathname.startsWith('/public')) {
        return NextResponse.next()
    }

    // Redirect if lng in path is not supported
    if (
        !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
    }

    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer'))
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
        const response = NextResponse.next()
        if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
        return response
    }

    return NextResponse.next()
}
