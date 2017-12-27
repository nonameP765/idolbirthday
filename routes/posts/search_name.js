const birth = require('./data.json');

module.exports.search = (req, res) => {
    let payload = [];
    if (req.body.where.indexOf(-1) > -1)
      for(i = 0; i < birth.length; i++) {
          if (birth[i].name.indexOf(req.body.name) != -1){
            payload.push(birth[i]);
          }
      }
    else
      for(i = 0; i < birth.length; i++) {
          if (birth[i].name.indexOf(req.body.name) != -1 && req.body.where.indexOf(birth[i].where) != -1){
            payload.push(birth[i]);
          }
      }
    if(payload.length == 0)
      res.send({"log" : "등록된 아이돌 이름이 없습니다."}).end();
    else
      res.send(payload).end();
}
