import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import {
  uploadPhotoByLinkThunk,
  uploadPhotoThunk,
} from '../../redux/slices/entriesFirebase/entriesFirebaseThunks';
import type { UploadPhotoLinkType } from '../../types/entriesTypes';

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
  withDownloads?: boolean;
};

export default function UniversalForm({
  inputs,
  onSubmit,
  buttonText,
  withDownloads = false,
}: UniversalFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [link, setLink] = useState<UploadPhotoLinkType['link']>('');
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);

  const uploadPhotoByLink = (photoLink: UploadPhotoLinkType['link']): void => {
    void dispatch(uploadPhotoByLinkThunk({ link: photoLink }));
    setAddedPhotos((prev) => [...prev, link]);
  };

  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    console.log(files[0]);
    void dispatch(uploadPhotoThunk({ photo: files[0] }));
    // setAddedPhotos((prev) => [...prev, files[0].name]);
  };

  return (
    <form className="mx-auto max-w-md" onSubmit={onSubmit}>
      {inputs.map((inp) => (
        <input {...inp} />
      ))}
      {withDownloads && (
        <>
          <textarea placeholder="Description of the hotel " />
          <div className="flex gap-4">
            {addedPhotos.length > 0 &&
              addedPhotos.map((el) => (
                <div className="relative ">
                  <img className="w-56 rounded-2xl" src={el} alt="uploaded" />
                  <button
                    className="absolute top-2 right-2 text-xl bg-white rounded-2xl w-8 h-8 "
                    type="button"
                    onClick={() => setAddedPhotos((prev) => prev.filter((x) => x !== el))}
                  >
                    x
                  </button>
                </div>
              ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add photo via link"
              name="link"
              onChange={(e) => setLink(e.target.value)}
            />

            <button
              onClick={() => uploadPhotoByLink(link)}
              type="button"
              className="bg-gray-200 rounded-2xl px-4 my-2"
            >
              Add&nbsp;photo
            </button>
          </div>

          <label
            htmlFor="file"
            className="cursor-pointer flex justify-between items-center border my-2 py-4 px-10 rounded-2xl text-gray-400 bg-gray-100"
          >
            <input type="file" className="hidden" id="file" onChange={uploadPhoto} />{' '}
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
          </label>
        </>
      )}
      <button type="submit" className="primary">
        {buttonText}
      </button>
    </form>
  );
}
