const { STRING } = require("sequelize");

module.exports =(sequelize,DataTypes)=>{
    const Blog = sequelize.define("blog",{
        title:{
            type:DataTypes.STRING,
            allowNULL: false
        },
        subtitle:{
            type:DataTypes.STRING,
            allowNULL: false
        },
        description:{
            type:DataTypes.TEXT,
            allowNULL: false
        },
        imageUrl:{
            type: DataTypes.STRING,
            defaultValue: null
        }
    })
    return Blog;
}