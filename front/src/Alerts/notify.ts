// src/Alerts/notify.ts
'use client';
import Swal, { SweetAlertIcon } from 'sweetalert2';

const base = Swal.mixin({
  customClass: {
    popup: 'swal-popup',
    title: 'swal-title',
    htmlContainer: 'swal-text',
    confirmButton: 'swal-btn swal-btn--confirm',
    cancelButton: 'swal-btn swal-btn--cancel',
  },
  buttonsStyling: false,
  showConfirmButton: true,
  confirmButtonText: 'OK',
  allowOutsideClick: true,
  allowEscapeKey: true,
  reverseButtons: true,
  timerProgressBar: false,
});

/** Toast preconfigurado (esquina sup. derecha) */
const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  customClass: {
    popup: 'swal2-toast',
  },
});

/* ===== API compatible con tu código ===== */
export function notifySuccess(msg: string, title = 'Listo') {
  return base.fire({ icon: 'success', title, text: msg });
}
export function notifyError(msg: string, title = 'Ups...') {
  return base.fire({ icon: 'error', title, text: msg });
}
export function notifyInfo(msg: string, title = 'Info') {
  return base.fire({ icon: 'info', title, text: msg });
}
export function notifyWarning(msg: string, title = 'Atención') {
  return base.fire({ icon: 'warning', title, text: msg });
}

/** Toasts rápidos */
export function toastSuccess(msg: string) {
  return toast.fire({ icon: 'success', title: msg });
}
export function toastError(msg: string) {
  return toast.fire({ icon: 'error', title: msg });
}

/** Confirm genérico (devuelve true/false) */
export async function confirmDialog(
  message = '¿Estás seguro?',
  title = 'Confirmar',
  confirmText = 'Sí',
  cancelText = 'Cancelar'
) {
  const r = await base.fire({
    icon: 'question',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
  return r.isConfirmed;
}
