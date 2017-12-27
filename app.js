const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const http = require('http').Server(app)
const birth = require('./routes/posts/data.json');

app.use('/', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended : true,
}));

app.get('/api/get/all', (req, res) => {
    res.send(birth).end()
});

//이름 검색 '/api/posts/name'
// name:이름 where:소속(전체일경우-1)
//날짜 검색 '/api/posts/day'
// month:월 day:날짜 where:소속(전체일경우-1)
//날짜 검색 '/api/posts/day_near'
// month:월 day:날짜 where:소속(전체일경우-1) index:몇명까지(생일 같으면 1명으로 취급)
app.use('/api/posts', require('./routes/posts'));

app.get('*', (req, res) => {
    res.status(404).end();
});

app.listen(765, () => {
    console.log('localhost:80 에서 실행중');
});
