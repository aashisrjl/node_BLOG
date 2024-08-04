module.exports =(sequelize,DataTypes)=>{
    const User = sequelize.define("user",{
        username:{
            type:DataTypes.STRING,
            allowNULL: false
        },
        email:{
            type:DataTypes.STRING,
            allowNULL: false
        },
        password:{
            type:DataTypes.STRING,
            allowNULL: false
        }
    })
    return User;
}