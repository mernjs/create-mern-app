# data_insert.py
from pymongo import MongoClient
import sys
import json

def insert_data(database_name, collection_name, data):
    client = MongoClient('mongodb://localhost:27017/')
    db = client[database_name]
    collection = db[collection_name]

    result = collection.insert_one(data)
    
    response = {
        'message': 'Record inserted successfully',
        'data': {
            'name': data.get('name'),
            'email': data.get('email'),
            'id': str(result.inserted_id)  # Optionally include the inserted ID
        }
    }
    return response

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python data_insert.py <database_name> <collection_name> <data_json>")
        sys.exit(1)

    database_name = sys.argv[1]
    collection_name = sys.argv[2]
    data_json = sys.argv[3]

    data = json.loads(data_json)
    response = insert_data(database_name, collection_name, data)

    # Print the response as a JSON string
    print(json.dumps(response))
