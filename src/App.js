import axios from 'axios';
import { useEffect, useState } from 'react';

import Header from './components/Header';
import Summoner from './components/Summoner';
import Mastery from './components/Mastery';
import Match from './components/Match';
import Error from './components/Error';

import { champUrl, endpoint } from './config';

import './App.css';

function App() {
  const [summonerData, setSummonerData] = useState(null);
  const [summonerMastery, setSummonerMastery] = useState(null);
  const [matchesId, setMatchesId] = useState(null);

  const [summonerError, setSummonerError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

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

  function getSummoner(e, summonerName) {
    e.preventDefault();

    if (summonerName === '') return;

    endpoint.get(`/summoner?summonerName=${summonerName}`)
    .then(response => {
      setSummonerError(false);
      setSummonerData(response.data);
      getMastery(response.data.id);
      getMatches(response.data.puuid);
    })
    .catch(error => {
      console.log(error);
      setSummonerError(true);
      setErrorInfo(error);
    });
  }

  function getMastery(id) {
    endpoint.get(`/masteries?summonerId=${id}`)
    .then(response => setSummonerMastery(response.data))
    .catch(error => {
      console.log(error);
      setSummonerError(true);
      setErrorInfo(error);
    })
  }

  function getMatches(id) {
    endpoint.get(`/matches?summonerPuuid=${id}`)
    .then(response => setMatchesId(response.data))
    .catch(error => {
      console.log(error);
      setSummonerError(true);
      setErrorInfo(error);
    })
  }

  return (
    <div className='App'>
      <Header getSummoner={getSummoner} />
      {summonerError ? (errorInfo && <Error err={errorInfo}/>) :
        <div className='wrapper'>
          {summonerData && (
            <>
              <Summoner data={summonerData}/>
              <hr style={{opacity: .8}}/>
              <section className='summoner-content'>
                {matchesId && (
                  <div className='match-list'>
                    <h2>Últimas partidas</h2>
                    {matchesId.map(id => <Match key={id} summonerId={summonerData.puuid} matchId={id} champions={champions}/>)}
                  </div>)}
                {summonerMastery && (
                  <div className='mastery-list'>
                    <h2 style={{textAlign: 'center'}}>Maestrias</h2>
                    <Mastery data={summonerMastery} champions={champions}/>
                  </div>)}
              </section>
            </>
          )}
        </div>
      }
    </div>
  );
}

export default App;
