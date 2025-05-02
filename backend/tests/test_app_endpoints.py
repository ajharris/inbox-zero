import unittest
from unittest.mock import patch, MagicMock
from backend.app import app
import json

class TestAppEndpoints(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    @patch('backend.app.authenticate_gmail')
    def test_login_endpoint_success(self, mock_authenticate_gmail):
        # Mock successful authentication
        mock_authenticate_gmail.return_value = MagicMock()

        response = self.app.get('/api/login')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {"message": "Login successful."})

    @patch('backend.app.authenticate_gmail')
    def test_login_endpoint_failure(self, mock_authenticate_gmail):
        # Mock authentication failure
        mock_authenticate_gmail.side_effect = Exception("Authentication failed")

        response = self.app.get('/api/login')
        self.assertEqual(response.status_code, 500)
        self.assertIn("Authentication failed", json.loads(response.data)["error"])