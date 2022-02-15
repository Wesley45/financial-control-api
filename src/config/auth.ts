export default {
  secret_token: process.env.APP_SECRET as string,
  expires_in_token: process.env.EXPIRES_IN as string,
};
