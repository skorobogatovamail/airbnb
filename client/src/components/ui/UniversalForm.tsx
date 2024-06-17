import React from 'react';

type Inp = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
};

type UniversalFormProps = {
  inputs: Inp[];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  buttonText: string;
  withDownloads: boolean;
};

export default function UniversalForm({
  inputs,
  onSubmit,
  buttonText,
  withDownloads = false,
}: UniversalFormProps): JSX.Element {
  return (
    <form className="mx-auto max-w-md" onSubmit={onSubmit}>
      {inputs.map((inp) => (
        <input {...inp} />
      ))}
      {withDownloads && (
        <>
          <textarea placeholder="Description of the hotel " />
          <div className="flex gap-2">
            <input type="text" placeholder="Add photo via link" />
            <button type="button" className="bg-gray-200 rounded-2xl px-4 my-2">
              Add&nbsp;photo
            </button>
          </div>

          <button
            type="button"
            className=" flex justify-between items-center border my-2 py-4 px-10 rounded-2xl text-gray-400 bg-gray-100"
          >
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload from your device
          </button>
        </>
      )}
      <button type="submit" className="primary">
        {buttonText}
      </button>
    </form>
  );
}
