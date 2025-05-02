import unittest
from unittest.mock import patch, MagicMock
from backend.inbox_zero import mark_all_as_read

class TestMarkAllAsRead(unittest.TestCase):

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