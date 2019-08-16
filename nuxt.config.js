const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    server: {
        port: 3004, // default: 3000
    },
    /*
     ** Headers of the page
     */
    head: {
        title: '电竞人才网',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '电竞人才网-最高效的电竞求职者平台，为有志于电竞的求职者提供最全最准确最新的招聘信息，搭建电竞圈最佳的人才招募与培养渠道。电竞一手招聘信息尽在电竞人才网。' },
            {
                hid: 'keywords',
                name: 'keywords',
                content: '电竞,电竞行业,电竞招聘,招聘网,电竞人才,上海招聘,人才,电竞教育,招聘,招聘电竞,上海电竞,电子竞技'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/logo.jpg' }
        ],
        script: [
            { src: '/jquery.min.js' },
            // { src: '/fileSaver.js' },
            // { src: '/jquery.exportword.js' }
            { src: '/html2canvas.min.js' }
            
        ]
    },
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },
    /*
     ** Global CSS
     */
    css: [
        './static/index.css'
    ],
    plugins: [
        "./plugins/utils/adtion.js",
        "./plugins/utils/antd.js"
    ],
    /*
     ** Build configuration
     */
    build: {
        plugins: [
            new MiniCssExtractPlugin({ filename: "[name]/css/[name].[chunkhash:8].css" }), 
        ],
        postcss: {
            preset: {
                autoprefixer: {
                    grid: true
                }
            }
        },
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                }, {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    use: [

                        MiniCssExtractPlugin.loader, {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        }, 
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader"
                        }, {
                            loader: "postcss-loader"
                        }
                    ]
                }, {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader, {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "css-loader"
                        },
                        "postcss-loader"
                    ]
                })
            }
        },
        filenames: {
            css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
        },
    },

    router: {
        extendRoutes(routes, resolve) {
            routes.push( {
                name: 'mhome',
                path: '/mobile',
                component: resolve(__dirname, './pages/mobile/index.vue')
            })
        }
    }
}