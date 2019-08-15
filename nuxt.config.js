const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    server: {
        port: 3004, // default: 3000
    },
    /*
     ** Headers of the page
     */
    head: {
        title: '竞域教育',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '竞域教育是面向全国高校共建电竞学科专业的综合性教研、师资输出平台，为着眼落实国家战略部署与要求，促进中国电竞人才体系的改进与完善，竞域教育致力于通过“产、学、研、训、赛”的人才培养体系为中国电竞行业输送优质从业人员。' },
            {
                hid: 'keywords',
                name: 'keywords',
                content: '竞域教育是面向全国高校共建电竞学科专业的综合性教研、师资输出平台，为着眼落实国家战略部署与要求，促进中国电竞人才体系的改进与完善，竞域教育致力于通过“产、学、研、训、赛”的人才培养体系为中国电竞行业输送优质从业人员。'
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
        // plugins: [
        //     // new MiniCssExtractPlugin({ filename: "[name]/css/[name].[chunkhash:8].css" }),
                
        // ],
        postcss: {
            preset: {
                autoprefixer: {
                    grid: true
                }
            }
        },
        // extend(config, { isDev, isClient }) {
        //     if (isDev && isClient) {
        //         config.module.rules.push({
        //             enforce: 'pre',
        //             test: /\.(js|vue)$/,
        //             loader: 'eslint-loader',
        //             exclude: /(node_modules)/
        //         }, {
        //             test: /\.less$/,
        //             exclude: /node_modules/,
        //             use: [

        //                 // MiniCssExtractPlugin.loader, {
        //                 //     loader: "css-loader",
        //                 //     options: {
        //                 //         minimize: true
        //                 //     }
        //                 // }, 
        //                 {
        //                     loader: "css-loader"
        //                 },
        //                 {
        //                     loader: "less-loader"
        //                 }, {
        //                     loader: "postcss-loader"
        //                 }
        //             ]
        //         }, {
        //             test: /\.css$/,
        //             use: [
        //                 // MiniCssExtractPlugin.loader, {
        //                 //     loader: "css-loader",
        //                 //     options: {
        //                 //         minimize: true
        //                 //     }
        //                 // },
        //                 {
        //                     loader: "css-loader"
        //                 },
        //                 "postcss-loader"
        //             ]
        //         })
        //     }
        // },
        // filenames: {
        //     css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
        // },
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