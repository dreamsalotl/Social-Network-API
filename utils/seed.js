const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const { generateUserData, generateThoughtData } = require('./data');

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetwork';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('connected to the database');

  // Delete all existing documents in the collections
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create empty array to hold the users
  const users = generateUserData();

  // Add users to the collection and await the results
  await User.insertMany(users);

  // Create empty array to hold the thoughts
  const thoughts = generateThoughtData(users);

  // Loop through each thought and add a user to it
  thoughts.forEach((thought) => {
    thought.user = users[Math.floor(Math.random() * users.length)]._id;
  });

  // Add thoughts to the collection and await the results
  await Thought.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');

  // Close the database connection
  db.close();
});