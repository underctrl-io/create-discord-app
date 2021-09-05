
const config: ConfigType = {
    TOKEN: process.env.TOKEN || "",
    CLIENT_ID: ""
}

interface ConfigType {
    TOKEN: string,
    CLIENT_ID: string
}

export default config;