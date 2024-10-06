from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import urlparse

# In-memory storage for items
data_store = {}
id_counter = 1

class RequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path == '/items':
            self.handle_get_items()
        elif parsed_path.path.startswith('/items/'):
            self.handle_get_item(parsed_path.path.split('/')[-1])
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == '/items':
            self.handle_create_item()
        else:
            self.send_response(404)
            self.end_headers()

    def do_PUT(self):
        if self.path.startswith('/items/'):
            self.handle_update_item(self.path.split('/')[-1])
        else:
            self.send_response(404)
            self.end_headers()

    def do_DELETE(self):
        if self.path.startswith('/items/'):
            self.handle_delete_item(self.path.split('/')[-1])
        else:
            self.send_response(404)
            self.end_headers()

    def handle_get_items(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data_store).encode())

    def handle_get_item(self, item_id):
        if item_id in data_store:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(data_store[item_id]).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def handle_create_item(self):
        global id_counter
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        item = json.loads(body)
        item_id = str(id_counter)
        data_store[item_id] = item
        id_counter += 1
        self.send_response(201)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"id": item_id}).encode())

    def handle_update_item(self, item_id):
        if item_id in data_store:
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            item = json.loads(body)
            data_store[item_id] = item
            self.send_response(200)
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    def handle_delete_item(self, item_id):
        if item_id in data_store:
            del data_store[item_id]
            self.send_response(204)
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting httpd on port {port}')
    httpd.serve_forever()

if __name__ == "__main__":
    run()
