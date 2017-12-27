window.onload = () => {
  const today = new Date();
  const todayShow = document.getElementById('todayBirth');
  const soonShow = document.getElementById('soonBirth');
  const allShow = document.getElementById('allshow');
  const img_allshow = document.getElementById('allshow_with_img');
  const nonimg_allshow = document.getElementById('allshow_without_img');
  const fold_allshow = document.getElementById('allshow_fold');
  const rad = document.whereform.whereselect;
  const HOW_MANY_NEAR = 3;
  let prev = null;
  //where 0:765본가 1:765밀리 2:961레온,시이카 3:876디어리스타즈 4:346신데마스 5:315사이도엠 6:아키즈키료 특별
  function whereIs(num){
    switch (num) {
      case 0:
        return("765프로덕션 올스타즈(본가) 소속");
      case 1:
        return("765프로덕션 시어터(밀리마스) 소속");
      case 2:
        return("876프로덕션(디어리 스타즈) 소속");
      case 3:
        return("346프로덕션(신데렐라 걸즈) 소속");
      case 4:
        return("315프로덕션(sideM),<br>876프로덕션(디어리 스타즈) 이중 소속");
      default:
        return("소속 오류");
    }
  }

  let getWhere = ["0","1","2","3","4"];
  const url = location.href;
  const parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
  for (var i = 0; i < parameters.length; i++) {
      const varName = parameters[i].split('=')[0];
      if (varName.toUpperCase() == 'W') {
          const returnValue = parameters[i].split('=')[1];
          getWhere = returnValue.split(',');
      }
  }

  for(let i = 0; i < rad.length; i++){
    if(getWhere.indexOf(rad[i].value) != -1)
      rad[i].checked = true;
    rad[i].onclick = function() {
        if(this !== prev) {
          let payload = [];
          for(let i = 0; i < rad.length; i++){
            if(rad[i].checked)
            payload.push(i);
          }
          if(payload == "0,1,2,3,4")
            location.href = '/'
          else
            location.href = '/?w='+payload
        }
    };
  }
  loadJSON_current('/api/posts/day', getWhere, (response) => {
    const birth = JSON.parse(response)
    let payload = ''
    for(let i = 0; i<birth.length; i++)
      payload += '<div class="idolbox" style="background-color:' + birth[i].color + '"><img src="' + birth[i].img + '"><br>' + birth[i].name + '<br>' + whereIs(birth[i].where) + '<br>' + birth[i].month + '월 ' + birth[i].day + '일' + '</div>';
    if(~Object.keys(birth).indexOf('log'))
      todayShow.innerHTML = "오늘 생일인 아이돌이 없습니다!";
    else
      todayShow.innerHTML = payload;
  });
  loadJSON_near('/api/posts/day_near', getWhere, (response) => {
    const birth = JSON.parse(response)
    let payload = ''
    for(let i = 0; i<birth.length; i++){
      for(let j = 0; j<birth[i].length; j++)
        payload += '<div class="idolbox" style="background-color:' + birth[i][j].color + '"><img src="' + birth[i][j].img + '"><br>' + birth[i][j].name + '<br>' + whereIs(birth[i][j].where) + '<br>' + birth[i][j].month + '월 ' + birth[i][j].day + '일' + '</div>';
      payload += '<br>'
    }
    soonShow.innerHTML = payload;
  });

  img_allshow.onclick = () => {
    allShow.innerHTML = "";
    loadJSON_all('/api/get/all', (response) => {
      const birth = JSON.parse(response)
      for(let i = 0; i<birth.length; i++)
        allShow.innerHTML += '<div class="idolbox" style="background-color:' + birth[i].color + '"><img src="' + birth[i].img + '"><br>' + birth[i].name + '<br>' + whereIs(birth[i].where) + '<br>' + birth[i].month + '월 ' + birth[i].day + '일' + '</div>';
    });
  };
  nonimg_allshow.onclick = () => {
    allShow.innerHTML = "";
    loadJSON_all('/api/get/all', (response) => {
      const birth = JSON.parse(response)
      for(let i = 0; i<birth.length; i++)
        allShow.innerHTML += '<div class="nonimgidolbox" style="background-color:' + birth[i].color + '">' + birth[i].name + '<br>' + whereIs(birth[i].where) + '<br>' + birth[i].month + '월 ' + birth[i].day + '일' + '</div>';
    });
  };
  fold_allshow.onclick = () => {
    allShow.innerHTML = "";
  };

  function loadJSON_current(url ,where, callback) {
    var xobj = new XMLHttpRequest();
    xobj.open('POST', url, true);
    xobj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send('month=' + (today.getMonth() + 1) + '&day=' + today.getDate() + '&where=' + where);
  }
  function loadJSON_near(url, where, callback) {
    var xobj = new XMLHttpRequest();
    xobj.open('POST', url, true);
    xobj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send('month=' + (today.getMonth() + 1) + '&day=' + today.getDate() + '&where=' + where + '&index=' + HOW_MANY_NEAR);
  }
  function loadJSON_all(url, callback) {
    var xobj = new XMLHttpRequest();
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }
}
