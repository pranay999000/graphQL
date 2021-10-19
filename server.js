const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const Plus = require('./models/Plus')

const typeDefs = gql`
    type Count {
        id: ID!
        count: Int
    }
    type Query {
        getCount: [Count]
    }
    type Mutation {
        plusOne(countId: ID!): Count
    }
`;

const resolvers = {
    Query: {
        async getCount() {
            try {
                const count = await Plus.find()
                return count
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        async plusOne(_, { countId }, context) {
            const count = await Plus.findById(countId)

            if (count) {
                if (String(count._id) === String(countId)) {
                    await Plus.updateOne(
                        { _id: countId },
                        { $set: { count: count.count + 1 } }
                    )

                    return Plus.findById(countId)
                }
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(
    "mongodb+srv://user-01:confidential@cluster0.fg7fh.mongodb.net/Plus?retryWrites=true&w=majority",
    { useNewUrlParser: true }
).then(() => {
    console.log("Database connected")
    return server.listen({ port: 8000 })
})
.then((res) => {
    console.log(`Server running at Port: ${res.url}`)
})

