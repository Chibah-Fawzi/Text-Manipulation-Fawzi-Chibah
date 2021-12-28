 -- CRUD APP that allows to do operations on texts (French, English, Arabic?)--

Endpoints:
● POST /text/
Upload and store text with unique Id to database (you can simulate a database using json
files, or use standalone mongoDB container)
● GET /text/
Fetch list of text with the support of pagination
● PUT /text/:textId
Update text content
● GET /text/:textId/count
Fetch total word number of given a text
● GET /text/:textId/count/:language
Fetch total word number based on given text for specific languages ex: fr, ar, en
● POST /text/search?q=
Fetch text based on fuzzy search using query q
● GET /text/mostOccurrent
Get the most recurrent word in the whole text database

NB:
● Each endpoint has its own test.


To start the server use : <code>node index.js</code>

Server : NodeJs with Express.<br/>
Testing : Jest - Supertest

Tools : Fuse.js(for search) - Nodemon(fast restart) - fs(file manipulation)
