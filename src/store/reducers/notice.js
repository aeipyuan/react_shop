export default (state = { isAllRead: false }, action) => {
    switch (action.type) {
        case 'AllREAD':
            return { ...state, isAllRead: true };
        default:
            return state;
    }
}