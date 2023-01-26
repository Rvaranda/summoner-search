import { useEffect, useState } from 'react';

import { regionalEndpoint } from '../config.js';
import { champIconsUrl, itemIconUrl } from '../config.js';

import './Match.css';

function Match({summonerId, champions}) {
    const [matchIds, setMatchIds] = useState([]);
    // const matchesData = useMatch(summonerId, 0, 3);
    const [matchesData, setMatchesData] = useState(null);

    useEffect(() => {
        regionalEndpoint.get(`/lol/match/v5/matches/by-puuid/${summonerId}/ids?start=0&count=3`)
        .then(response => Promise.all(response.data.map(matchId => regionalEndpoint.get(`/lol/match/v5/matches/${matchId}`))))
        .then(response => {
            const summonerMatches = [];
            const matches = response.map(e => e.data);
            matches.forEach(match => match.info.participants.forEach((part, index) => {
                if (summonerId === part.puuid) summonerMatches.push({summonerIndex: index, match: match});
            }));
            setMatchesData(summonerMatches);
        });
    }, []);

    return (
        <>
        { matchesData && matchesData.map(match => {
            return (
                <div key={match.match.metadata.matchId} className={`match ${match.match.info.participants[match.summonerIndex].win ? 'victory' : 'defeat'}`}>
                    <img
                        src={`${champIconsUrl}/${champions[match.match.info.participants[match.summonerIndex].championId].image.full}`}
                        alt='champion'
                    />
                    <div className='match-items'>
                        {match.match.info.participants[match.summonerIndex].item0 === 0 ? 
                            <div style={{display: 'inline-block', width: '40px', height: '40px', backgroundColor: '#050505'}}></div> :
                            <img src={`${itemIconUrl}/${match.match.info.participants[match.summonerIndex].item0}.png`} alt="item"/>}
                        {match.match.info.participants[match.summonerIndex].item1 === 0 ? 
                            <div style={{display: 'inline-block', width: '40px', height: '40px', backgroundColor: '#050505'}}></div> :
                            <img src={`${itemIconUrl}/${match.match.info.participants[match.summonerIndex].item1}.png`} alt="item"/>}
                        {match.match.info.participants[match.summonerIndex].item2 === 0 ? 
                            <div style={{display: 'inline-block', width: '40px', height: '40px', backgroundColor: '#050505'}}></div> :
                            <img src={`${itemIconUrl}/${match.match.info.participants[match.summonerIndex].item2}.png`} alt="item"/>}
                        {match.match.info.participants[match.summonerIndex].item3 === 0 ? 
                            <div style={{display: 'inline-block', width: '40px', height: '40px', backgroundColor: '#050505'}}></div> :
                            <img src={`${itemIconUrl}/${match.match.info.participants[match.summonerIndex].item3}.png`} alt="item"/>}
                        {match.match.info.participants[match.summonerIndex].item4 === 0 ? 
                            <div style={{display: 'inline-block', width: '40px', height: '40px', backgroundColor: '#050505'}}></div> :
                            <img src={`${itemIconUrl}/${match.match.info.participants[match.summonerIndex].item4}.png`} alt="item"/>}
                        {match.match.info.participants[match.summonerIndex].item5 === 0 ? 
                            <div style={{display: 'inline-block', width: '40px', height: '40px', backgroundColor: '#050505'}}></div> :
                            <img src={`${itemIconUrl}/${match.match.info.participants[match.summonerIndex].item5}.png`} alt="item"/>}
                        {match.match.info.participants[match.summonerIndex].item6 === 0 ? 
                            <div style={{display: 'inline-block', width: '40px', height: '40px', backgroundColor: '#050505'}}></div> :
                            <img src={`${itemIconUrl}/${match.match.info.participants[match.summonerIndex].item6}.png`} alt="item"/>}
                    </div>
                    <p className='match-result'>{match.match.info.participants[match.summonerIndex].win ? 'Vitória' : 'Derrota'}</p>
                    <div className='match-info'>
                        <p>{`${new Date(match.match.info.gameCreation).getDate()}/${new Date(match.match.info.gameCreation).getMonth()}/${new Date(match.match.info.gameCreation).getFullYear()}`}</p>
                        <p>{`${new Date(match.match.info.gameDuration * 1000).getMinutes()}:${new Date(match.match.info.gameDuration * 1000).getSeconds()}`}</p>
                    </div>
                </div>
            );
        })
        }
        </>
    );
}

export default Match;