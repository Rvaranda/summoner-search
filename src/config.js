import axios from 'axios';

export const champUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/data/pt_BR/champion';
export const champIconsUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion';
export const profileIconUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon';
export const itemIconUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item';

export const endpoint = axios.create({
    baseURL: 'https://br1.api.riotgames.com',
    params: {
        api_key: 'RGAPI-dfa73ecb-5d63-420c-b4ce-14593b4abbb2'
    }
});

export const regionalEndpoint = axios.create({
    baseURL: 'https://americas.api.riotgames.com',
    params: {
        api_key: 'RGAPI-dfa73ecb-5d63-420c-b4ce-14593b4abbb2'
    }
});