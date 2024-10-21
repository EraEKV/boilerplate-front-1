// next.config.js
module.exports = {
    async headers() {
        return [
            {
                source: '/images/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
                    },
                    {
                        key: 'Pragma',
                        value: 'no-cache'
                    },
                    {
                        key: 'Expires',
                        value: '0'
                    }
                ]
            }
        ];
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/pages/:path*', // перенаправление на страницы внутри папки pages
            },
        ]
    },
}
