import { MultiCheck } from '@/MultiCheck';
import { SelectAllOption } from '@/MultiCheck/constants/initial';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { ComponentProps } from 'react';

jest.mock('nanoid', () => ({
  nanoid: () => Math.random().toString(),
}));

const TEST_OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
  { label: 'Option 7', value: '7' },
  { label: 'Option 8', value: '8' },
  { label: 'Option 9', value: '9' },
];

function renderMultiCheck(props: ComponentProps<typeof MultiCheck>) {
  return render(<MultiCheck {...props} />);
}

describe('MultiCheck', () => {
  const defaultProps = { options: TEST_OPTIONS };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('Label rendering', () => {
    test('should display label text when label prop is provided', () => {
      renderMultiCheck({ ...defaultProps, label: 'TestLabel' });

    expect(screen.getByText('TestLabel')).toBeInTheDocument();
    });

    test('should not display any label when label prop is not provided', () => {
      renderMultiCheck({ ...defaultProps });

      expect(screen.queryByText('TestLabel')).not.toBeInTheDocument();
    });
  });

  describe('Options rendering', () => {
    test('should render all provided options in the document', () => {
      renderMultiCheck({ ...defaultProps, options: TEST_OPTIONS });

      TEST_OPTIONS.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    test('should display options in a single column when columns prop is omitted', () => {
      renderMultiCheck({ ...defaultProps });

      expect(screen.getAllByTestId('options-column')).toHaveLength(1);
    });
    
    test('should display options in a single column when columns prop is 0', () => {
      renderMultiCheck({ ...defaultProps, columns: 0 });

      expect(screen.getAllByTestId('options-column')).toHaveLength(1);
    });

    test('should limit number of columns when columns prop exceeds options length', () => {
      renderMultiCheck({ ...defaultProps, columns: TEST_OPTIONS.length + 1 });

      const renderedColumnsCount = screen.getAllByTestId('options-column').length;
      expect(renderedColumnsCount).toBeLessThan(TEST_OPTIONS.length);
    });

    test('should display options in a single column when columns prop is 1', () => {
      renderMultiCheck({ ...defaultProps, columns: 1 });

      const renderedColumnsCount = screen.getAllByTestId('options-column').length;
      expect(renderedColumnsCount).toBe(1);
    });

    test('should split options into 2 columns when columns prop is 2', () => {
      renderMultiCheck({ ...defaultProps, columns: 2 });

      const renderedColumnsCount = screen.getAllByTestId('options-column').length;
      expect(renderedColumnsCount).toBe(2);
    });

    test('should split options into 3 columns when columns prop is 3', () => {
      renderMultiCheck({ ...defaultProps, columns: 3 });

      const renderedColumnsCount = screen.getAllByTestId('options-column').length;
      expect(renderedColumnsCount).toBe(3);
    });

    test('should initialize checked options with values prop passed', () => {
      const targetOptions = TEST_OPTIONS.slice(0, 2);

      renderMultiCheck({
        ...defaultProps,
        values: targetOptions.map(option => option.value)
      });

      targetOptions.forEach(option => {
        const inputElement: HTMLInputElement = screen.getByDisplayValue(option.value);

        expect(inputElement.checked).toBe(true);
      });
    });
  });

  });
});
