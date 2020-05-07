export type Nullable<T> = T | null;

export const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9) + '_' + new Date().getTime().toString();
};
export const noop = (..._params: any) => {
    //
};

export const transformCollection = (
    collection: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
    return collection.docs.reduce((agg, curr) => {
        const currentDocument = curr.data();
        return Object.assign(agg, currentDocument);
    }, {});
};
