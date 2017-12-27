const birth = require('./data.json');

module.exports.search = (req, res) => {
  let month = req.body.month;
  let date = req.body.day;
  let payload = [];
  if(req.body.where.indexOf(-1) != -1)
    for (let i = 0; i<req.body.index; i++){
      nearsearch();
    }
  else
    for (let i = 0; i<req.body.index; i++){
      nearsearch_where();
    }
  for(let i = payload.length-1; i > -1; i--){
    if(payload[i].length == 0){
      payload.splice(i,1)
    }
  }
  if(payload[0].length == 0){
    res.send({"log":"곧 생일인 아이돌이 없습니다!"}).end();
  }else {
    res.send(payload).end();
  }

  function nearsearch() {
    //만약 같은달 안에 다른 날짜인 생일이 있다면?
    let payload_in = [];
    let sameMnearday = 32;
    for(let i = 0; i<birth.length; i++){
      if(month == birth[i].month){
        if(date < birth[i].day && sameMnearday >= birth[i].day){
          sameMnearday = birth[i].day;
        }
      }
    }
    let upperMnearmonth = 13;
    let upperMnearday = [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32];
    if(sameMnearday != 32){
      for(let i = 0; i<birth.length; i++){
        if(birth[i].month == month && birth[i].day == sameMnearday){
          payload_in.push(birth[i])
        }
      }
      date = sameMnearday;
      payload.push(payload_in);
    }
    //같은 달 안에 없다면??
    //우선은 오늘날보다 큰 달 먼저 계산
    else {
      for(let i = 0; i<birth.length; i++){
        if(month < birth[i].month && birth[i].month <= upperMnearmonth){
          upperMnearmonth = birth[i].month;
          if(upperMnearday[birth[i].month] >= birth[i].day){
            upperMnearday[birth[i].month] = birth[i].day;
          }
        }
      }
      let lowerMnearmonth = 13;
      let lowerMnearday = [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32];
      if(upperMnearmonth != 13){
        for(let i = 0; i<birth.length; i++){
          if(birth[i].month == upperMnearmonth && birth[i].day == upperMnearday[upperMnearmonth]){
            payload_in.push(birth[i])
          }
        }

        month = upperMnearmonth;
        date = upperMnearday[upperMnearmonth];
        payload.push(payload_in);
      }
      //마지막으로 작은 달 계산
      else{
        for(let i = 0; i<birth.length; i++){
          if(month > birth[i].month && birth[i].month <= lowerMnearmonth){
            lowerMnearmonth = birth[i].month;
            if(lowerMnearday[birth[i].month] >= birth[i].day){
              lowerMnearday[birth[i].month] = birth[i].day;
            }
          }
        }
        for(let i = 0; i<birth.length; i++){
          if(birth[i].month == lowerMnearmonth && birth[i].day == lowerMnearday[lowerMnearmonth]){
            payload_in.push(birth[i]);
          }
        }
        month = lowerMnearmonth;
        date = lowerMnearday[lowerMnearmonth];
        payload.push(payload_in);
      }
    }
  }

  function nearsearch_where() {
    //만약 같은달 안에 다른 날짜인 생일이 있다면?
    let payload_in = [];
    let sameMnearday = 32;
    for(let i = 0; i<birth.length; i++){
      if(month == birth[i].month && req.body.where.indexOf(birth[i].where) != -1){
        if(date < birth[i].day && sameMnearday >= birth[i].day ){
          sameMnearday = birth[i].day;
        }
      }
    }
    let upperMnearmonth = 13;
    let upperMnearday = [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32];
    if(sameMnearday != 32){
      for(let i = 0; i<birth.length; i++){
        if(birth[i].month == month && birth[i].day == sameMnearday && req.body.where.indexOf(birth[i].where) != -1){
          payload_in.push(birth[i])
        }
      }
      date = sameMnearday;
      try {
        let check = true;
        for(let i = 0; i<payload_in.length; i++){
          for(let j = 0; j<payload.length; j++){
            for(let k = 0; k<payload[j].length; k++){
              if(payload[j][k].name == payload_in[i].name){
                check = false;
              }
            }
          }
        }
        if(check)
          payload.push(payload_in);
      } catch (e) {
        payload.push(payload_in);
      }

    }
    //같은 달 안에 없다면??
    //우선은 오늘날보다 큰 달 먼저 계산
    else {
      for(let i = 0; i<birth.length; i++){
        if(month < birth[i].month && birth[i].month <= upperMnearmonth && req.body.where.indexOf(birth[i].where) != -1){
          upperMnearmonth = birth[i].month;
          if(upperMnearday[birth[i].month] >= birth[i].day){
            upperMnearday[birth[i].month] = birth[i].day;
          }
        }
      }
      let lowerMnearmonth = 13;
      let lowerMnearday = [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32];
      if(upperMnearmonth != 13){
        for(let i = 0; i<birth.length; i++){
          if(birth[i].month == upperMnearmonth && birth[i].day == upperMnearday[upperMnearmonth] && req.body.where.indexOf(birth[i].where) != -1){
            payload_in.push(birth[i])
          }
        }

        month = upperMnearmonth;
        date = upperMnearday[upperMnearmonth];
        try {
          let check = true;
          for(let i = 0; i<payload_in.length; i++){
            for(let j = 0; j<payload.length; j++){
              for(let k = 0; k<payload[j].length; k++){
                if(payload[j][k].name == payload_in[i].name){
                  check = false;
                }
              }
            }
          }
          if(check)
            payload.push(payload_in);
        } catch (e) {
          payload.push(payload_in);
        }
      }
      //마지막으로 작은 달 계산
      else{
        for(let i = 0; i<birth.length; i++){
          if(month > birth[i].month && birth[i].month <= lowerMnearmonth && req.body.where.indexOf(birth[i].where) != -1){
            lowerMnearmonth = birth[i].month;
            if(lowerMnearday[birth[i].month] >= birth[i].day){
              lowerMnearday[birth[i].month] = birth[i].day;
            }
          }
        }
        for(let i = 0; i<birth.length; i++){
          if(birth[i].month == lowerMnearmonth && birth[i].day == lowerMnearday[lowerMnearmonth] && req.body.where.indexOf(birth[i].where) != -1){
            payload_in.push(birth[i]);
          }
        }
        month = lowerMnearmonth;
        date = lowerMnearday[lowerMnearmonth];
        try {
          let check = true;
          for(let i = 0; i<payload_in.length; i++){
            for(let j = 0; j<payload.length; j++){
              for(let k = 0; k<payload[j].length; k++){
                if(payload[j][k].name == payload_in[i].name){
                  check = false;
                }
              }
            }
          }
          if(check)
            payload.push(payload_in);
        } catch (e) {
          payload.push(payload_in);
        }
      }
    }
  }

}
