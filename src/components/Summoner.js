import { profileIconUrl } from '../config';
import style from './css/Summoner.module.css';

function Summoner({data}) {
  return (
    <div className={style.summonerHeader}>
      <img 
        src={`${profileIconUrl}/${data.profileIconId}.png`}
        alt='icon'
      />
      <div>
        <p className={style.name}>{data.name}</p>
        <p className={style.level}>Nível {data.summonerLevel}</p>
      </div>
    </div>
  );
}

export default Summoner;