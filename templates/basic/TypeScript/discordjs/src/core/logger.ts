const time = () => {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

const log = (prefix: string, message: string) => {
    console.log(`${prefix} \x1b[36m${time()}\x1b[0m`, message);
};

export const info = (message: unknown) => {
    log('\x1b[32mINFO\x1b[0m', message as string);
};

export const error = (message: unknown) => {
    log('\x1b[1;31mERROR\x1b[0m', message as string);
};

export const debug = (message: unknown) => {
    log('\x1b[33mDEBUG\x1b[0m', message as string);
};

export default { info, debug, error };
