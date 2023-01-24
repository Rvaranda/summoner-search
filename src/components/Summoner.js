import { profileIconUrl } from '../config';
import './Summoner.css';

function Summoner({data}) {
  return (
    <div className='summoner-header'>
      <img 
        src={`${profileIconUrl}/${data.profileIconId}.png`}
        alt='icon'
      />
      <div>
        <p className='name'>{data.name}</p>
        <p className='level'>Nível {data.summonerLevel}</p>
      </div>
    </div>
  );
}

export default Summoner;