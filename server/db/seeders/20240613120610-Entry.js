/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Entries',
      [
        {
          name: 'The Blue Violet',
          address: 'Main Street 42, Lisboa ',
          description: 'The best Entry with Marine Cuisine',
          hostId: 1,
        },

        {
          name: 'The Golden Anchor',
          address: 'Ocean Drive 12, Miami',
          description: 'Fresh seafood and ocean views',
        },
        {
          name: 'The Red Sail',
          address: 'Harbour Road 34, Sydney',
          description: 'Waterfront dining with a focus on local ingredients',
        },
        {
          name: 'The White Wave',
          address: 'Beachside Boulevard 56, Cape Town',
          description: 'Coastal cuisine with a relaxed atmosphere',
        },
        {
          name: 'The Green Lightentry',
          address: 'Lightentry Road 78, Copenhagen',
          description: 'Scandinavian-inspired seafood dishes',
        },
        {
          name: 'The Yellow Buoy',
          address: 'Marina Avenue 90, Singapore',
          description: 'Asian fusion cuisine with a nautical theme',
        },
        {
          name: 'The Black Pearl',
          address: 'Pier Road 15, Auckland',
          description: 'Fine dining with a focus on sustainable seafood',
        },
        {
          name: 'The Silver Anchor',
          address: 'Waterfront Walk 27, Barcelona',
          description: 'Mediterranean cuisine with a focus on fresh seafood',
        },
        {
          name: 'The Bronze Anchor',
          address: 'Harbour View Drive 45, Hong Kong',
          description: 'Seafood and international cuisine with a harbor view',
        },
        {
          name: 'The Copper Anchor',
          address: 'Ocean View Boulevard 63, San Francisco',
          description: 'Fresh seafood and American classics',
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
