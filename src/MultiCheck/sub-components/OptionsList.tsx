import type { ChangeEvent, FC } from 'react';

import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';

import { SelectAllOption } from '@/MultiCheck/constants/initial';
import { OptionCheckBox } from '@/MultiCheck/sub-components/OptionCheckBox';
import { useMultiCheck } from '@/MultiCheck/sub-components/RootContextProvider';

import './OptionsList.css';

export type MultiCheckOptionsListProps = {};

export const OptionsList: FC<MultiCheckOptionsListProps> = () => {
  const { 
    state: { groupedOptions, checkedValues, originalOptions, onChangeCallback },
    dispatch,
  } = useMultiCheck();

  const [hasInteracted, setHasInteracted] = useState(false);

  const handleToggleOption = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = target;

    dispatch({
      type: 'TOGGLE_OPTION',
      payload: { value, checked }
    });

    setHasInteracted(true);
  };

  const handleToggleSelectAll = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { checked } = target;

    dispatch({
      type: 'TOGGLE_SELECT_ALL',
      payload: { checked }
    });

    setHasInteracted(true);
  };

  useEffect(() => {
    if (hasInteracted && onChangeCallback) {
      const optionsWithSelectAll = [SelectAllOption, ...originalOptions];

      const checkedOptions = optionsWithSelectAll.filter(
        option => checkedValues.includes(option.value)
      );

      onChangeCallback(checkedOptions);
    }
  }, [checkedValues, hasInteracted]);

  return (
    <div className="OptionsList">
      {groupedOptions.map((options) => (
        <div key={nanoid()} className="column" data-testid="options-column">
          {options.map(({ label, value }) => (
            <OptionCheckBox
              key={nanoid()}
              label={label}
              value={value}
              checked={checkedValues.includes(value)}
              onChange={value === SelectAllOption.value
                ? handleToggleSelectAll
                : handleToggleOption
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
