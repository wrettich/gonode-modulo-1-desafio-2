module.exports = {
	up: (queryInterface, DataTypes) => {
		queryInterface.createTable('Projects', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			UserId: {
				type: DataTypes.INTEGER,
				reference: {
					model: 'Users', key: 'id'
				},
				allowNull: false,
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			title: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
		});
	},

	down: (queryInterface) => {
		queryInterface.dropTable('Projects');
	}
};
