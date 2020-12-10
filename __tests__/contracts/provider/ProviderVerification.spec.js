const path = require("path")
const { Verifier } = require("@pact-foundation/pact")
const { server, importData} = require("../../../src/provider.js")
const SERVER_URL = "http://localhost:8081"

server.listen(8081, () => {
    importData()
    console.log(`Client service is running on ${SERVER_URL}`)
})

describe("Client service verification",() => {
    const opts = {
        provider: "Client Service",
        providerBaseUrl: SERVER_URL,
        pactUrls: [path.resolve(process.cwd(), "./__tests__/contracts/pacts/frontend-clientservice.json")],
        publishVerificationResult: true,
        providerVersion: "1.0.0"
    }

    it('should validate the expectations from the client service', () => {
        return new Verifier().verifyProvider(opts)
    });
})
