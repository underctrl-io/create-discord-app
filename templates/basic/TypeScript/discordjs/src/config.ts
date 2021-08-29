
const config: ConfigType = {
    TOKEN: process.env.TOKEN,
    PREFIX: "!"
}

interface ConfigType {
    TOKEN: string,
    PREFIX: string
}

export default config;