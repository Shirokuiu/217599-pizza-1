export const BtnActions = {
  Cancel: "cancel",
  Delete: "delete",
  Save: "save",
};

export const btns = [
  {
    id: 1,
    actionType: BtnActions.Cancel,
    name: "Отменить",
    isForward: false,
  },
  {
    id: 2,
    actionType: BtnActions.Delete,
    name: "Удалить",
    isForward: false,
  },
  {
    id: 3,
    actionType: BtnActions.Save,
    name: "Сохранить",
    isForward: true,
  },
];
