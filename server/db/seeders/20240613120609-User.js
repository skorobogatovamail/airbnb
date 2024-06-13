/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'j@j',
          password: '1',
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'password123',
        },
        {
          name: 'Michael Johnson',
          email: 'michael@example.org',
          password: 'letmein',
        },
        {
          name: 'Emily Davis',
          email: 'emily@example.net',
          password: 'sunshine',
        },
        {
          name: 'David Wilson',
          email: 'david@example.com',
          password: 'monkey',
        },
        {
          name: 'Sarah Anderson',
          email: 'sarah@example.org',
          password: 'password1',
        },
        {
          name: 'Christopher Thompson',
          email: 'chris@example.net',
          password: 'iloveyou',
        },
        {
          name: 'Olivia Martinez',
          email: 'olivia@example.com',
          password: 'password123!',
        },
        {
          name: 'Daniel Hernandez',
          email: 'daniel@example.org',
          password: 'qwerty',
        },
        {
          name: 'Isabella Gonzalez',
          email: 'isabella@example.net',
          password: 'password123@',
        },
        {
          name: 'Matthew Diaz',
          email: 'matthew@example.com',
          password: 'password1234',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
