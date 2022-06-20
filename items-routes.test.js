process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require('./app');
let items = require('./fakeDb');

// define first item on the shopping list
let popsicle = { "name": "popsicle", "price": 1.45 };

beforeEach(function() {
    items.push(popsicle);
});

afterEach(function() {
    items.length = 0;
});

describe("GET /items", () => {
    test("Gets all items of the shopping list", async () => {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [popsicle]});
    });
});

describe("POST /items", () => {
    test("Add item to the shopping list", async () => {
        const resp = await request(app).post('/items').send({ "name": "cheerios", "price": 3.45 });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ item: { "name": "cheerios", "price": 3.45 } });
    });
});

describe("PATCH /items/:name", () => {
    test("Updating the name and price item of the shopping list", async () => {
        const resp = await request(app).patch(`/items/${popsicle.name}`).send({ "name": "cheerios", "price": 2.15 });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ item: { "name": "cheerios", "price": 2.15 } });
    });

    test("Updating the name item of the shopping list", async () => {
        const resp = await request(app).patch(`/items/${popsicle.name}`).send({ "name": "popcorn" });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ item: { "name": "popcorn", "price": popsicle.price } });
    });

    test("Updating the price item of the shopping list", async () => {
        const resp = await request(app).patch(`/items/${popsicle.name}`).send({ "price": 2.15 });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ item: { "name": popsicle.name, "price": 2.15 } });
    });

    test("Respond with 404 for invalid item name", async () => {
        const resp = await request(app).patch('/items/invalidName').send({ "name": "cheerios", "price": 2.15 });
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", () => {
    test("Deleting item from the shopping list", async () => {
        const resp = await request(app).delete(`/items/${popsicle.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });

    test("Respond with 404 for invalid item name", async () => {
        const resp = await request(app).delete('/items/invalidName');
        expect(resp.statusCode).toBe(404);
    });
});