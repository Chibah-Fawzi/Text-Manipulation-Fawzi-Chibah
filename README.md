 -- CRUD APP that allows to do operations on texts (French, English, Arabic?)--

Endpoints:<br/>
● POST /text/<br/>
Upload and store text with unique Id to database (you can simulate a database using json<br/>
files, or use standalone mongoDB container)<br/><br/>
● GET /text/<br/>
Fetch list of text with the support of pagination<br/><br/>
● PUT /text/:textId<br/>
Update text content<br/><br/>
● GET /text/:textId/count<br/>
Fetch total word number of given a text<br/><br/>
● GET /text/:textId/count/:language<br/>
Fetch total word number based on given text for specific languages ex: fr, ar, en<br/><br/>
● POST /text/search?q=<br/>
Fetch text based on fuzzy search using query q<br/><br/>
● GET /text/mostOccurrent<br/>
Get the most recurrent word in the whole text database<br/><br/>

NB:<br/>
● Each endpoint has its own test.<br/><br/>


To start the server use : <code>node index.js</code>

Server : NodeJs with Express.<br/>
Testing : Jest - Supertest

Tools : Fuse.js(for search) - Nodemon(fast restart) - fs(file manipulation)
