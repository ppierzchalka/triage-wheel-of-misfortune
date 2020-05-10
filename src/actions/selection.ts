export enum SelectionType {
    Members = 'Members',
    Teams = 'Teams',
}

export type Selection = {
    selection: string[];
    selectionType: SelectionType;
};

export enum SelectionActionType {
    ReceiveSelection = 'ReceiveSelection',
    ChangeSelectionType = 'ChangeSelectionType',
}

export type ReceiveSelectionAction = {
    type: SelectionActionType.ReceiveSelection;
    payload: string[];
};

export type ChangeSelectionAction = {
    type: SelectionActionType.ChangeSelectionType;
    payload: SelectionType;
};

export type SelectionActions = ReceiveSelectionAction | ChangeSelectionAction;

export const receiveSelection = (selection: string[]): ReceiveSelectionAction => ({
    type: SelectionActionType.ReceiveSelection,
    payload: selection,
});
export const changeSelectionType = (type: SelectionType): ChangeSelectionAction => ({
    type: SelectionActionType.ChangeSelectionType,
    payload: type,
});
