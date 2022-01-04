import { NextResponse } from 'next/server'
import BasicAuthMiddleware from '/middleware/BasicAuthMiddleware'

const STACK = [
    BasicAuthMiddleware,
]

export default function middleware(request) {
    let response = NextResponse.next()

    console.log('a')

    STACK.forEach(Middleware => {
        console.log('b')
        response = Middleware(request, response)
        console.log('b2')
    })

    console.log('c')
    return response
}
