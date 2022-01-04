const CONFIG = process.env.BASIC_AUTH

const getRequiredCredentials = () => {
    if (!CONFIG) {
        return []
    }

    return CONFIG.split(':')
}

const requestAuthentication = () => {
    return new Response('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    })
}

const excluded = request => {
    return !!['/api'].find(path => {
        return request.url.startsWith(path)
    });
}

const BasicAuthMiddleware = function (request, response) {
    const [requiredUsername, requiredPassword] = getRequiredCredentials()
    console.log('1')

    if (excluded(request)) {
        console.log('2')
        return response
    }

    console.log('3')
    if (!requiredUsername || !requiredPassword) {
        console.log('4')
        return response
    }

    const authHeader = request.headers.get('authorization')
    console.log('5')

    if (!authHeader) {
        console.log('6')
        return requestAuthentication()
    }

    console.log('7')
    const auth = authHeader.split(' ')[1]
    const [providedUser, providedPassword] = Buffer.from(auth, 'base64').toString().split(':')

    console.log('8')

    if (providedUser.trim() === requiredUsername.trim() && providedPassword.trim() === requiredPassword.trim()) {
        console.log('9')
        return response
    }

    console.log('10')
    return requestAuthentication()
}

export default BasicAuthMiddleware
