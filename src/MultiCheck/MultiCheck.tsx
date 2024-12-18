import type { FC } from 'react';

import React from 'react';

import { DefaultColumn } from '@/MultiCheck/constants/initial';
import { RootContextProvider } from '@/MultiCheck/sub-components/RootContextProvider';
import { Option } from '@/MultiCheck/types';

import { OptionsList } from '@/MultiCheck/sub-components/OptionsList';

import './MultiCheck.css';

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. All the options (including the "Select All") should be split into several columns, and the order is from top to bottom in each column
 */
type Props = {
  // the label text of the whole component
  label?: string,
  // Assume no duplicated labels or values
  // It may contain any values, so be careful for you "Select All" option
  options: Option[],
  // Always be non-negative integer.
  // The default value is 1
  // 0 is considered as 1
  // We only check [0, 1, 2, ... 10], but it should work for greater number
  columns?: number,
  // Which options should be selected.
  // - If `undefined`, makes the component in uncontrolled mode with no default options checked, but the component is still workable;
  // - if not undefined, it's considered as the default value to render the component. And when it changes, it will be considered as the NEW default value to render the component again
  // - Assume no duplicated values.
  // - It may contain values not in the options.
  values?: string[]
  // if not undefined, when checked options are changed, they should be passed to outside
  // if undefined, the options can still be selected, but won't notify the outside
  onChange?: (options: Option[]) => void,
}

export const MultiCheck: FC<Props> = ({
  label,
  options,
  values,
  columns = DefaultColumn,
  onChange
}) => {
  return (
    <RootContextProvider
      defaultValues={values}
      options={options}
      columns={columns}
      onCheckedOptionsChange={onChange}
    >
      <div className='MultiCheck'>
        <h3 className='title'>{label}</h3>
        <div className='content'>
          <OptionsList />
        </div>
      </div>
    </RootContextProvider>
  )
}
