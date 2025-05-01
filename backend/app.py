from flask import Flask, jsonify, request
from flask_cors import CORS
from inbox_zero import authenticate_gmail, mark_all_as_read

app = Flask(__name__)
CORS(app)

@app.route('/api/mark_all_as_read', methods=['POST'])
def mark_all_as_read_endpoint():
    try:
        service = authenticate_gmail()
        mark_all_as_read(service)
        return jsonify({"message": "All unread emails marked as read."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)