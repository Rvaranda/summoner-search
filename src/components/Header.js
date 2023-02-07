import { useState } from "react";

function Header({ getSummonerData }) {
  const [summonerName, setSummonerName] = useState('');

  return (
    <header>
      <form>
        <div className='form-search'>
          <input
            type='text'
            value={summonerName}
            onChange={e => setSummonerName(e.target.value)}
          />
          <button type='submit' onClick={e => getSummonerData(e, summonerName)}>Pesquisar</button>
        </div>
      </form>
    </header>
  );
}

export default Header;