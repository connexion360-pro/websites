'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  model: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  model: '',
  message: ''
};

function validate(values: FormValues): FieldErrors {
  const nextErrors: FieldErrors = {};

  if (values.name.trim().length < 2) {
    nextErrors.name = 'Indiquez au moins 2 caractères.';
  }

  if (values.phone.trim().length < 8) {
    nextErrors.phone = 'Indiquez un numéro de téléphone joignable.';
  }

  if (!values.email.includes('@') || !values.email.includes('.')) {
    nextErrors.email = 'Indiquez une adresse e-mail valide.';
  }

  if (values.model.trim().length < 2) {
    nextErrors.model = 'Indiquez la marque ou le modèle si vous le connaissez.';
  }

  if (values.message.trim().length < 15) {
    nextErrors.message = 'Décrivez la panne en au moins 15 caractères.';
  }

  return nextErrors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState('Le formulaire est une maquette : aucune donnée ne sera envoyée.');

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as keyof FormValues;
    setValues((current) => ({ ...current, [field]: event.target.value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setStatus('Votre demande semble complète. Cette maquette ne transmet aucune donnée : contactez Bobrepar via les coordonnées affichées.');
      return;
    }

    setStatus('Veuillez corriger les champs signalés. Aucun message n’a été envoyé.');
  }

  return (
    <form className='contact-form' onSubmit={handleSubmit} noValidate>
      <p className='form-intro'>
        Remplissez les champs pour préparer votre demande. Le bouton vérifie uniquement les informations côté navigateur : aucune API, aucun e-mail et aucun service externe ne sont appelés.
      </p>

      <div className='form-field'>
        <label htmlFor='name'>Nom complet</label>
        <input
          id='name'
          name='name'
          type='text'
          autoComplete='name'
          value={values.name}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name ? <p id='name-error' className='field-error'>{errors.name}</p> : null}
      </div>

      <div className='form-field'>
        <label htmlFor='phone'>Téléphone</label>
        <input
          id='phone'
          name='phone'
          type='tel'
          autoComplete='tel'
          value={values.phone}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone ? <p id='phone-error' className='field-error'>{errors.phone}</p> : null}
      </div>

      <div className='form-field'>
        <label htmlFor='email'>E-mail</label>
        <input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          value={values.email}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email ? <p id='email-error' className='field-error'>{errors.email}</p> : null}
      </div>

      <div className='form-field'>
        <label htmlFor='model'>Modèle de trottinette</label>
        <input
          id='model'
          name='model'
          type='text'
          value={values.model}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.model)}
          aria-describedby={errors.model ? 'model-error' : undefined}
        />
        {errors.model ? <p id='model-error' className='field-error'>{errors.model}</p> : null}
      </div>

      <div className='form-field form-field-full'>
        <label htmlFor='message'>Message</label>
        <textarea
          id='message'
          name='message'
          rows={6}
          value={values.message}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message ? <p id='message-error' className='field-error'>{errors.message}</p> : null}
      </div>

      <button className='button button-primary form-button' type='submit'>
        Vérifier les champs - maquette non connectée
      </button>

      <p className='form-status' aria-live='polite'>{status}</p>
    </form>
  );
}
