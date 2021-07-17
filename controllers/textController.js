const fs = require('fs')
const Fuse = require('fuse.js')

const dataPath = 'model/text.json'


// File manipulation
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }
        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        callback();
    });
};


function addText(req, res) {
    readFile(data => {

        // Set the id as the time the text is create to get a unique value.
        const textId = Date.now().toString();

        data[textId.toString()] = req.body;

        var addedText = {
            id: textId,
            texts: req.body.texts
        }
        data = [...data, addedText]
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).json({ success: true, addedText });
        });
    }, true);
}

function getText(req, res) {

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        if (data) {
            res.status(200).json({ status: "success", data: JSON.parse(data) })
        } else {
            res.status(404).json({ err: 'Your file is empty' })
        }

    });
}

function editText(req, res) {
    readFile(data => {

        const textId = req.params["textId"];

        if (data !== ([] || null)) {
            const index = data.findIndex(e => e.id == textId)
            data[index].texts = data[index].texts.map(e => ({
                ...e,
                text: req.body.text,
                language: req.body.language
            }))

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).json(`text id:${textId} updated`);
            });
        }
    }, true);
}

// Fetch total word number of given a text
function countWords(req, res) {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const textId = req.params["textId"];
        data[textId] = req.body;

        const parsedData = JSON.parse(data)

        if (parsedData) {
            for (let key in parsedData) {
                if (parsedData[key].id === textId) {
                    var tId = parsedData[key].texts
                }
                break;
            }
            const countedWords = tId[0].text.split(' ').length

            res.status(200).json({ msg: `This text has ${countedWords} words` });
        }
    });
}

// Fetch total word number based on given text for specific languages ex: fr, ar, en
function countWordsLang(req, res) {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const textId = req.params["textId"];
        const language = req.params["language"]
        const parsedData = JSON.parse(data)

        const findID = parsedData.find(e => e.id == textId)
        if (findID == null) {
            res.status(404).json({ err: "id doesnt exist" })
        } else {

            const textToCount = findID.texts.find(e => e.language == language)

            if (textToCount == null) {
                res.status(404).json({ err: "there is no text in this language" })
            } else {
                const countedWords = textToCount.text.split(' ').length
                const languages = {
                    en: `This text had ${countedWords} words in English`,
                    fr: `Ce texte comporte ${countedWords} mots en Français`,
                    ar: `هذا النص يحتوي على  ${countedWords}  كلمة باللغة العربية`
                }

                res.status(200).json({ msg: languages[language] })
            }
        }
    });
}

//Fetch text based on fuzzy search using query q
function fuzzySearch(req, res) {

    fs.readFile(dataPath, 'utf8', (err, data) => {

        const parsedData = JSON.parse(data)
        const query = req.query["q"]

        const options = {
            includeScore: true,
            keys: ['texts.text']
        }

        const fuse = new Fuse(parsedData, options)

        const result = fuse.search(query)

        if (err) {
            throw err;
        }

        res.status(200).json(result);
    });
}

// Get the most recurrent word in the whole text database
function mostOccurentWord(req, res) {

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const parsedData = JSON.parse(data)

        for (var i = 0; i < parsedData.length; i++) {
            var texts = parsedData[i].texts;
            for (var j = 0; j < texts.length; j++) {
                var str = texts[j].text
                break;
            }
            break;
        }

        var mostOccurentWord = function (text) {
            // Split on each alphanumeric word
            const words = text.toLowerCase().split(/\W+/);
            const map = {};
            for (const w of words) {
                // Count occurrence of each word in words  
                if (map[w] == null) map[w] = 0;
                map[w]++;
            }
            let res = '';
            let max = -Infinity;
            for (const w in map) {
                const count = map[w];
                if (count > max) {
                    res = w;
                    max = count;
                }
            }
            return [res, max];
        };
        // Get 2 values from the function
        var occurentWord = mostOccurentWord(str);
        var word = occurentWord[0];
        var times = occurentWord[1];
        res.status(200).json({ mostOccurentWord: word, numberOfTimes: times })
    });
}


const textController = {
    addText,
    getText,
    editText,
    countWords,
    countWordsLang,
    mostOccurentWord,
    fuzzySearch,
}

module.exports = textController