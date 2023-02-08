import { useRef, useState } from "react";

function Header({ loading, getSummonerData }) {
  const [summonerName, setSummonerName] = useState('');
  const inputElement = useRef();

  return (
    <header>
      <form>
        <div className='form-search'>
          <input
            type='text'
            value={summonerName}
            onChange={e => setSummonerName(e.target.value)}
            ref={inputElement}
          />
          <button
            type='submit'
            onClick={e => { getSummonerData(e, summonerName); inputElement.current.blur(); }}
            disabled={loading}
          >
            Pesquisar
          </button>
        </div>
      </form>
    </header>
  );
}

export default Header;