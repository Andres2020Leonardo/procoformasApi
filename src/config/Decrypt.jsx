import CryptoJS from 'crypto-js';
 const  Decrypt = (text) => {
    const secretKey = 'procoformas';
    const bytes = CryptoJS.AES.decrypt(text, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  };
  export default Decrypt