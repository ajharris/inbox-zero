import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginButton from './LoginButton';

global.fetch = jest.fn();

describe('LoginButton Component', () => {
    let alertMock;

    beforeAll(() => {
        alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterAll(() => {
        alertMock.mockRestore();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays success message on successful login', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            headers: { get: () => 'application/json' },
            json: async () => ({ message: 'Login successful.' })
        });

        render(<LoginButton />);

        await act(async () => {
            fireEvent.click(screen.getByText('Login to Gmail'));
        });

        expect(alertMock).toHaveBeenCalledWith('Login successful.');
    });

    test('displays error message on failed login', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
            headers: { get: () => 'application/json' },
            json: async () => ({ error: 'Authentication failed' })
        });

        render(<LoginButton />);

        await act(async () => {
            fireEvent.click(screen.getByText('Login to Gmail'));
        });

        expect(alertMock).toHaveBeenCalledWith('Login failed: HTTP error! status: 401');
    });

    test('handles unexpected response format', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            headers: { get: () => 'text/html' },
            text: async () => '<!DOCTYPE html>'
        });

        render(<LoginButton />);

        await act(async () => {
            fireEvent.click(screen.getByText('Login to Gmail'));
        });

        expect(alertMock).toHaveBeenCalledWith('Login failed: Expected JSON response but received something else.');
    });

    test('displays error message when response is not JSON', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            headers: { get: () => 'text/html' },
            text: async () => '<!DOCTYPE html>'
        });

        render(<LoginButton />);

        await act(async () => {
            fireEvent.click(screen.getByText('Login to Gmail'));
        });

        expect(alertMock).toHaveBeenCalledWith('Login failed: Expected JSON response but received something else.');
    });
});