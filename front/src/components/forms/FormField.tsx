'use client';

import React from 'react';

type FormikLike = {
  values: Record<string, any>;
  touched: Record<string, any>;
  errors: Record<string, any>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
};

type Props = {
  id: string;
  name: string;                 // key en formik.values
  label: string;
  type?: string;
  formik: FormikLike;
  /** Reserva 1 o 2 líneas para el error (evita “saltos”) */
  errorLines?: 1 | 2;
};

export default function FormField({
  id,
  name,
  label,
  type = 'text',
  formik,
  errorLines = 1,
}: Props) {
  const touched = formik.touched?.[name];
  const error = formik.errors?.[name] as string | undefined;
  const hasError = Boolean(touched && error);
  const reserve = errorLines === 2 ? 'min-h-[2.5rem]' : 'min-h-[1.25rem]';

  return (
    <div className="mb-4">
      <label htmlFor={id} className="label text-center">{label}</label>

      <input
        id={id}
        name={name}
        type={type}
        className={`input ${hasError ? 'input-error' : ''}`}
        value={formik.values?.[name] ?? ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        aria-describedby={`${id}-error`}
        aria-invalid={hasError}
      />

      {/* Reserva fija para el error (si no hay, mantiene el alto) */}
      <div id={`${id}-error`} aria-live="polite" className={`mt-1 ${reserve}`}>
        {hasError && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
