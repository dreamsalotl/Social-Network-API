function generateUserData() {
  const users = [
    {
      username: 'johndoe',
      email: 'johndoe@example.com',
    },
    {
      username: 'janesmith',
      email: 'janesmith@example.com',
    },
    // Add more user objects as needed
  ];

  return users;
}

// Generate manual thought data
function generateThoughtData(users) {
  const thoughts = [
    {
      thoughtText: 'This is a sample thought.',
      createdAt: new Date('2023-01-15'),
      username: users[0].username,
      reactions: [
        {
          reactionBody: 'This is a reaction to the sample thought.',
          username: users[1].username,
        },
      ],
    },
    {
      thoughtText: 'Another example thought here.',
      createdAt: new Date('2023-01-20'),
      username: users[1].username,
      reactions: [
        {
          reactionBody: 'This is a reaction to another example thought.',
          username: users[0].username,
        },
      ],
    },
    // Add more thought objects as needed
  ];

  return thoughts;
}

module.exports = {
  generateUserData,
  generateThoughtData,
};