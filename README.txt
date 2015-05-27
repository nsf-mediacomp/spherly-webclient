#NOTE: Spherly Webclient has been merged with the Spherly Server
project!!
##It can now be found in the SpherlyServer/assets/www/ folder of the Spherly
Server project:
##https://github.com/jakeonaut/spherly-server-java

###As a result, this project is deprecated.


Webclient code for Spherly. Built on Blockly: https://developers.google.com/blockly/

Link to Spherly Server code: https://github.com/jakeonaut/spherly-server-java

---------------------------------------------

Includes Calibrate, Open/Save Project feature, Rudimentary Language switching, and python script to run web client offline.

If running client locally and not on a windows machine (cannot use the included binary):
1. Download source code & extract
2. Navigate command line/terminal to the html directory
3. Make sure python 2.7 is installed (if python3 is installed instead, skip step 4 and go to step 5)
4. (skip this step if running python3) Run "python -m SimpleHTTPServer" from the command line.
5. (skip this step if running python2) Run "python3 -m http.server" from the command line
6. Navigate your webbrowser to http://127.0.0.1:8000 to access the web client :)!

Make sure you download the server from https://github.com/jakeonaut/spherly-server-java to be able to connect to Sphero!
