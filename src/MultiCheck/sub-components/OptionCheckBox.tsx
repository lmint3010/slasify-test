import type { FC } from 'react';

import { nanoid } from 'nanoid';
import React, { useId } from 'react';

import './OptionCheckBox.css';

export type OptionCheckBoxProps = {
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const OptionCheckBox: FC<OptionCheckBoxProps> = ({ label, value, ...inputProps }) => {
  const uid = useId();

  return (
    <div className="OptionCheckBox">
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
