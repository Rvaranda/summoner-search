import { champIconsUrl } from "../config";
import './Mastery.css';

function Mastery({data, champions}) {
  return (
    <>
    <h2 style={{textAlign: 'center', marginTop: '1rem'}}>Top 10 Maestrias</h2>
    <div className='masteries'>
      {data.map(mastery => {
        return (
          <div key={mastery.championId} className='mastery'>
            <img 
              src={`${champIconsUrl}/${champions[mastery.championId].image.full}`}
              alt={champions[mastery.championId].name}
            />
            <div>
              <p className='name'>{champions[mastery.championId].name}</p>
              <p className={`level level-${mastery.championLevel}`}>
                <span>{mastery.championLevel}</span>
              </p>
              <p className='points'>{mastery.championPoints}</p>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}

export default Mastery;