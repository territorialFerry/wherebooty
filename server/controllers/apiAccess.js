// file for accessing riot games api
var rp = require('request-promise');
var secrets = require('../secrets/keys.js');
var Promise = require('bluebird');
var champInfo = require('./champID.js');


var forExport = {

  // GET request for getting summoner id from summoner name
  getData: function(region, summonerName){
    var lib = {}
    rp('https://'+region+'.api.pvp.net/api/lol/'+region+'/v1.4/summoner/by-name/'+summonerName+'?api_key='+secrets.apiKey)
    .catch(function(error){
      console.log("ERROR: ", error);
    })
    .then(function(body){
      body = JSON.parse(body);
      return body;
    })
    .then(function(body){
      var summonerID = body[summonerName]['id'];
      var oldRegion = region;
      var newRegion = region;
      if (!(region === 'kr' || region === 'ru')){
        newRegion = region + '1';
      }

      // console.log("SUMMONERID: ", summonerID);
      // console.log("OLDREGION: ", oldRegion);
      // console.log("NEWREGION: ", newRegion);

    rp('https://'+oldRegion+'.api.pvp.net/championmastery/location/'+newRegion+'/player/'+summonerID+'/topchampions?count=200&api_key='+secrets.apiKey)
    .catch(function(error){
      console.log("ERROR: ", error);
    })
    .then(function(body){
      body = JSON.parse(body);
      // console.log(body);

    rp('https://'+oldRegion+'.api.pvp.net/api/lol/'+oldRegion+'/v1.3/stats/by-summoner/'+summonerID+'/ranked?season=SEASON2016&api_key='+secrets.apiKey)
    .catch(function(error){
      console.log("ERROR: ", error);
    })
    .then(function(body){
      console.log(body);
    })
    })
    })
    

  }


  // GET request for getting top champions by playerID 

  // GET request for getting ranked stats by playerID

  // (maybe) GET request for most recent match data to grab championID for picture

  // (maybe) GET request for static data on most recent champID


}

console.log(forExport.getData('na', 'vokoshyv'));

module.exports = forExport;


