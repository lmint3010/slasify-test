import { nanoid } from 'nanoid';
import type { FC } from 'react';
import React from 'react';

export type MultiCheckOptionProps = {
  label: string;
  value: string;
};

export const MultiCheckOption: FC<MultiCheckOptionProps> = ({ label, value }) => {
  const uid = nanoid();

  return (
    <div className="MultiCheckOption">
      <input value={value} type="checkbox" id={uid} />
      <label htmlFor={uid}>{label}</label>
    </div>
  );
};
