// file for accessing riot games api
var rp = require('request-promise');
var secrets = require('../secrets/keys.js');
var Promise = require('bluebird');
var champInfo = require('./champID.js');


var forExport = {

  // GET request for getting summoner id from summoner name
  getData: function(region, summonerName, req, res){
    var lib = {}
    rp('https://'+region+'.api.pvp.net/api/lol/'+region+'/v1.4/summoner/by-name/'+summonerName+'?api_key='+secrets.apiKey)
    .catch(function(error){
      console.log("ERROR: ", error);
      res.render('index', {error: 'username not found'});
      return;
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
      res.render('index', {error: 'username not found'});
      return;
    })
    .then(function(body){
      body = JSON.parse(body);
      var championMasteryData = body;

    rp('https://'+oldRegion+'.api.pvp.net/api/lol/'+oldRegion+'/v1.3/stats/by-summoner/'+summonerID+'/ranked?season=SEASON2016&api_key='+secrets.apiKey)
    .catch(function(error){
      console.log("ERROR: ", error);
      res.render('index', {error: 'username not found'});
      return;
    })
    .then(function(body){
      body = JSON.parse(body);
      var rankedData = body;

      // console.log("CHAMP: ", championMasteryData);
      // console.log("RANK: ", rankedData.champions);

      var usefulRank = {};

      for (var i = 0; i < rankedData.champions.length; i++){
        usefulRank[rankedData.champions[i].id] = {
          rankedWins: rankedData.champions[i].stats['totalSessionsWon'], 
          rankedLosts: rankedData.champions[i].stats['totalSessionsLost']
        }
      }

      // console.log(usefulRank);

      var playedThisSeason = {};

      championMasteryData.map(function(champ){
        champ['rankedWins'] = usefulRank[champ.championId]? usefulRank[champ.championId].rankedWins : undefined;
        champ['rankedLosts'] = usefulRank[champ.championId]? usefulRank[champ.championId].rankedLosts : undefined;
        champ['name'] = champInfo[champ.championId]['name'];
        champ['key'] = champInfo[champ.championId]['key'];
        champ['title'] = champInfo[champ.championId]['title'];

        if (champ['championLevel'] >= 4){
          champ['championLevel'] = true;
        } else {
          champ['championLevel'] = false;
        }

        playedThisSeason[champ.championId] = true;
        return champ;
      })

      // console.log(playedThisSeason);
      // console.log(championMasteryData);

      for (var ID in champInfo){
        if (playedThisSeason[ID] === undefined){
          championMasteryData.push({
            championId: ID, 
            name: champInfo[ID]['name'], 
            key: champInfo[ID]['key'], 
            title: champInfo[ID]['title'], 
          })
        }
      }
      
      var forRender = {};
      forRender.championMasteryData = championMasteryData;
      forRender.summonerName = summonerName;
      console.log(forRender);

      res.render('summoner', {forRender: forRender});

    })
    })
    })
    

  }


}

// console.log(forExport.getData('na', 'imarker'));

module.exports = forExport;


