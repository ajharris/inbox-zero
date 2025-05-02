import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailList from './EmailList';

global.fetch = jest.fn();

describe('EmailList Component', () => {
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

    test('displays loading state initially', () => {
        render(<EmailList />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders email list after fetching data', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            headers: { get: () => 'application/json' },
            json: async () => ([
                { id: '1', subject: 'Test Email 1', snippet: 'This is a test email.' },
                { id: '2', subject: 'Test Email 2', snippet: 'This is another test email.' }
            ])
        });

        await act(async () => {
            render(<EmailList />);
        });

        expect(screen.getByText('Test Email 1')).toBeInTheDocument();
        expect(screen.getByText('Test Email 2')).toBeInTheDocument();
    });

    test('displays error message on fetch failure', async () => {
        fetch.mockRejectedValueOnce(new Error('Network request failed'));

        await act(async () => {
            render(<EmailList />);
        });

        expect(alertMock).toHaveBeenCalledWith('Failed to fetch emails: Network request failed');
    });
});