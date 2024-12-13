import React from 'react';
import { render, screen } from '@testing-library/react';
import { MultiCheck } from '@/MultiCheck';
import '@testing-library/jest-dom';

jest.mock('nanoid', () => ({
  nanoid: () => Math.random().toString(),
}));

const TEST_OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];

describe('MultiCheck', () => {
  test('renders the label if label provided', () => {
    render(<MultiCheck label="TestLabel" options={TEST_OPTIONS} />);
    expect(screen.getByText('TestLabel')).toBeInTheDocument();
  });
});
