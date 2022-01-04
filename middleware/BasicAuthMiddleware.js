import startsWith from 'lodash/startsWith'

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
        return startsWith(request.url, path)
    });
}

const BasicAuthMiddleware = function (request, response) {
    const [requiredUsername, requiredPassword] = getRequiredCredentials()

    if (excluded(request)) {
        return response
    }

    if (!requiredUsername || !requiredPassword) {
        return response
    }

    const authHeader = request.headers.get('authorization')

    if (!authHeader) {
        return requestAuthentication()
    }

    const auth = authHeader.split(' ')[1]
    const [providedUser, providedPassword] = Buffer.from(auth, 'base64').toString().split(':')

    if (providedUser.trim() === requiredUsername.trim() && providedPassword.trim() === requiredPassword.trim()) {
        return response
    }

    return requestAuthentication()
}

export default BasicAuthMiddleware
