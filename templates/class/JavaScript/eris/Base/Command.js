class Command {

    constructor(client, ops = {}) {
        this.client = client;
        this._patch(ops);
    }

    _patch(ops = {}) {
        this.help = {
            name: ops.name || null,
            description: ops.description || "No description provided!",
            aliases: ops.aliases || [],
            category: "Others"
        };

        this.name = this.help.name;
    }

}

module.exports = Command;