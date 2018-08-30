const express = require('express');
const axios = require('axios');
var morgan = require('morgan');
const app = express();

const cache = {};
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.use(morgan('dev'));
app.get('/', function(req, res){
        var movieId = req.query;
        var key = Object.keys(movieId);
        var value = Object.values(movieId);
        var url = 'http://www.omdbapi.com/?apikey=8730e0e&'  + key + '=' + encodeURI(value);
        
        if (cache.hasOwnProperty(value)){
            res.json(cache[value]);
        } else {
            console.log(cache);
            axios.get(url)
            .then(response => { 
                cache[value] =  response.data;
                res.send(response.data);
            }).catch(err => res.json(err.message));
        }
});
module.exports = app;