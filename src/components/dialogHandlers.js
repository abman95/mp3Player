import { elements } from './elements.js';

export function showFileListDialog() {
  elements.fileListDialog.showModal();
}

export function closeFileListDialog() {
  elements.fileListDialog.classList.add("closed");
  setTimeout(() => {
    elements.fileListDialog.close();
    elements.fileListDialog.classList.remove("closed");
  }, 300);
}

export function handleClickOutsideFileListDialog(event) {
  const { left, right, top, bottom } = elements.fileListDialog.getBoundingClientRect();
  const { clientX, clientY } = event;

  if (clientX < left || clientX >= right || clientY < top || clientY >= bottom) {
    closeFileListDialog();
  }
}