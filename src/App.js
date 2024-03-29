import axios from 'axios';
import { useEffect, useState } from 'react';

import Header from './components/Header';
import Summoner from './components/Summoner';
import Mastery from './components/Mastery';
import Match from './components/Match';
import Error from './components/Error';
import LoadingIcon from './components/LoadingIcon';
import Welcome from './components/Welcome';

import { champUrl, endpoint } from './config';

import './App.css';

function App() {
  const [summonerData, setSummonerData] = useState(null);
  const [summonerMastery, setSummonerMastery] = useState(null);

  const [matchesId, setMatchesId] = useState(null);
  const [matchesDetails, setMatchesDetails] = useState(null);

  const [summonerError, setSummonerError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  const [champions, setChampions] = useState(null);

  const [loading, setLoading] = useState(false);

  const [showWelcomeMsg, setShowWelcomeMsg] = useState(true);

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

  async function getSummonerData(e, summonerName) {
    e.preventDefault();

    if (summonerName === '') return;

    setShowWelcomeMsg(false);
    setLoading(true);

    try {
      const response = await endpoint.get(`/summoner?summonerName=${summonerName}`);
      const masteriesResponse = await endpoint.get(`/masteries?summonerId=${response.data.id}`);
      const matchesResponse = await endpoint.get(`/matches?summonerPuuid=${response.data.puuid}`);

      const matchesDetailsResponse = await Promise.all(matchesResponse.data.map(element => {
        return endpoint.get(`/match?matchId=${element}`);
      }));

      setSummonerData(response.data);
      setSummonerMastery(masteriesResponse.data);
      setMatchesId(matchesResponse.data);
      setMatchesDetails(matchesDetailsResponse.map(element => element.data));

      setSummonerError(false);
    }
    catch (err) {
      console.log(err);
      setSummonerError(true);
      setErrorInfo(err);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='App'>
      <Header loading={loading} getSummonerData={getSummonerData} />
      {showWelcomeMsg && <Welcome />}
      {loading ? <LoadingIcon /> :
        <>
          {summonerError ? <Error err={errorInfo} /> :
            <div className='wrapper'>
              {summonerData && (
                <>
                  <Summoner data={summonerData} />
                  <hr style={{ opacity: .8 }} />
                  <section className='summoner-content'>
                    {matchesId && (
                      <div className='match-list'>
                        <h2>Últimas partidas</h2>
                        {matchesDetails.map(match => <Match key={match.metadata.matchId} summonerId={summonerData.puuid} matchDetail={match} champions={champions} />)}
                      </div>)}
                    {summonerMastery && (
                      <div className='mastery-list'>
                        <h2 style={{ textAlign: 'center' }}>Maestrias</h2>
                        <Mastery data={summonerMastery} champions={champions} />
                      </div>)}
                  </section>
                </>
              )}
            </div>
          }
        </>
      }
    </div>
  );
}

export default App;
