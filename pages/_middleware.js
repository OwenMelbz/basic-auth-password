import { NextResponse } from 'next/server'
import BasicAuthMiddleware from '/middleware/BasicAuthMiddleware'

const STACK = [
    BasicAuthMiddleware,
]

export function middleware(request) {
    let response = NextResponse.next()

    STACK.forEach(Middleware => {
        response = Middleware(request, response)
    })

    return response
}
