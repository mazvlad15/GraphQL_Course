const { UserList } = require("../fakeData");
const _ = require("lodash")

const resolvers = {
    Query: {
        users: () => {
            return UserList;
        },
        user: ((parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) });
            return user;
        })
    },

    Mutation: {
        addUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length - 1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },

        updateUsername: (parent, args) => {
            const {id, newUsername} = args.input;
            let userUpdated;
            UserList.forEach((user) => {
                if(user.id === Number(id)) {
                    userUpdated = user;
                    user.username = newUsername;
                }
            });
            return userUpdated;
        },

        deleteUser: (parent, args) => {
            const id = args.id;
            _.remove(UserList, (user) => user.id === Number(id));
            return null;``
        }
    }
}

module.exports = { resolvers };