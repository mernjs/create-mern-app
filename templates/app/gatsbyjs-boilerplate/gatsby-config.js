module.exports = {
    flags: {
        DEV_SSR: false
    },
    siteMetadata: {
        title: `Gatsby Default Starter`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`,
        siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
    },
    plugins: [
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`,
            },
        },
        {
            resolve: `gatsby-plugin-react-redux`,
            options: {
                pathToCreateStoreModule: './src/Store',
                serialize: {
                    space: 0,
                    isJSON: true,
                    unsafe: false,
                    ignoreFunction: true,
                },
                cleanupOnClient: true,
                windowKey: '__PRELOADED_STATE__',
            },
        },
        'gatsby-plugin-postcss',
        'gatsby-plugin-react-helmet',
    ],
};
