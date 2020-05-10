import {
    Selection,
    SelectionActions,
    SelectionActionType,
    SelectionType,
} from '../actions/selection';

const initialSelectionState: Selection = {
    selection: [],
    selectionType: SelectionType.Teams,
};

export const selection = (state = initialSelectionState, action: SelectionActions): Selection => {
    switch (action.type) {
        case SelectionActionType.ReceiveSelection: {
            return {
                ...state,
                selection: action.payload,
            };
        }
        case SelectionActionType.ChangeSelectionType: {
            return {
                selectionType: action.payload,
                selection: [],
            };
        }
        default:
            return state;
    }
};
