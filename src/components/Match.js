import { useEffect, useState } from 'react';

import { regionalEndpoint } from '../config.js';
import { champIconsUrl, itemIconUrl } from '../config.js';

import './Match.css';

function Match({summonerId, matchId, champions}) {
    const [matchData, setMatchData] = useState(null);
    const [summoner, setSummoner] = useState(null);

    useEffect(() => {
        regionalEndpoint.get(`/lol/match/v5/matches/${matchId}`)
        .then(response => {
            response.data.info.participants.forEach(element => {
                if (element.puuid === summonerId) setSummoner(element);
            });
            setMatchData(response.data);
        });
    }, []);

    return (
        <>
        {(matchData && summoner) &&
        <div className={`match ${summoner.win ? 'victory' : 'defeat'}`}>
            <img
                src={`${champIconsUrl}/${champions[summoner.championId].image.full}`}
                alt='champ'
            />
            <div className='match-items'>
                {summoner.item0 === 0 ? <div className='no-item'></div> : <img src={`${itemIconUrl}/${summoner.item0}.png`} alt='item'/>}
                {summoner.item1 === 0 ? <div className='no-item'></div> : <img src={`${itemIconUrl}/${summoner.item1}.png`} alt='item'/>}
                {summoner.item2 === 0 ? <div className='no-item'></div> : <img src={`${itemIconUrl}/${summoner.item2}.png`} alt='item'/>}
                {summoner.item3 === 0 ? <div className='no-item'></div> : <img src={`${itemIconUrl}/${summoner.item3}.png`} alt='item'/>}
                {summoner.item4 === 0 ? <div className='no-item'></div> : <img src={`${itemIconUrl}/${summoner.item4}.png`} alt='item'/>}
                {summoner.item5 === 0 ? <div className='no-item'></div> : <img src={`${itemIconUrl}/${summoner.item5}.png`} alt='item'/>}
                {summoner.item6 === 0 ? <div className='no-item'></div> : <img src={`${itemIconUrl}/${summoner.item6}.png`} alt='item'/>}
            </div>
            <p className='match-result'>{summoner.win ? 'Vitória' : 'Derrota'}</p>
            <div className='match-info'>
                <p>Duração</p>
                <p>Data</p>
            </div>
        </div>
        }
        </>
    );
}

export default Match;