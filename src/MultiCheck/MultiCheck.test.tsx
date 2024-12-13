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

  describe('Select All rendering', () => {
    test('should render "Select All" option in the options list', () => {
      renderMultiCheck({ ...defaultProps });

      expect(screen.getByText(SelectAllOption.label)).toBeInTheDocument();
    });

    test('should have "Select All" unchecked by default when some options are not selected initially', () => {
      renderMultiCheck({ ...defaultProps, values: TEST_OPTIONS.slice(0, 2).map(option => option.value) });

      const selectAllInputElement: HTMLInputElement = screen.getByDisplayValue(SelectAllOption.value);

      expect(selectAllInputElement.checked).toBe(false);
    });

    test('should have "Select All" checked by default when all options are selected initially', () => {
      renderMultiCheck({ ...defaultProps, values: TEST_OPTIONS.map(option => option.value) });

      const selectAllInputElement: HTMLInputElement = screen.getByDisplayValue(SelectAllOption.value);

      expect(selectAllInputElement.checked).toBe(true);
    });
  });

  describe('Options interactions', () => {
    test('should select options when clicking on the label', () => {
      renderMultiCheck({ ...defaultProps });

      const targetOptions = TEST_OPTIONS;

      targetOptions.forEach(option => {
        const labelElement = screen.getByText(option.label);
        const inputElement: HTMLInputElement = screen.getByDisplayValue(option.value);

        fireEvent.click(labelElement);

        expect(inputElement.checked).toBe(true);
      });
    });

    test('should select options when clicking on the checkbox', () => {
      renderMultiCheck({ ...defaultProps });

      const targetOptions = TEST_OPTIONS; 

      targetOptions.forEach(option => {
        const inputElement: HTMLInputElement = screen.getByDisplayValue(option.value);

        fireEvent.click(inputElement);

        expect(inputElement.checked).toBe(true);
      });
    });

    test('should unselect options when clicking on the label', () => {
      const targetOptions = TEST_OPTIONS.slice(0, 2);

      renderMultiCheck({ ...defaultProps, values: targetOptions.map(option => option.value) });

      targetOptions.forEach(option => {
        const labelElement = screen.getByText(option.label);
        const inputElement: HTMLInputElement = screen.getByDisplayValue(option.value);

        fireEvent.click(labelElement);

        expect(inputElement.checked).toBe(false);
      });
    });

    test('should unselect options when clicking on the checkbox', () => {
      const targetOptions = TEST_OPTIONS.slice(0, 2);

      renderMultiCheck({ ...defaultProps, values: targetOptions.map(option => option.value) });

      targetOptions.forEach(option => {
        const inputElement: HTMLInputElement = screen.getByDisplayValue(option.value);

        fireEvent.click(inputElement);

        expect(inputElement.checked).toBe(false);
      });
    });
  });

  describe('Select All interactions', () => {
    test('should automatically check "Select All" checkbox when all options become selected', () => {
      renderMultiCheck({ ...defaultProps });

      const targetOptions = TEST_OPTIONS;

      targetOptions.forEach(option => {
        const inputElement = screen.getByDisplayValue(option.value);

        fireEvent.click(inputElement);
      });

      const selectAllInputElement: HTMLInputElement = screen.getByDisplayValue(SelectAllOption.value);

      expect(selectAllInputElement.checked).toBe(true);
    });

    test('should automatically uncheck "Select All" checkbox when any option becomes unselected', () => {
      const targetOptions = TEST_OPTIONS.slice(0, 2);

      renderMultiCheck({
        ...defaultProps,
        values: targetOptions.map(option => option.value)
      });

      targetOptions.forEach(option => {
        const inputElement = screen.getByDisplayValue(option.value);

        fireEvent.click(inputElement);
      });

      const selectAllInputElement: HTMLInputElement = screen.getByDisplayValue(SelectAllOption.value);

      expect(selectAllInputElement.checked).toBe(false);
    });

    test('should check all option checkboxes when clicking "Select All" checkbox', () => {
      const allOptions = TEST_OPTIONS;

      renderMultiCheck({ ...defaultProps });

      const selectAllInputElement: HTMLInputElement = screen.getByDisplayValue(SelectAllOption.value);

      fireEvent.click(selectAllInputElement);

      allOptions.forEach(option => {
        const inputElement: HTMLInputElement = screen.getByDisplayValue(option.value);

        expect(inputElement.checked).toBe(true);
      });
    });

    test('should uncheck all option checkboxes when clicking "Select All" checkbox', () => {
      const allOptions = TEST_OPTIONS;

      renderMultiCheck({ ...defaultProps, values: allOptions.map(option => option.value) });

      const selectAllInputElement: HTMLInputElement = screen.getByDisplayValue(SelectAllOption.value);

      fireEvent.click(selectAllInputElement);

      allOptions.forEach(option => {
        const inputElement: HTMLInputElement = screen.getByDisplayValue(option.value);

        expect(inputElement.checked).toBe(false);
      });
    });
  });

  describe('Component Usability', () => {
    test('should workable without values prop', () => {
      renderMultiCheck({ ...defaultProps });

      const targetOptions = TEST_OPTIONS.slice(0, 2);

      targetOptions.forEach(option => {
        const labelElement = screen.getByText(option.label);

        fireEvent.click(labelElement);

        expect(screen.getByDisplayValue(option.value)).toBeChecked();
      });
    });

    test('should call onChange callback when options are changed', () => {
      const onChange = jest.fn();

      renderMultiCheck({ ...defaultProps, onChange });

      const targetOptions = TEST_OPTIONS.slice(0, 2);

      targetOptions.forEach(option => {
        const labelElement = screen.getByText(option.label);

        fireEvent.click(labelElement);
      });

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledTimes(targetOptions.length);

      expect(onChange.mock.calls[0][0]).toEqual([targetOptions[0]]);
      expect(onChange.mock.calls[1][0]).toEqual(targetOptions);
    });
  });
});
