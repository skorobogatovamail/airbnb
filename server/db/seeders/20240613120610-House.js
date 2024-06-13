/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Houses',
      [
        {
          name: 'The Blue Violet',
          address: 'Main Street 42, Lisboa ',
          description: 'The best Restaurant with Marine Cuisine',
          hostId: 1,
          image: '',
        },

        {
          name: 'The Golden Anchor',
          address: 'Ocean Drive 12, Miami',
          description: 'Fresh seafood and ocean views',
          image: '',
        },
        {
          name: 'The Red Sail',
          address: 'Harbour Road 34, Sydney',
          description: 'Waterfront dining with a focus on local ingredients',
          image: '',
        },
        {
          name: 'The White Wave',
          address: 'Beachside Boulevard 56, Cape Town',
          description: 'Coastal cuisine with a relaxed atmosphere',
          image: '',
        },
        {
          name: 'The Green Lighthouse',
          address: 'Lighthouse Road 78, Copenhagen',
          description: 'Scandinavian-inspired seafood dishes',
          image: '',
        },
        {
          name: 'The Yellow Buoy',
          address: 'Marina Avenue 90, Singapore',
          description: 'Asian fusion cuisine with a nautical theme',
          image: '',
        },
        {
          name: 'The Black Pearl',
          address: 'Pier Road 15, Auckland',
          description: 'Fine dining with a focus on sustainable seafood',
          image: '',
        },
        {
          name: 'The Silver Anchor',
          address: 'Waterfront Walk 27, Barcelona',
          description: 'Mediterranean cuisine with a focus on fresh seafood',
          image: '',
        },
        {
          name: 'The Bronze Anchor',
          address: 'Harbour View Drive 45, Hong Kong',
          description: 'Seafood and international cuisine with a harbor view',
          image: '',
        },
        {
          name: 'The Copper Anchor',
          address: 'Ocean View Boulevard 63, San Francisco',
          description: 'Fresh seafood and American classics',
          image: '',
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
