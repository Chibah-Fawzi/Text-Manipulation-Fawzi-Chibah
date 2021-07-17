const textController = require("../controllers/textController");


module.exports = (app) => {

    app.post('/text', textController.addText);
    app.get('/text', textController.getText);
    app.put('/text/:textId', textController.editText);
    app.get('/text/:textId/count', textController.countWords);
    app.get('/text/:textId/count/:language', textController.countWordsLang);
    app.post('/text/search?q=', textController.fuzzySearch);
    app.get('/text/mostOccurrent', textController.mostOccurentWord);

}
