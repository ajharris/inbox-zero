import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
    test('renders the main heading', () => {
        render(<App />);

        expect(screen.getByText('Gmail Inbox Manager')).toBeInTheDocument();
    });

    test('renders the LoginButton component', () => {
        render(<App />);

        expect(screen.getByText('Login to Gmail')).toBeInTheDocument();
    });

    test('renders the Controls component', () => {
        render(<App />);

        expect(screen.getByText('Mark All as Read')).toBeInTheDocument();
    });

    test('renders the EmailList component', async () => {
        render(<App />);

        await waitFor(() => expect(screen.getByText('Email List')).toBeInTheDocument());
    });
});