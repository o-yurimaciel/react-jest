import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpace } from './App'

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

test('checkbox disables button on first click and enables on second click', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRole('button', { name: 'Change to blue' })

  fireEvent.click(checkbox)
  expect(button).toBeDisabled()

  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
})

test('disabled button has gray bg and reverts to red', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRole('button', { name: 'Change to blue' })

  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ backgroundColor: 'gray' })
  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ backgroundColor: 'red' })
})

test('clicked disabled button has gray bg and reverts to blue', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRole('button', { name: 'Change to blue' })

  fireEvent.click(button)
  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ backgroundColor: 'gray' })
  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ backgroundColor: 'blue' })
})

describe('spaces before camel-case capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCamelWithSpace('Red')).toBe('Red')
  })
  test('works for one inner capital letter', () => {
    expect(replaceCamelWithSpace('MidnightBlue')).toBe('Midnight Blue')
  })
  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpace('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
