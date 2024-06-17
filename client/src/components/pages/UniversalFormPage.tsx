import React from 'react';
import { Link } from 'react-router-dom';

type UniversalFormPageType = {
  pageTitle: string;
  secondaryPageHeader?: string;
  secondaryPageLink?: string;
  secondaryPageLinkText?: string;
  form: JSX.Element;
};

export default function UniversalFormPage({
  pageTitle,
  secondaryPageHeader = '',
  secondaryPageLink = '',
  secondaryPageLinkText = '',
  form,
}: UniversalFormPageType): JSX.Element {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">{pageTitle}</h1>
        {form}
        <div className="text-center text-gray-500">
          {secondaryPageHeader}
          <Link className="underline text-black" to={secondaryPageLink}>
            {secondaryPageLinkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
