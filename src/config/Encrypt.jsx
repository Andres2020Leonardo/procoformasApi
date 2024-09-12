import CryptoJS from 'crypto-js';

const Encrypt=(text)=>{
    const secretKey = 'procoformas';
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    return encrypted;
    
    
}

export default Encrypt;