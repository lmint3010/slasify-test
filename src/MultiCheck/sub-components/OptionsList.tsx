import type { FC } from 'react';

import React from 'react';
import { nanoid } from 'nanoid';

import { useMultiCheck } from '@/MultiCheck/sub-components/RootContext';
import { Option } from '@/MultiCheck/sub-components/Option';

import './OptionsList.css';

export type MultiCheckOptionsListProps = {};

export const OptionsList: FC<MultiCheckOptionsListProps> = () => {
  const { state } = useMultiCheck();

  return (
    <div className="OptionsList">
      {state.groupedOptions.map((options) => (
        <div key={nanoid()} className="column">
          {options.map(({ label, value }) => (
            <Option
              key={nanoid()}
              label={label}
              value={value}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
