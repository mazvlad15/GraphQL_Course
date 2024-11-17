const { UserList } = require("../fakeData");
const { User } = require("../models")

const resolvers = {
    Query: {
        users: async () => {
            const users = await User.findAll();
            return users;
        },
        user: async (parent, args) => {
            const id = args.id;
            return await User.findByPk(id);
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = args.input;
            await User.create(user)
            return null;
        },

        updateUsername: async (parent, args) => {
            const { id, newUsername } = args.input;
            const user = await User.findByPk(id);
            if (user) {
                user.username = newUsername;
                await User.save();
            }
            return user;
        },

        deleteUser: async (parent, args) => {
            const id = args.id;
            await User.destory({ where: { id } });
            return null; ``
        }
    }
}

module.exports = { resolvers };