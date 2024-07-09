import crypto from "crypto"

function generateSecretKey(length) {
  return crypto.randomBytes(length).toString('hex');
}

const accessTokenSecret = generateSecretKey(32); // 32 bytes = 64 hex characters
const refreshTokenSecret = generateSecretKey(32); // 32 bytes = 64 hex characters

console.log('Access Token Secret:', accessTokenSecret);
console.log('Refresh Token Secret:', refreshTokenSecret);