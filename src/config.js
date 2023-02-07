import axios from 'axios';

export const champUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/data/pt_BR/champion';
export const champIconsUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion';
export const profileIconUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon';
export const itemIconUrl = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item';

export const endpoint = axios.create({
    baseURL: 'http://localhost:8080',
});