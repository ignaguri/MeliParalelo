let config = {
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
        loaders: [
        {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
        ]
    }
}
module.exports = config;