const path = require("path")
const { Pact } = require("@pact-foundation/pact")

global.port = 8081
global.provider = new Pact({
    port: global.port,
    log: path.resolve(process.cwd(), "__tests__/contracts/logs/", "logs-pact.log"),
    dir: path.resolve(process.cwd(), "__tests__/contracts/pacts/"),
    pactFileWriteMode: "overwrite",
    logLevel: "INFO",
    consumer: "Frontend",
    provider: "ClientService",
    spec: 2
})
