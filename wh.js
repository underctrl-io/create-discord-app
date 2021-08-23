import { prompts } from "./src/prompts.js";

const languages = Object.fromEntries(prompts.language.choices.map(x => [ x.value, x.name ]));
const libraries = Object.fromEntries(prompts.lib.choices.map(x => [ x.value, x.name ]));

console.log(languages);

console.log(libraries);