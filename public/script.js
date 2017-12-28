window.onload = () => {
  const today = new Date();
  const soonbirth = document.getElementById('c_soonbirth');
  const soonbirth_li = document.getElementById('c_soonbirth_li');
  const soonbirth_img = document.getElementById('c_soonbirth_img');
  const currentbirth = document.getElementById('c_currentbirth');
  const currentbirth_li = document.getElementById('c_currentbirth_li');
  const currentbirth_img = document.getElementById('c_currentbirth_img');
  const first_page = document.getElementById('firstPage');
  const second_page = document.getElementById('secondPage');
  const err = document.getElementById('windw_err');
  const fixed_btn = document.getElementById('upsidedown');
  const rad = document.whereform.whereselect;
  const HOW_MANY_NEAR = 3;
  let prev = null;
  let isFirst = true;


  if(window.innerHeight <= 520 || window.innerWidth <= 310){
    soonbirth.style.display = 'none'
    currentbirth.style.display = 'none'
    err.style.display = 'block'
  }else
  {
    soonbirth.style.display = 'block'
    currentbirth.style.display = 'block'
    err.style.display = 'none'
  }
  first_page.style.height = (window.innerHeight-55)+'px'
  secondPage.style.height = window.innerHeight+'px'

  window.onresize = function(event) {
    if(window.innerHeight <= 520 || window.innerWidth <= 310){
      soonbirth.style.display = 'none'
      currentbirth.style.display = 'none'
      err.style.display = 'block'
    }else
    {
      soonbirth.style.display = 'block'
      currentbirth.style.display = 'block'
      err.style.display = 'none'
    }
    first_page.style.height = (window.innerHeight-55)+'px'
    secondPage.style.height = window.innerHeight+'px'
  };

  window.onscroll = function(event){
    console.log(window.scrollY);
    console.log(window.innerHeight);
    if(window.scrollY>=window.innerHeight/2){
      isFirst = false;
      fixed_btn.src = "asset/img/goup.png"
    }
    else{
      isFirst = true;
      fixed_btn.src = "asset/img/godown.png"
    }
  }

  fixed_btn.onclick = function(event){
    isUpside(isFirst)
  }
  function isUpside(p0){
    if(p0){
      $(document).scrollTop(document.body.scrollHeight);
      //$("body").animate({scrollTop: document.body.scrollHeight}, 680);
      isFirst = false;
      fixed_btn.src = "asset/img/goup.png"
    }
    else{
      $(document).scrollTop(0);
      //$("body").animate({scrollTop: '0'}, 680);
      isFirst = true;
      fixed_btn.src = "asset/img/godown.png"
    }
  }

  //where 0:765본가 1:765밀리 2:961레온,시이카 3:876디어리스타즈 4:346신데마스 5:315사이도엠 6:아키즈키료 특별
  function whereIs(num){
    switch (num) {
      case 0:
        return("765프로덕션 올스타즈(본가)");
      case 1:
        return("765프로덕션 시어터(밀리마스)");
      case 2:
        return("876프로덕션(디어리 스타즈)");
      case 3:
        return("346프로덕션(신데렐라 걸즈)");
      case 4:
        return("315프로덕션(sideM),<br>876프로덕션(디어리 스타즈)");
      default:
        return("소속 오류");
    }
  }
  //@media screen and (max-width:1024px) {



  //주소의 w를 get해옴
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
  //분류 체크박스 관리
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
  //오늘 생일인 아이돌 불러오기
  loadJSON_current(today.getMonth() + 1, today.getDate(), '/api/posts/day', getWhere, (response) => {
    const birth = JSON.parse(response)
    let count = 0
    if(~Object.keys(birth).indexOf('log')){
      currentbirth_li.innerHTML += '<li data-target="#c_currentbirth" data-slide-to="0" class="active"></li>'
      currentbirth_img.innerHTML += '<div class="carousel-item active" style="background-color : #bbbbbb">\
        <img class="d-block img_h" src="asset/img/x_icon.png" alt="none">\
        <div class="carousel-caption d-md-block img_data">\
          <h3>아이돌이 없습니다!</h3>\
          <p>분류를 바꿔 보시거나<br>아래 더보기를 누르세요</p>\
        </div>\
      </div>'
    }
    for(let i = 0; i<birth.length; i++){
      if(i == 0){
        currentbirth_li.innerHTML += '<li data-target="#c_currentbirth" data-slide-to="' + count + '" class="active"></li>'
        count += 1;
        currentbirth_img.innerHTML += '<div class="carousel-item active" style="background-color : ' + birth[i].color + '">\
          <img class="d-block img_h" src="' + birth[i].img + '" alt="' + birth[i].name + '">\
          <div class="carousel-caption d-md-block img_data">\
            <h4>' + birth[i].name + '</h4>\
            <p>' + whereIs(birth[i].where) + '<br>' + birth[i].month + '월 ' + birth[i].day + '일' + '</p>\
          </div>\
        </div>'
      }else {
        currentbirth_li.innerHTML += '<li data-target="#c_currentbirth" data-slide-to="' + count + '"></li>'
        count += 1;
        currentbirth_img.innerHTML += '<div class="carousel-item" style="background-color : ' + birth[i].color + '">\
          <img class="d-block img_h" src="' + birth[i].img + '" alt="' + birth[i].name + '">\
          <div class="carousel-caption d-md-block img_data">\
            <h4>' + birth[i].name + '</h4>\
            <p>' + whereIs(birth[i].where) + '<br>' + birth[i].month + '월 ' + birth[i].day + '일' + '</p>\
          </div>\
        </div>'

      }
    }
    $('.carousel').carousel();
  });
  //곧 생일인 아이돌 불러오기
  loadJSON_near(today.getMonth() + 1, today.getDate(), '/api/posts/day_near', getWhere, (response) => {
    const birth = JSON.parse(response)
    let count = 0
    for(let i = 0; i<birth.length; i++){
      for(let j = 0; j<birth[i].length; j++){
        if(i == 0 && j == 0){
          soonbirth_li.innerHTML += '<li data-target="#c_soonbirth" data-slide-to="' + count + '" class="active"></li>'
          count += 1;
          soonbirth_img.innerHTML += '<div class="carousel-item active" style="background-color : ' + birth[i][j].color + '">\
            <img class="d-block img_h" src="' + birth[i][j].img + '" alt="' + birth[i][j].name + '">\
            <div class="carousel-caption d-md-block img_data">\
              <h4>' + birth[i][j].name + '</h4>\
              <p>' + whereIs(birth[i][j].where) + '<br>' + birth[i][j].month + '월 ' + birth[i][j].day + '일' + '</p>\
            </div>\
          </div>'
        }else {
          soonbirth_li.innerHTML += '<li data-target="#c_soonbirth" data-slide-to="' + count + '"></li>'
          count += 1;
          soonbirth_img.innerHTML += '<div class="carousel-item" style="background-color : ' + birth[i][j].color + '">\
            <img class="d-block img_h" src="' + birth[i][j].img + '" alt="' + birth[i][j].name + '">\
            <div class="carousel-caption d-md-block img_data">\
              <h4>' + birth[i][j].name + '</h4>\
              <p>' + whereIs(birth[i][j].where) + '<br>' + birth[i][j].month + '월 ' + birth[i][j].day + '일' + '</p>\
            </div>\
          </div>'
        }
      }
    }
    $('.carousel').carousel();
  });


  //사용자 함수들
  function loadJSON_current(month, day, url ,where, callback) {
    var xobj = new XMLHttpRequest();
    xobj.open('POST', url, true);
    xobj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send('month=' + month + '&day=' + day + '&where=' + where);
  }
  function loadJSON_near(month, day, url, where, callback) {
    var xobj = new XMLHttpRequest();
    xobj.open('POST', url, true);
    xobj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send('month=' + month + '&day=' + day + '&where=' + where + '&index=' + HOW_MANY_NEAR);
  }
}
