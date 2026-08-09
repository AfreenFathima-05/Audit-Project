const User = require('../models/User');

// GET /api/users            (admin only) - full directory
// GET /api/users?role=client / ?role=junior - used to populate assignment dropdowns
const getUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role && ['admin', 'junior', 'client'].includes(req.query.role)) {
      filter.role = req.query.role;
    }
    const users = await User.find(filter).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

module.exports = { getUsers };
