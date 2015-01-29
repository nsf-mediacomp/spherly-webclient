import webbrowser
import SimpleHTTPServer
import SocketServer

PORT = 8000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
webbrowser.open_new_tab('http://localhost:8000/')
httpd.serve_forever()

