// Mock window.alert to suppress warnings in tests
global.alert = jest.fn();

// Mock fetch for network requests
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();