const connection = require('./db');
//관리자 페이지에서 자료 추가
const DB = {
  //메인에 슈즈 정보 뿌리기
  getPdInfo: (cb) => {
    connection.query(`SELECT * FROM mydb.shoes;`, (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
};

module.exports = DB;
