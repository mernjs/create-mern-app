from pymongo import MongoClient

def insert_data(collection, data):
    result = collection.insert_one(data)
    print(f'Data inserted with id: {result.inserted_id}')

def main():
    client = MongoClient('mongodb://localhost:27017/')
    db = client['login-with-vpjs']  # Replace with your database name
    collection = db['developers']  # Replace with your collection name
    
    # Data to be inserted
    data = {
        'name': 'John Doe',
        'email': 'john111@example.com',
        'age': 30
    }
    
    insert_data(collection, data)

if __name__ == "__main__":
    main()
