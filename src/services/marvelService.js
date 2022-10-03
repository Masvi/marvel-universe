import api from "../api/api";
import auth from "../api/auth";

const public_key = auth.getPublicKey();

export default {
  getCharacters({ offset }) {
    return api.get(
      `/characters?&limit=20&offset=${offset}&ts=${auth.getTimeStamp()}&apikey=${public_key}&hash=${auth.getHashMd5()}`
    );
  },
  getCharacterById(id) {
    return api.get(
      `/characters/${id}?ts=${auth.getTimeStamp()}&apikey=${public_key}&hash=${auth.getHashMd5()}`
    );
  },
  getCharacterByName(name) {
    return api.get(
      `/characters?name=${name}&ts=${auth.getTimeStamp()}&apikey=${public_key}&hash=${auth.getHashMd5()}`
    );
  },
  getComicById(id) {
    return api.get(
      `/comics/${id}?ts=${auth.getTimeStamp()}&apikey=${public_key}&hash=${auth.getHashMd5()}`
    );
  },
};
