const request = require('supertest')
const app = require('../')

describe('Testing textController', () => {
    const editedBody = {
        "text": "lorem ipsum",
        "language": "fr"
    }
    const body = {
        "texts":
            [{
                "language": "fr",
                "text": "lorem ipsum"
            }]
    }
    const textId = "1626529062895"

    const query = "lorem"

    test('POST - should add a text', async () => {
        const result = await request(app).post('/text').send(body)

        expect(result.statusCode).toEqual(200)
        expect(result.body).toBeInstanceOf(Object)
        expect(Object.keys(result.body).length).toEqual(2)
    })

    test('GET - should get all texts', async () => {

        const result = await request(app).get('/text')

        expect(result.statusCode).toEqual(200)
        expect(Object.keys(result.body).length).toEqual(2)
        expect(result.body).toBeInstanceOf(Object)
    })

    test('PUT - should edit all texts', async () => {

        const result = await request(app).put(`/text/${textId}`).send(editedBody);

        expect(result.statusCode).toEqual(200);
    });

    test('GET - should count the number of words in the text', async () => {

        const result = await request(app).get(`/text/${textId}/count`)

        expect(result.body).toBeInstanceOf(Object)
        expect(Object.keys(result.body).length).toEqual(1)
        expect(result.statusCode).toEqual(200)
    });


    test('GET - should count the number of words in the text based on specific languages', async () => {

        const result = await request(app).get(`/text/${textId}/count/${editedBody.language}`)

        expect(result.body).toBeInstanceOf(Object)
        expect(Object.keys(result.body).length).toEqual(1)
        expect(result.statusCode).toEqual(200)
    });

    test('POST - should search for a querry in all texts', async () => {

        const result = await request(app).post(`/text/search?q=${query}`)

        expect(result.statusCode).toEqual(200)
        expect(result.body).toBeInstanceOf(Object)
        expect(Object.keys(result.body).length).toBeGreaterThanOrEqual(0)
    })

    test('GET - should get the most occurent word in all texts', async () => {

        const result = await request(app).get("/text/mostOccurrent")

        expect(result.body).toBeInstanceOf(Object)
        expect(Object.keys(result.body).length).toEqual(2)
        expect(result.statusCode).toEqual(200)
    });
});
