
import MD5 from 'crypto-js/md5';

export default {  

  getHashMd5() {
    return MD5(
      new Date().getTime()+process.env.VUE_APP_PRIVATE_KEY+process.env.VUE_APP_PUBLIC_KEY
    ).toString();
  },
  getTimeStamp() {
    return new Date().getTime();
  },
  getPublicKey() {
    return process.env.VUE_APP_PUBLIC_KEY;
  },
  getPrivateKey() {
    return process.env.VUE_APP_PRIVATE_KEY;
  }
}