module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "nodeBlog",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };

// module.exports = {
//   HOST: "mysql.railway.internal",
//   USER: "root",
//   PASSWORD: "TYNGWQaWOaoDaURfitYsnjfLDkIwZHFC",
//   DB: "nodeBlog",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };