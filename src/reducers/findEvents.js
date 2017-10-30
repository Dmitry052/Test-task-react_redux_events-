const initialState = '';

export default function fintEvents(state = initialState, action) {
    if (action.type === 'FIND_EVENT') {
        state = action.data;
    }
    return state;
}