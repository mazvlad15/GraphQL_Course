const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const db = require("./models");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

db.sequelize
    .sync()
    .then(() => {
        server.listen().then(({ url }) => {
            console.log(`Sever running at ${url}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });