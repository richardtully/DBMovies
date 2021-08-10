const movieTable = (sequelize, DataTypes) => {
    const MovieTable = sequelize.define('movietable', {
        movie_id: { 
            type: DataTypes.STRING(60),
            primaryKey: true,
            autoIncrement:true
        },
        name: { 
            type: DataTypes.STRING(60) 
        },
        rating: { 
            type: DataTypes.STRING(60) 
        },
        url: { 
            type: DataTypes.STRING(60) 
        },
        description: {
            type: DataTypes.STRING(600)
        }
    },{
        timestamps: false,
        freezeTableName: true,
     });

    return MovieTable
};

module.exports = movieTable;