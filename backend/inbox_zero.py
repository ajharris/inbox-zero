import os
import pickle
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/gmail.modify']

def authenticate_gmail():
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)
    return service

def mark_all_as_read(service):
    try:
        results = service.users().messages().list(userId='me', q='is:unread').execute()
        messages = results.get('messages', [])

        if not messages:
            print("No unread messages found.")
            return

        for message in messages:
            msg_id = message['id']
            service.users().messages().modify(
                userId='me', id=msg_id, body={'removeLabelIds': ['UNREAD']}).execute()

        print(f"Marked {len(messages)} messages as read.")
    except Exception as error:
        print(f"An error occurred: {error}")