import { dialog } from 'electron';

export const dialogService: IDialogService = {
  showOpenDialog(options) {
    return dialog.showOpenDialog({ ...options });
  },
};
