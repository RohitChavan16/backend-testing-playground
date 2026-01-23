const users = [];

function resetDb() {
  users.length = 0;
}

module.exports = {
  users,
  resetDb
};
