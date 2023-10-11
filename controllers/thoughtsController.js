const { Thought, User } = require('../models');

module.exports = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET a single thought by its _id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findById(thought.username);
      user.thoughts.push(thought._id);
      await user.save();
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove a thought by its _id
  deleteThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      const user = await User.findById(thought.username);
      user.thoughts.pull(thought._id);
      await user.save();
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to create a reaction stored in a single thought's reactions array field
  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      const reaction = await thought.reactions.create(req.body);
      thought.reactions.push(reaction);
      await thought.save();
      res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      const reaction = thought.reactions.id(req.params.reactionId);
      if (!reaction) {
        res.status(404).json({ message: 'Reaction not found' });
        return;
      }
      reaction.remove();
      await thought.save();
      res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};