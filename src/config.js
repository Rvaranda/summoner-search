import axios from 'axios';

export const champUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/data/pt_BR/champion';
export const champIconsUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion';
export const profileIconUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon';
export const itemIconUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item';

const api = 'RGAPI-18a3ef3b-80e2-4639-bb65-946bc65b6db4';

export const endpoint = axios.create({
    baseURL: 'https://br1.api.riotgames.com',
    params: {
        api_key: api
    }
});

export const regionalEndpoint = axios.create({
    baseURL: 'https://americas.api.riotgames.com',
    params: {
        api_key: api
    }
});