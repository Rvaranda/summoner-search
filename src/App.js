import axios from 'axios';
import { useEffect, useState } from 'react';

import Summoner from './components/Summoner';
import Mastery from './components/Mastery';
import { champIconsUrl, champUrl, endpoint, regionalEndpoint } from './config';
import './App.css';
import Match from './components/Match';

const user = 'glutão anônimo';

function App() {
  const [summonerData, setSummonerData] = useState(null);
  const [summonerMastery, setSummonerMastery] = useState(null);
  const [summonerName, setSummonerName] = useState('');
  const [matchesId, setMatchesId] = useState(null);

  const [summonerError, setSummonerError] = useState(false);

  const [champions, setChampions] = useState(null);

  useEffect(() => {
    axios.get(`${champUrl}.json`)
    .then(response => {
      let obj = response.data.data;
      let newObj = {};
      for (let x in obj) {
        newObj[obj[x].key] = obj[x];
      }
      setChampions(newObj);
    });
  }, []);

  function getSummoner(e) {
    e.preventDefault();

    if (summonerName === '') return;

    endpoint.get(`/lol/summoner/v4/summoners/by-name/${summonerName}`)
    .then(response => {
      setSummonerError(false);
      setSummonerData(response.data);
      getMastery(response.data.id);
      getMatches(response.data.puuid);
    })
    .catch(error => {
      console.log(error);
      setSummonerError(true)
    });
  }

  function getMastery(id) {
    endpoint.get(`/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}/top?count=10`)
    .then(response => setSummonerMastery(response.data))
    .catch(error => {
      console.log(error);
      setSummonerError(true);
    })
  }

  function getMatches(id) {
    regionalEndpoint.get(`/lol/match/v5/matches/by-puuid/${id}/ids?start=0&count=10`)
    .then(response => setMatchesId(response.data))
    .catch(error => {
      console.log(error);
      setSummonerError(true);
    })
  }

  return (
    <div className='App'>
      <form>
        <div className='form-search'>
          <input
            type='text'
            value={summonerName}
            onChange={e => setSummonerName(e.target.value)}
          />
          <button type='submit' onClick={(e) => getSummoner(e)}>Pesquisar</button>
        </div>
      </form>
      {summonerError ? <h1 style={{textAlign: 'center'}}>Invocador não encontrado</h1> :
        <div className='wrapper'>
          {summonerData && (
            <>
              <Summoner data={summonerData}/>
              <hr style={{opacity: 0.6}}/>
              {matchesId && (
                <div className='match-list'>
                  <h2>Últimas partidas</h2>
                  {matchesId.map(id => <Match key={id} summonerId={summonerData.puuid} matchId={id} champions={champions}/>)}
                </div>)}
              {summonerMastery && 
                <Mastery data={summonerMastery} champions={champions}/>}
            </>
          )}
        </div>
      }
    </div>
  );
}

export default App;
