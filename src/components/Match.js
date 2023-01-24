import { useEffect, useState } from 'react';

import { regionalEndpoint } from '../config.js';
import { champIconsUrl, itemIconUrl } from '../config.js';

import './Match.css';

function Match({summonerId, champions}) {
    const [matchIds, setMatchIds] = useState([]);
    const [matchesData, setMatchesData] = useState(null);

    useEffect(() => {
        regionalEndpoint.get(`/lol/match/v5/matches/by-puuid/${summonerId}/ids?start=0&count=10`)
        .then(response => {
            setMatchIds(response.data);
            return Promise.all(response.data.map(matchId => regionalEndpoint.get(`/lol/match/v5/matches/${matchId}`)));
        }).then(response => {
            console.log(response.map(e => e.data));
            setMatchesData(response.map(e => e.data))
        });
    },[]);

    console.log('teste');

    return (
        <>
        { matchesData && matchesData.map(match => {
            return (
                <div key={match.metadata.matchId} className={`match ${match.info.participants[2].win ? 'victory' : 'defeat'}`}>
                    <img
                        src={`${champIconsUrl}/${champions[match.info.participants[2].championId].image.full}`}
                        alt='champion'
                    />
                    <div className='match-items'>
                        <img src={`${itemIconUrl}/${match.info.participants[2].item0}.png`} alt="item"/>
                        <img src={`${itemIconUrl}/${match.info.participants[2].item1}.png`} alt="item"/>
                        <img src={`${itemIconUrl}/${match.info.participants[2].item2}.png`} alt="item"/>
                        <img src={`${itemIconUrl}/${match.info.participants[2].item3}.png`} alt="item"/>
                        <img src={`${itemIconUrl}/${match.info.participants[2].item4}.png`} alt="item"/>
                        <img src={`${itemIconUrl}/${match.info.participants[2].item6}.png`} alt="item"/>
                    </div>
                    <p className='match-result'>{match.info.participants[2].win ? 'Vitória' : 'Derrota'}</p>
                    <div className='match-info'>
                        <p>12/07/15</p>
                        <p>33:07</p>
                    </div>
                </div>
            );
        })
        }
        </>
    );
}

export default Match;