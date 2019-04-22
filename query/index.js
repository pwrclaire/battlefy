const fetch = require('node-fetch');

const header = {
  headers: {
    'X-Riot-Token': process.env.APIKEY
  }
}

const getSummoner = async (summoner, region) => {
  try {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`;
    const response = await fetch(url, header);
    const data = await response.json();
    return data;
  }
  catch(err) {
    throw new Error(err);
  }
}


const getMatches = async (summoner, region) => {
  try {
    // get latest 5 matches
    const summonerInfo = await getSummoner(summoner, region);
    const accountId = summonerInfo.accountId;
    const url = `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=5&beginIndex=0`;
    const response = await fetch(url, header);
    const data = await response.json();
    // returns a list of matches
    return data;
  } catch(err) {
    throw new Error(err);
  }
}

const getMatchDetail = async (summoner, region) => {
  try {
    // retuns a list of matches
    const matchInfo = await getMatches(summoner, region);
    const matchId = matchInfo.matches.map(m => m.gameId);
    const promise = matchId.map(async id => {
      return await fetch(`https://${region}.api.riotgames.com/lol/match/v4/matches/${id}`, header).then(resp => resp.json());
    })
    const result = await Promise.all(promise);
    return result;
  } catch (err) {
    throw new Error(err);
  }
}


module.exports = {
  getSummoner,
  getMatches,
  getMatchDetail
}