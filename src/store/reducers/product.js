export default (
    state = { page: 1, list: [], total: 0, per: 3 },
    action
) => {
    switch (action.type) {
        case 'GETLIST':
            return {
                page: action.data.page,
                list: action.data.products,
                total: action.data.totalCount,
                per: action.data.per
            }
        default:
            return state;
    }
}