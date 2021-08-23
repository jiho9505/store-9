import bcrpyt from 'bcrypt';

const saltRounds = 10;

export const passwordUtils = {
  hash: async (password) => {
    const hashPassword = await bcrpyt.hash(password, saltRounds);
    return hashPassword;
  },
  compare: async (password, hashPassword) => {
    const match = await bcrpyt.compare(password, hashPassword);
    return match;
  },
  getRandomPwd: (data) => {
    const salt = Math.random() * 1000;
    return data + salt;
  },
};
