import axios from 'axios';

export const champUrl = 'https://ddragon.leagueoflegends.com/cdn/13.1.1/data/pt_BR/champion';
export const champIconsUrl = 'https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion';
export const profileIconUrl = 'https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon';
export const itemIconUrl = 'https://ddragon.leagueoflegends.com/cdn/13.1.1/img/item';

export const endpoint = axios.create({
  baseURL: "https://summoner-search.onrender.com",
});