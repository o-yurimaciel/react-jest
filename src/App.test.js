import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  render(<App />)
  const button = screen.getByRole('button', { name: 'Change to blue' })
  expect(button).toHaveStyle({ backgroundColor: 'red' })
})

test('button turns blue when clicked', () => {
  render(<App />)
  const button = screen.getByRole('button', { name: 'Change to blue' })
  fireEvent.click(button)
  expect(button).toHaveStyle({ backgroundColor: 'blue' })
  expect(button.textContent).toBe('Change to red')
})

test('initial conditions', () => {
  render(<App />)
  const button = screen.getByRole('button', { name: 'Change to blue' })
  expect(button).toBeEnabled()

  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('Checkbox disables button on first click and enables on second click', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRole('button', { name: 'Change to blue' })

  fireEvent.click(checkbox)
  expect(button).toBeDisabled()

  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
})

test('Disabled button turns gray', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRole('button', { name: 'Change to blue' })

  fireEvent.click(checkbox)
  expect(button).toBeDisabled()
  expect(button).toHaveStyle({ backgroundColor: 'gray' })
})
