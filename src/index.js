const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => context.prisma.links()
    // link: (parent, args) => links.find(link => link.id === args.id)
  },
  Mutation: {
    post: (root, args, context, info) =>
      context.prisma.createLink({
        url: args.url,
        description: args.description
      })
    // updateLink: (parent, args) => {
    //   const link = links.find(link => link.id === args.id);
    //   if (link) {
    //     if (args.url) link.url = args.url;
    //     if (args.description) link.description = args.description;
    //   }
    //   return link;
    // },
    // deleteLink: (parent, args) => {
    //   const linkIdx = links.findIndex(link => link.id === args.id);
    //   if (linkIdx < 0) return null;
    //   return links.splice(linkIdx, 1)[0];
    // }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
