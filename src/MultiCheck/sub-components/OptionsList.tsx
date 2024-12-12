import type { ChangeEvent, FC } from 'react';

import React from 'react';
import { nanoid } from 'nanoid';

import { useMultiCheck } from '@/MultiCheck/sub-components/RootContext';
import { Option } from '@/MultiCheck/sub-components/Option';

import './OptionsList.css';

export type MultiCheckOptionsListProps = {};

export const OptionsList: FC<MultiCheckOptionsListProps> = () => {
  const { 
    state: { groupedOptions, checkedValues },
    dispatch,
  } = useMultiCheck();

  const handleOptionChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = target;
    
    dispatch({
      type: 'UPDATE_OPTION',
      payload: { value, checked }
    });
  };

  return (
    <div className="OptionsList">
      {groupedOptions.map((options) => (
        <div key={nanoid()} className="column">
          {options.map(({ label, value }) => (
            <Option
              key={nanoid()}
              label={label}
              value={value}
              checked={checkedValues.includes(value)}
              onChange={handleOptionChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
