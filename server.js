const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var port = process.env.PORT || 4000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', function() {
    return new Date().getFullYear();
});
hbs.registerHelper('uppercase', function(text) {
    return text.toUpperCase();
});


app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date();
    var log = `${now}, ${req.method}, ${req.url}, ${req.ip}\r\n`;

    console.log(log);
    fs.appendFile('server.log', log);
    next();
});

/*
app.use((req, res, next)=>{
    res.render('maintenance');
});
*/

app.use('/static', express.static(__dirname+ '/public'));

app.get('/', (req, res)=>{
    res.render('home',{
        page: {
            title: 'Home Page',
            text: 'This is a test site for learning Node.js and Express.',
        }
    });
});

app.get('/about', (req, res)=>{

    res.render('page', {
        page: {
            title: 'About Page',
            text: 'This is a page where I will tell you - more about - me.',
        }
    });
});

app.get('/portfolio', (req, res)=>{

    res.render('page', {
        page: {
            title: 'Portfolio Page',
            text: 'Information on projects will go here.',
        }
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        error: {
            message: 'This page is bad'
        }

    });
});

app.listen(port, ()=>{
    console.log(`Server is up. Listening on port ${port}`);
});