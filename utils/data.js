const faker = require('faker');

// Generate random user data
function generateUserData() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = `${firstName.toLowerCase()}${Math.floor(Math.random() * 100)}`;
  const email = `${username}@example.com`;
  const password = faker.internet.password();

  return {
    firstName,
    lastName,
    username,
    email,
    password,
  };
}

// Generate random thought data
function generateThoughtData() {
  const text = faker.lorem.sentence();
  const createdAt = faker.date.past();

  return {
    text,
    createdAt,
  };
}

// Generate random reaction data
function generateReactionData() {
  const types = ['like', 'love', 'haha', 'wow', 'sad', 'angry'];
  const type = types[Math.floor(Math.random() * types.length)];

  return {
    type,
  };
}

module.exports = {
  generateUserData,
  generateThoughtData,
  generateReactionData,
};