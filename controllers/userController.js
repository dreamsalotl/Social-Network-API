const { User } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts friends');
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts friends');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUserById: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      await User.updateMany(
        { _id: { $in: user.friends } },
        { $pull: { friends: req.params.userId } }
      );
      await Thought.deleteMany({ username: user.username });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  removeFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;