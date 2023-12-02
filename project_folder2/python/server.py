from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/py':
            self._set_headers()
            result = {"result": "Hello from Python!"}
            self.wfile.write(json.dumps(result).encode('utf-8'))
        else:
            self._set_headers(status_code=404)
            self.wfile.write(b'Not Found')

def run(server_class=HTTPServer, handler_class=RequestHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Python server is running on port {port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
