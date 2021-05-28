import api from '../api/api';
import MD5 from 'crypto-js/md5';

const PUBLIC_KEY = '8ffcbe1b384449ecd13de25398c4b2a1';
const PRIVATE_KEY = '2f26311667c94a3ca6cfef0221517cc671d9eea7';

export default {
  getCharacters() {
    const ts = new Date().getTime();
    const hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    return api.get(`/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
  }
}