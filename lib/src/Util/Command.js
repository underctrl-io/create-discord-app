class Command {
    constructor(client, { name = null,
        description = "No description provided.",
        category = "Other",
        usage = ["No usage provided."],
        aliases = new Array()
    }
    ) {
        this.client = client;
        this.help = { name, description, category, usage, aliases };
    }
}
module.exports = Command;