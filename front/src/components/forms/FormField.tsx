'use client';

import React from 'react';

import { FormikProps } from 'formik'; 

type FormikLike<T> = FormikProps<T>; 


type Props<T extends Record<string, unknown>> = {
  id: string;
  name: keyof T; 
  label: string;
  type?: string;
  formik: FormikLike<T>;
  errorLines?: 1 | 2;
};


export default function FormField<T extends Record<string, unknown>>({

  id,
  name,
  label,
  type = 'text',
  formik,
  errorLines = 1,
}: Props<T>) {

  const touched = formik.touched?.[name];
   const error = formik.errors?.[name] as string | undefined;  
  const hasError = Boolean(touched && error);
  const reserve = errorLines === 2 ? 'min-h-[2.5rem]' : 'min-h-[1.25rem]';

  return (
    <div className="mb-4">
      <label htmlFor={id} className="label text-center">{label}</label>

      <input
        id={id}
        name={name as string} 
        type={type}
        className={`input ${hasError ? 'input-error' : ''}`}
        value={(formik.values?.[name] ?? '').toString()} 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        aria-describedby={`${id}-error`}
        aria-invalid={hasError}
      />
      <div id={`${id}-error`} aria-live="polite" className={`mt-1 ${reserve}`}>
                {hasError && error && <p className="text-sm text-red-500">{error}</p>}
            </div>
    </div>
  );
}