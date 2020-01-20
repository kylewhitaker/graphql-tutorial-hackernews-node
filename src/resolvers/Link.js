function postedBy(parent, args, context, info) {
  return context.prisma.link({ id: parent.id }).postedBy();
}

function votes(parent, args, context, info) {
  return context.prisma.link({ id: parent.id }).votes();
}

module.exports = { postedBy, votes };
