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
  });
});
