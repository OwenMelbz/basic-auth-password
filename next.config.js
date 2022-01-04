const withTM = require('@vercel/edge-functions-ui/transpile')()

module.exports = withTM({
    env: {
        BASIC_AUTH: process.env.BASIC_AUTH,
    }
})
