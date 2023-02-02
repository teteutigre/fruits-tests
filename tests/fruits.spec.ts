import { app } from "../src/index";
import supertest from "supertest";
import httpStatus from "http-status";
import { createDataFruit } from "./helpers";
import fruits from "data/fruits";

const server = supertest(app);

beforeEach(() => {
  const loop = fruits;
  loop.forEach(() => fruits.pop());
});

describe("POST /fruits", () => {
  it("should respond with status 422 when body is invalid", async () => {
    const response = await server.post("/fruits").send({});

    expect(response.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 201 when have created fruit", async () => {
    const nameFruit = "Banana";
    const newFruit = createDataFruit(nameFruit);

    const response = await server.post("/fruits").send(newFruit);

    expect(response.status).toEqual(httpStatus.CREATED);
  });

  it("should insert a new ticket in the database", async () => {
    const nameFruit = "Banana";
    const newFruit = createDataFruit(nameFruit);

    const beforeCount = fruits.length;

    await server.post("/fruits").send(newFruit);

    const afterCount = fruits.length;

    expect(beforeCount).toEqual(0);
    expect(afterCount).toEqual(1);
  });

  it("should respond with status 409 when name already existing in database", async () => {
    const nameFruit = "Banana";
    const newFruit = createDataFruit(nameFruit);

    await server.post("/fruits").send(newFruit);
    const response = await server.post("/fruits").send(newFruit);

    expect(response.status).toEqual(httpStatus.CONFLICT);
  });
});

describe("GET /fruits", () => {
  it("should respond with status 200 and fruits data", async () => {
    const response = await server.get("/fruits");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(fruits);
  });
});

describe("GET /fruits/:id", () => {
  it("should respond with status 200 and fruit data when id is valid", async () => {
    const nameFruit = "Banana";
    const newFruit = createDataFruit(nameFruit);

    const id = fruits.length + 1;
    fruits.push({ ...newFruit, id });

    const response = await server.get("/fruits/1");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({ id: 1, name: "Banana", price: 99 });
  });

  it("should respond with status 404 when id is invalid", async () => {
    const response = await server.get("/fruits/0");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
});
