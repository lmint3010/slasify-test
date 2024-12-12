import type { FC } from 'react';

import { nanoid } from 'nanoid';
import React from 'react';

import './Option.css';

export type OptionProps = {
  label: string;
  value: string;
};

export const Option: FC<OptionProps> = ({ label, value }) => {
  const uid = nanoid();

  return (
    <div className="Option">
      <input value={value} id={uid} type="checkbox" />
      <label htmlFor={uid}>{label}</label>
    </div>
  );
};
