import { champIconsUrl } from "../config";
import styles from './css/Mastery.module.css';

function Mastery({data, champions}) {
  return (
    <>
    <h2 style={{textAlign: 'center', marginTop: '1rem'}}>Top 10 Maestrias</h2>
    <div className={styles.masteries}>
      {data.map(mastery => {
        return (
          <div key={mastery.championId} className={styles.mastery}>
            <img 
              src={`${champIconsUrl}/${champions[mastery.championId].image.full}`}
              alt={champions[mastery.championId].name}
            />
            <div>
              <p className={styles.name}>{champions[mastery.championId].name}</p>
              <p className={[styles.level, styles[`level${mastery.championLevel}`]].join(' ')}>
                <span>{mastery.championLevel}</span>
              </p>
              <p className={styles.points}>{mastery.championPoints}</p>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}

export default Mastery;