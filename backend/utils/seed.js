const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Audit = require('../models/Audit');

// Ensures the DB has at least one usable login for every role and a couple of
// sample engagements, so the portal is functional immediately after a fresh
// MongoDB Atlas connection instead of showing an empty, login-less app.
// Safe to run on every boot: it only creates what's missing.
const seed = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (!existingAdmin) {
      const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
      const hashed = await bcrypt.hash(adminPassword, 10);

      const admin = await User.create({
        name: 'Firm Administrator',
        email: (process.env.ADMIN_EMAIL || 'admin@aurilious.co').toLowerCase(),
        password: hashed,
        role: 'admin',
      });

      const juniorPassword = await bcrypt.hash('ChangeMe123!', 10);
      const junior = await User.create({
        name: 'Sarah Jenkins',
        email: 'sarah@aurilious.co',
        password: juniorPassword,
        role: 'junior',
      });

      const clientPassword = await bcrypt.hash('ChangeMe123!', 10);
      const client = await User.create({
        name: 'Eleanor Vance',
        email: 'eleanor@vance.com',
        password: clientPassword,
        role: 'client',
        company: 'Vance Manufacturing',
      });

      await Audit.create({
        title: 'Annual Statutory Audit FY26',
        client: client._id,
        assignedTo: junior._id,
        status: 'in_progress',
        description: 'Full statutory audit for fiscal year 2026.',
        amount: 185000,
      });

      console.log('Seed complete. Default admin login:');
      console.log(`  email: ${admin.email}  password: ${adminPassword}`);
      console.log('  (change this password immediately in production)');
    }
  } catch (error) {
    console.error('Seed error:', error.message);
  }
};

module.exports = seed;
