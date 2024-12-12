import type { FC } from 'react';

import React from 'react';
import { nanoid } from 'nanoid';

import { useMultiCheck } from '@/MultiCheck/sub-components/MultiCheckContext';

import './MultiCheckColumns.css';

export type MultiCheckColumnsProps = {};

export const MultiCheckColumns: FC<MultiCheckColumnsProps> = () => {
  const { state } = useMultiCheck();

  return (
    <div className="MultiCheckColumns">
      {state.groupedOptions.map((group) => (
        <div key={nanoid()} className="column">
          {group.map(option => (
            <div key={nanoid()} className="option">
              {option.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
