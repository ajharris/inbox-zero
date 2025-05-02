import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

import os
import unittest
from unittest.mock import patch, MagicMock
from backend.inbox_zero import authenticate_gmail, mark_all_as_read

class TestInboxZero(unittest.TestCase):

    @patch('backend.inbox_zero.build')
    @patch('builtins.open', new_callable=unittest.mock.mock_open, read_data='{}')
    @patch('backend.inbox_zero.pickle.load')
    @patch('backend.inbox_zero.os.path.exists')
    def test_authenticate_gmail(self, mock_path_exists, mock_pickle_load, mock_open, mock_build):
        # Mock the existence of token.pickle and credentials.json
        mock_path_exists.side_effect = lambda path: path in ['token.pickle', 'credentials.json']

        # Mock the pickle.load behavior
        mock_creds = MagicMock()
        mock_creds.valid = True
        mock_pickle_load.return_value = mock_creds

        # Mock the Gmail API build
        mock_service = MagicMock()
        mock_build.return_value = mock_service

        # Call the function
        service = authenticate_gmail()

        # Assertions
        mock_pickle_load.assert_called_once()
        mock_open.assert_called_once_with('token.pickle', 'rb')
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

class TestInboxZeroAuthentication(unittest.TestCase):

    @patch('backend.inbox_zero.os.path.exists')
    @patch('backend.inbox_zero.pickle.load')
    def test_authenticate_gmail_no_credentials(self, mock_pickle_load, mock_path_exists):
        # Simulate missing credentials.json and token.pickle
        mock_path_exists.return_value = False

        with self.assertRaises(FileNotFoundError):
            authenticate_gmail()

    @patch('backend.inbox_zero.build')
    def test_mark_all_as_read_without_authentication(self, mock_build):
        # Simulate an unauthenticated service
        mock_build.side_effect = Exception("Authentication required")

        with self.assertRaises(Exception) as context:
            mark_all_as_read(None)

        self.assertIn("Authentication required", str(context.exception))

if __name__ == '__main__':
    unittest.main()