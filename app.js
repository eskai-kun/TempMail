'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./api/lib/resolvers.js')
const cors = require('cors')


const app = express()
const port = process.env.port || 3000
const isDev = process.env.NODE_ENV !== 'production'

// initial schema
const typeDefs = readFileSync(
  join(__dirname, 'api', 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({typeDefs,resolvers})



app.use(cors())
//run test service route
app.use('/v1', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

//run server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/v1`)
})