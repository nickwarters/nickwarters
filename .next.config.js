const path = require(`path`)
const withImages = require('next-images')

module.exports = withImages({
    webpack: (config, { isServer }) => {
        if (isServer) {
            //   require('./src/scripts/generate-sitemap');
            // require('./scripts/generate-rss');
        }

        // Fixes npm packages (mdx) that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty',
            }
        }
        return config
    },
})
