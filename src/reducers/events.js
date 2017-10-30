const initialState = {
    addModal: false,
    dropModal: false,
    checked_all: false,
    disabled_drop: true,
    cities: [
        'Нижний Новгород',
        'Саров',
        'Иваново',
        'Москва',
        'Заволжье'
    ],
    events: [
        {
            id: 0,
            name: 'Мероприятие_1',
            date: '28.08.2017',
            location: 'Нижний Новгород',
            status: false
        },
        {
            id: 1,
            name: 'Мероприятие_2',
            date: '13.09.2017',
            location: 'Саров',
            status: false
        },
        {
            id: 2,
            name: 'Мероприятие_3',
            date: '03.10.2017',
            location: 'Арзамас',
            status: false
        },
    ]
};

export default function listEvents(state = initialState, action) {
    if (action.type === 'ADD_EVENT') {
        state.events = [...state.events, action.data];
        return state;
    }
    if (action.type === 'DROP_EVENT') {
        state.dropModal = !state.dropModal;
        state.checked_all = false;
        var i = 0;
        while (i < state.events.length) {
            if (state.events[i].status === true) {
                state.events.splice(i, 1);
                i--;
            }
            i++;
        }
        seachChecked() === true ? state.disabled_drop = false : state.disabled_drop = true;
        return state;
    }
    if (action.type === 'EDIT_STATUS') {
        for (var key in state.events) {
            if (state.events[key].name === action.data.value) {
                state.events[key].status = !state.events[key].status;
            }
        }
        seachChecked() === true ? state.disabled_drop = false : state.disabled_drop = true;
        return state;
    }
    if (action.type === 'ADD_MODAL') {
        state.addModal = !state.addModal;
        return state;
    }
    if (action.type === 'DROP_MODAL') {
        state.dropModal = !state.dropModal;
        return state;
    }
    if (action.type === 'CHECKED_ALL') {
        if (action.data) {
            state.checked_all = true;
            for (key in state.events) {
                state.events[key].status = true;
            }
        }
        else {
            state.checked_all = false;
            for (key in state.events) {
                state.events[key].status = false;
            }
        }
        seachChecked() === true ? state.disabled_drop = false : state.disabled_drop = true;
        return state;
    }
    function seachChecked() {
        for (var key in state.events) {
            if (state.events[key].status === true) {
                state.disabled_drop = false;
                return true;
            }
        }
        return false;
    }
    return state;
}