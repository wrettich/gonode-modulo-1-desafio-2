module.exports = (sequelize, DataTypes) => {
	const Section = sequelize.define('Section', {
		title: DataTypes.STRING,
		contet: DataTypes.TEXT,
	});

	Section.associate = (models) => {
		Section.belongsTo(models.Project);
	};

	return Section;
};
