import api from '../api/api';
import MD5 from 'crypto-js/md5';

const PUBLIC_KEY = '8ffcbe1b384449ecd13de25398c4b2a1';
const PRIVATE_KEY = '2f26311667c94a3ca6cfef0221517cc671d9eea7';
const timestamp = new Date().getTime();

const hash = MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();

export default {
  getCharacters() {
    return api.get(`/characters?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`);
  },
  getCharacterById(id) {
    return api.get(`/characters/${id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`);
  },
  getComicById(id) {
    return api.get(`/comics/${id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`);
  }
}