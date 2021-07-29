const tsNode = require("ts-node")
const tsConfig = require("./tsconfig.json")

tsNode.register({
    files: true,
    transpileOnly: true,
    project: "./test/tsconfig.json",
})
