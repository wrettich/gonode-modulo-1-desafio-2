module.exports = {
	up: (queryInterface, DataTypes) => {
		queryInterface.createTable('Sections', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			ProojecId: {
				type: DataTypes.INTEGER,
				reference: {
					model: 'Projects', key: 'id'
				},
				allowNull: false,
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			title: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			content: {
				allowNull: false,
				type: DataTypes.TEXT,
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
		queryInterface.dropTable('Sections');
	}
};
