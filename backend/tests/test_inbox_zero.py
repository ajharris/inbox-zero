import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

import os
import unittest
from unittest.mock import patch, MagicMock
from backend.inbox_zero import authenticate_gmail, mark_all_as_read

class TestInboxZero(unittest.TestCase):

    @patch('backend.inbox_zero.build')
    @patch('backend.inbox_zero.pickle')
    @patch('backend.inbox_zero.os.path.exists')
    @patch('backend.inbox_zero.InstalledAppFlow')
    def test_authenticate_gmail(self, mock_flow, mock_exists, mock_pickle, mock_build):
        # Mock the token.pickle file existence
        mock_exists.return_value = True

        # Simulate the absence of token.pickle for the first test
        mock_exists.side_effect = lambda path: path in ['token.pickle', 'credentials.json']

        # Remove the FileNotFoundError simulation for pickle.load
        mock_pickle.load.side_effect = None

        # Mock loading credentials from pickle
        mock_creds = MagicMock()
        mock_creds.valid = True
        mock_pickle.load.return_value = mock_creds

        # Mock the Gmail API build
        mock_service = MagicMock()
        mock_build.return_value = mock_service

        service = authenticate_gmail()

        # Assertions
        mock_pickle.load.assert_called_once()
        mock_build.assert_called_once_with('gmail', 'v1', credentials=mock_creds)
        self.assertEqual(service, mock_service)

    @patch('backend.inbox_zero.build')
    def test_mark_all_as_read(self, mock_build):
        # Mock the Gmail API service
        mock_service = MagicMock()
        mock_build.return_value = mock_service

        # Mock the messages list response
        mock_service.users().messages().list().execute.return_value = {
            'messages': [{'id': '123'}, {'id': '456'}]
        }

        # Call the function
        mark_all_as_read(mock_service)

        # Assertions
        mock_service.users().messages().modify.assert_any_call(
            userId='me', id='123', body={'removeLabelIds': ['UNREAD']}
        )
        mock_service.users().messages().modify.assert_any_call(
            userId='me', id='456', body={'removeLabelIds': ['UNREAD']}
        )

if __name__ == '__main__':
    unittest.main()