// next.config.js
module.exports = {
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/pages/:path*', // перенаправление на страницы внутри папки pages
            },
        ]
    },
}
