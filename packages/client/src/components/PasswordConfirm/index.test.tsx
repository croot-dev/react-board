import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import PasswordConfirm from './index';
import 'isomorphic-fetch';

window.alert = jest.fn();

describe('PasswordConfirm Component', () => {
  it('renders the component with default state', () => {
    const onChange = jest.fn();
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    const { container } = render(
      <PasswordConfirm onChange={onChange} onConfirm={onConfirm} onClose={onClose} />,
    );

    const titleElement = screen.getByText('Please Input Password');
    const inputElement = container.querySelector('input');
    const closeButton = screen.getByText('Close');
    const confirmButton = screen.getByText('Confirm');

    expect(titleElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
    expect(closeButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  });

  it('handles input change', () => {
    const onChange = jest.fn();
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    const { container } = render(
      <PasswordConfirm onChange={onChange} onConfirm={onConfirm} onClose={onClose} />,
    );

    const inputElement = container.querySelector('[name=password_confirm]');

    fireEvent.change(inputElement, { target: { value: 'newpassword' } });

    expect(inputElement).toHaveValue('newpassword');
    expect(onChange).toHaveBeenCalledWith('newpassword');
  });

  it('validates password input', () => {
    const onChange = jest.fn();
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    render(
      <PasswordConfirm onChange={onChange} onConfirm={onConfirm} onClose={onClose} />,
    );

    const confirmButton = screen.getByText('Confirm');
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.click(confirmButton);

    expect(alertSpy).toHaveBeenCalledWith('비밀번호를 입력해주세요.');

    alertSpy.mockRestore();
  });

  it('handles confirm button click', () => {
    const onChange = jest.fn();
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    const { container } = render(
      <PasswordConfirm onChange={onChange} onConfirm={onConfirm} onClose={onClose} />,
    );

    const inputElement = container.querySelector('input');
    const confirmButton = screen.getByText('Confirm');

    fireEvent.change(inputElement, { target: { value: 'newpassword' } });
    fireEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledWith('newpassword', expect.any(Object));
  });

  it('handles close button click', () => {
    const onChange = jest.fn();
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    render(
      <PasswordConfirm onChange={onChange} onConfirm={onConfirm} onClose={onClose} />,
    );

    const closeButton = screen.getByText('Close');

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
