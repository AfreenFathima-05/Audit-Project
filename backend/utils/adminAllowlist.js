// Only these emails may ever hold the 'admin' role. Set ADMIN_EMAILS as a
// comma-separated list in .env for multiple owners/partners; ADMIN_EMAIL
// (singular, used by the seed script) is always included automatically.
const getAdminAllowlist = () => {
  const list = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (process.env.ADMIN_EMAIL) {
    list.push(process.env.ADMIN_EMAIL.trim().toLowerCase());
  }

  return [...new Set(list)];
};

const isAllowlistedAdminEmail = (email) => getAdminAllowlist().includes((email || '').toLowerCase());

module.exports = { getAdminAllowlist, isAllowlistedAdminEmail };
