const birth = require('./data.json');

module.exports.search = (req, res) => {
    let payload = [];
    if (req.body.where.indexOf(-1) != -1)
      for(let i = 0; i < birth.length; i++){
          if(birth[i].month == req.body.month && birth[i].day == req.body.day){
            payload.push(birth[i]);
          }
      }
    else
      for(let i = 0; i < birth.length; i++){
          if(birth[i].month == req.body.month && birth[i].day == req.body.day && req.body.where.indexOf(birth[i].where) != -1){
            payload.push(birth[i]);
          }
      }
    if(payload.length == 0)
      res.send({"log" : "그날 생일인 아이돌이 없습니다!"}).end();
    else
      res.send(payload).end();
};
