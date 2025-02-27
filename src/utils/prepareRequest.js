export const prepareRequest = (ids, startIndex, endIndex) => {
    if (!Array.isArray(ids)) {
        return { ids: [] };
    }

    const paginatedIds = ids.slice(startIndex, endIndex);
    return { ids: paginatedIds };
};