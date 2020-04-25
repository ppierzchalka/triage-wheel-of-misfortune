export const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9) + '_' + new Date().getTime().toString();
};

export const emailRegexp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

export const noop = (..._params: any) => {
    //
}
