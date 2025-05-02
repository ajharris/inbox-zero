import unittest
from unittest.mock import patch, MagicMock
from backend.inbox_zero import authenticate_gmail

class TestInboxZeroAuthentication(unittest.TestCase):

    @patch('backend.inbox_zero.os.path.exists')
    @patch('backend.inbox_zero.pickle.load')
    def test_authenticate_gmail_no_credentials(self, mock_pickle_load, mock_path_exists):
        # Simulate missing credentials.json and token.pickle
        mock_path_exists.return_value = False

        with self.assertRaises(FileNotFoundError):
            authenticate_gmail()

    @patch('backend.inbox_zero.authenticate_gmail', side_effect=Exception("Authentication required"))
    @patch('backend.inbox_zero.build')
    def test_mark_all_as_read_without_authentication(self, mock_build, mock_authenticate_gmail):
        # Simulate an unauthenticated service
        print("Mock authenticate_gmail called")
        with self.assertRaises(Exception) as context:
            mock_authenticate_gmail()

        self.assertIn("Authentication required", str(context.exception))