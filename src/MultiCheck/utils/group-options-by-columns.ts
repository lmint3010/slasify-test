import { Option } from '@/MultiCheck/types';

export function groupOptionsByColumns(options: Option[], columns: number): Option[][] {
  // Apply constraints to keep the number of columns reasonable
  const idealColumns = Math.ceil(options.length / 2);

  const expectedColumns = Math.min(idealColumns, Math.max(1, columns));

  // Calculate the number of options per column
  const idealOptionsPerColumn = Math.floor(options.length / expectedColumns);
  const extraOptions = options.length % expectedColumns;

  const groupedResult = Array.from({ length: expectedColumns }) as Option[][];

  // Distribute options to each column
  groupedResult.forEach((_, index) => {
    const optionsToTake = idealOptionsPerColumn + (index < extraOptions ? 1 : 0);

    groupedResult[index] = options.splice(0, optionsToTake);
  });

  return groupedResult;
}
