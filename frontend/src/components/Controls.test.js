import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Controls from './Controls';

describe('Controls Component', () => {
    test('calls onMarkAsRead when the button is clicked', () => {
        const onMarkAsReadMock = jest.fn();
        const onScrollSpeedChangeMock = jest.fn();

        render(
            <Controls 
                onMarkAsRead={onMarkAsReadMock} 
                onScrollSpeedChange={onScrollSpeedChangeMock} 
            />
        );

        fireEvent.click(screen.getByText('Mark All as Read'));

        expect(onMarkAsReadMock).toHaveBeenCalledTimes(1);
    });

    test('updates scroll speed when input value changes', () => {
        const onMarkAsReadMock = jest.fn();
        const onScrollSpeedChangeMock = jest.fn();

        render(
            <Controls 
                onMarkAsRead={onMarkAsReadMock} 
                onScrollSpeedChange={onScrollSpeedChangeMock} 
            />
        );

        const input = screen.getByLabelText('Scroll Speed (ms):');
        fireEvent.change(input, { target: { value: '500' } });

        expect(onScrollSpeedChangeMock).toHaveBeenCalledWith('500');
    });
});