import { Option } from '@/MultiCheck/types';

export function groupOptionsByColumns(options: Option[], columns: number): Option[][] {
  const idealOptionsPerColumn = Math.floor(options.length / columns);

  const extraOptions = options.length % columns;

  if (columns > options.length) {
    return options.map(option => [option]);
  }

  const groupedResult = Array.from({ length: columns }) as Option[][];

  groupedResult.forEach((_, index) => {
    const optionsToTake = idealOptionsPerColumn + (index < extraOptions ? 1 : 0);

    groupedResult[index] = options.splice(0, optionsToTake);
  });

  return groupedResult;
}
