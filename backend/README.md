# Gmail Inbox Manager Backend

This is the backend component of the Gmail Inbox Manager project. It provides a Flask server that interacts with the Gmail API to manage email messages.

## Project Structure

- **app.py**: Main entry point for the backend application. Sets up the Flask server and handles API routes.
- **inbox_zero.py**: Contains logic for authenticating with the Gmail API and marking emails as read.
- **requirements.txt**: Lists the Python dependencies required for the backend application.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd gmail-inbox-manager/backend
   ```

2. **Create a virtual environment** (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```
   pip install -r requirements.txt
   ```

4. **Set up Google API credentials**:
   - Create a project in the Google Developer Console.
   - Enable the Gmail API.
   - Create OAuth 2.0 credentials and download the `credentials.json` file.
   - Place the `credentials.json` file in the backend directory.

5. **Run the application**:
   ```
   python app.py
   ```

## Usage

- The backend exposes API endpoints to mark all unread emails as read and to manage user settings.
- Ensure that the frontend is configured to communicate with this backend.

## License

This project is licensed under the MIT License. See the LICENSE file for details.