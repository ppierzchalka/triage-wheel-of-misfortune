export const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9) + '_' + new Date().getTime().toString();
};
export const noop = (..._params: any) => {
    //
}
