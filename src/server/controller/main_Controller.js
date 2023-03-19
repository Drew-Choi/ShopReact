const connection = require('./db');
//관리자 페이지에서 자료 추가
const DB = {
  addPdInfo: (newPD, cb) => {
    connection.query(
      `INSERT INTO shoes (PD_NAME, CONTENT, PRICE) VALUES ('${newPD.pd_name}', '${newPD.content}','${newPD.price}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  //메인에 슈즈 정보 뿌리기
  getPdInfo: (id, cb) => {
    connection.query(
      `SELECT * FROM mydb.shoes WHERE PD_NAME = '${id}';`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};
