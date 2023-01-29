import { useEffect, useState } from 'react';

import { regionalEndpoint } from '../config.js';
import { champIconsUrl, itemIconUrl } from '../config.js';

import styles from './css/Match.module.css';

function Match({summonerId, matchId, champions}) {
    const [matchData, setMatchData] = useState(null);
    const [duration, setDuration] = useState(null);
    const [creationDate, setCreationDate] = useState(null);
    const [summoner, setSummoner] = useState(null);

    useEffect(() => {
        regionalEndpoint.get(`/lol/match/v5/matches/${matchId}`)
        .then(response => {
            response.data.info.participants.forEach(element => {
                if (element.puuid === summonerId) setSummoner(element);
            });

            let created = new Date(response.data.info.gameCreation);

            // gameDuration está em segundos, entao multiplica por 1000 para passar para milisegundos
            let dur = new Date(response.data.info.gameDuration * 1000)

            setMatchData(response.data);
            setCreationDate({
                day: created.getDate() < 10 ? `0${created.getDate()}` : created.getDate(),
                month: created.getMonth()+1 < 10 ? `0${created.getMonth()+1}` : created.getMonth()+1,
                year: created.getFullYear()
            });
            setDuration({
                minutes: dur.getMinutes() < 10 ? `0${dur.getMinutes()}` : dur.getMinutes(),
                seconds: dur.getSeconds() < 10 ? `0${dur.getSeconds()}` : dur.getSeconds(),
             });
        });
    }, []);

    return (
        <>
        {(matchData && summoner) &&
        <div className={styles.match}>
            <div className={styles[summoner.win ? 'victory' : 'defeat']}></div>
            <img
                src={`${champIconsUrl}/${champions[summoner.championId].image.full}`}
                alt='champ'
            />
            <div className={styles.matchItems}>
                {summoner.item0 === 0 ? <div className={styles.noItem}></div> : <img src={`${itemIconUrl}/${summoner.item0}.png`} alt='item'/>}
                {summoner.item1 === 0 ? <div className={styles.noItem}></div> : <img src={`${itemIconUrl}/${summoner.item1}.png`} alt='item'/>}
                {summoner.item2 === 0 ? <div className={styles.noItem}></div> : <img src={`${itemIconUrl}/${summoner.item2}.png`} alt='item'/>}
                {summoner.item3 === 0 ? <div className={styles.noItem}></div> : <img src={`${itemIconUrl}/${summoner.item3}.png`} alt='item'/>}
                {summoner.item4 === 0 ? <div className={styles.noItem}></div> : <img src={`${itemIconUrl}/${summoner.item4}.png`} alt='item'/>}
                {summoner.item5 === 0 ? <div className={styles.noItem}></div> : <img src={`${itemIconUrl}/${summoner.item5}.png`} alt='item'/>}
                {summoner.item6 === 0 ? <div className={styles.noItem}></div> : <img src={`${itemIconUrl}/${summoner.item6}.png`} alt='item'/>}
            </div>
            <p className={styles.matchResult}>{summoner.win ? 'Vitória' : 'Derrota'}</p>
            <p className={styles.matchKda}>
                {`${summoner.kills < 10 ? '0'+summoner.kills : summoner.kills} /
                  ${summoner.deaths < 10 ? '0'+summoner.deaths : summoner.deaths} /
                  ${summoner.assists < 10 ? '0'+summoner.assists : summoner.assists}`}
            </p>
            <div className={styles.matchInfo}>
                {duration && <p>{`${duration.minutes}:${duration.seconds}`}</p>}
                {creationDate && <p>{`${creationDate.day}/${creationDate.month}/${creationDate.year}`}</p>}
            </div>
            {/* <div className={styles.matchDetails}>
                <span>-3</span>
            </div> */}
        </div>
        }
        </>
    );
}

export default Match;