import { profileIconUrl } from '../config';
import styles from './css/Summoner.module.css';

function Summoner({data}) {
  return (
    <div className={styles.summonerHeader}>
      <img 
        src={`${profileIconUrl}/${data.profileIconId}.png`}
        alt='icon'
      />
      <div>
        <p className={styles.name}>{data.name}</p>
        <p className={styles.level}>Nível {data.summonerLevel}</p>
      </div>
    </div>
  );
}

export default Summoner;