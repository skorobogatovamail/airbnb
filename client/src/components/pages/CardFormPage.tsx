import React from 'react';
import CardForm from '../ui/CardForm';
import UniversalFormPage from './UniversalFormPage';

export default function CardFormPage(): JSX.Element {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <UniversalFormPage pageTitle="Add new hotel" form={<CardForm />} />
    </div>
  );
}
