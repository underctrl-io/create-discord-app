module.exports = {
    dir: {
        name: "ok",
        type: "confirm",
        message: "Are you sure you want to generate discord bot project?"
    },
    type: {
        name: "type",
        type: "list",
        message: "Select project structure type:",
        choices: [
            { name: "Basic", value: "basic" },
            { name: "Class", value: "class" }
        ]
    },
    language: {
        name: "language",
        type: "list",
        message: "Select your language:",
        choices: [
            { name: "JavaScript", value: "javascript" },
            { name: "TypeScript", value: "typescript" }
        ]
    },
    token: {
        name: "token",
        type: "password",
        message: "Enter your bot token:"
    }
};