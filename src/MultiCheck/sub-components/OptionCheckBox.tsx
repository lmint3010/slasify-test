import type { FC } from 'react';

import { nanoid } from 'nanoid';
import React from 'react';

import './Option.css';

export type OptionCheckBoxProps = {
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const OptionCheckBox: FC<OptionCheckBoxProps> = ({ label, value, ...inputProps }) => {
  const uid = nanoid();

  return (
    <div className="Option">
      <input
        id={uid}
        type="checkbox"
        value={value}
        {...inputProps}
      />
      <label htmlFor={uid}>{label}</label>
    </div>
  );
};
