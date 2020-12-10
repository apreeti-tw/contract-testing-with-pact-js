"use strict"

const { Matchers } = require("@pact-foundation/pact")
const { getClients, getClient, postClient } = require("../../../src/consumer.js")
const clientID = 1

describe ("Client Service", () => {
    const GET_EXPECTED_BODY = [
        {
            "firstName": "Lisa",
            "lastName": "Simpson",
            "age": 8,
            "id": 1
        },
        {
            "firstName": "Wonder",
            "lastName": "Woman",
            "age": 30,
            "id": 2
        },
        {
            "firstName": "Homer",
            "lastName": "Simpson",
            "age": 39,
            "id": 3
        }
    ]

    afterEach(() => provider.verify())

    describe("Get clients", () => {
        beforeEach(() => {
            const interaction = {
                state: "Display list of clients",
                uponReceiving: "a request call for /clients",
                withRequest: {
                    method: "GET",
                    path: "/clients",
                    headers: {
                        Accept: "application/json, text/plain, */*"
                    },
                },
                willRespondWith: {
                    status: 200,
                    body: GET_EXPECTED_BODY,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }
            }
            return provider.addInteraction(interaction)
        })

        test(" return correct body, header and statuscode", async() => {
            const response = await getClients()
            expect(response.status).toBe(200)
            expect(response.data).toEqual(GET_EXPECTED_BODY)
            expect(response.headers['content-type']).toEqual("application/json; charset=utf-8")
        })
    })

    const GET_SINGLE_CLIENT_BODY =
        {
            "firstName": "Lisa",
            "lastName": "Simpson",
            "age": 8,
            "id": 1
        }

    describe("Get client with id", () => {
        beforeEach(() => {
            const interaction = {
                state: "Display list of clients",
                uponReceiving: "a request call for /clients/{id}",
                withRequest: {
                    method: "GET",
                    path: `/clients/${clientID}`,
                    headers: {
                        Accept: "application/json, text/plain, */*"
                    },
                },
                willRespondWith: {
                    status: 200,
                    body: GET_SINGLE_CLIENT_BODY,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }
            }
            return provider.addInteraction(interaction)
        })

        test(" return correct body, header and statuscode", async() => {
            const response = await getClient(clientID)
            expect(response.status).toBe(200)
            expect(response.data).toEqual(GET_SINGLE_CLIENT_BODY)
            expect(response.headers['content-type']).toEqual("application/json; charset=utf-8")
        })
    })

    const POST_BODY = {
        firstName: "Leonia",
        lastName: "Bernhardt",
        age: 80
    }

    const POST_EXPECTED_BODY = {
        firstName: POST_BODY.firstName,
        lastName: POST_BODY.lastName,
        age: POST_BODY.age,
        id: 3
    }

    describe("Post client", () => {
        beforeEach(() => {
            const interaction = {
                state: "create new client",
                uponReceiving: "request to post new client data",
                withRequest: {
                    method: "POST",
                    path: "/clients",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                    },
                    body: POST_BODY
                },
                willRespondWith: {
                    status: 200,
                    body: POST_EXPECTED_BODY,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }
            }
            return provider.addInteraction(interaction)
        })

        test("return body, header, status code and client id when post is successful", async () => {
            const response = await postClient(POST_BODY)
            console.log(response.data)
            expect(response.data.id).toEqual(POST_EXPECTED_BODY.id)
            expect(response.data).toEqual(POST_EXPECTED_BODY)
            expect(response.headers['content-type']).toEqual("application/json; charset=utf-8")
            expect(response.status).toBe(200)
        })
    })
})
