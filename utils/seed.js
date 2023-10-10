const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const { generateUserData, generateThoughtData, generateReactionData } = require('../utils/data');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('connected to database');

  // Delete all existing documents in the collections
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    const user = generateUserData();
    users.push(user);
  }

  // Add users to the collection and await the results
  await User.insertMany(users);

  // Create empty array to hold the thoughts
  const thoughts = [];

  // Loop 50 times -- add thoughts to the thoughts array
  for (let i = 0; i < 50; i++) {
    const thought = generateThoughtData();
    thought.user = users[Math.floor(Math.random() * users.length)]._id;
    thoughts.push(thought);
  }

  // Add thoughts to the collection and await the results
  await Thought.insertMany(thoughts);

  // Loop through each thought and add random reactions to it
  for (const thought of thoughts) {
    const numReactions = Math.floor(Math.random() * 10);
    for (let i = 0; i < numReactions; i++) {
      const reaction = generateReactionData();
      reaction.user = users[Math.floor(Math.random() * users.length)]._id;
      thought.reactions.push(reaction);
    }
    await thought.save();
  }

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');

  // Close the database connection
  db.close();
});