import { Option } from '@/MultiCheck/types';

export function groupOptionsByColumns(options: Option[], columns: number): Option[][] {
  // Apply constraints to keep the number of columns reasonable
  const idealColumns = Math.ceil(options.length / 2);

  const currentColumns = Math.min(idealColumns, Math.max(1, columns));

  const idealOptionsPerColumn = Math.floor(options.length / currentColumns);
  const extraOptions = options.length % currentColumns;

  if (currentColumns > options.length) {
    return options.map(option => [option]);
  }

  const groupedResult = Array.from({ length: currentColumns }) as Option[][];

  groupedResult.forEach((_, index) => {
    const optionsToTake = idealOptionsPerColumn + (index < extraOptions ? 1 : 0);

    groupedResult[index] = options.splice(0, optionsToTake);
  });

  return groupedResult;
}
