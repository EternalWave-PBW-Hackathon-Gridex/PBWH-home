export const isProduction = process.env.REACT_APP_IS_PRODUCTION === "TRUE";
// export const isProduction = true;
console.log(`${isProduction ? "production" : "development"} `);

export const PROJECT_ID = "shogun";

export const URL = {
  BASEURL: isProduction
    ? "https://cms.sigmaprotocol.app"
    : "http://127.0.0.1:1337",
  LANDING: `https://${isProduction ? "www." : "dev."}shogunprotocol.com`,
  APP: `https://${isProduction ? "app." : "testnet."}shogunprotocol.com`,
  SCOPE: `https://${isProduction ? "" : "mumbai."}polygonscan.com`,
  DOCS: `https://docs.shogunprotocol.com`,
  DEX: "https://meshswap.fi",

  TWITTER: "https://twitter.com/shogun_polygon",
  MEDIUM: "https://medium.com/@shogun_polygon ",
  TELEGRAM: "https://t.me/shogun_eng",
  DISCORD: "https://discord.gg/mjJV3ju6Jj"
};

export const API_TOKEN = {
  READ: "66667fbe7dedf8a0aef44817b868adde561d32e7161740f2182384b8e7d0f4df22e31fcc84b12ee2a62b681716a620cfbd9622780ce195fa98860d30450a9a3736dd1859742550a26f8aed2bf4fc7dc3b30d61ddbede960e7a3d025fced5cedf22850daf4372525164c753752de6fe247d87e7510e0689c5404466afb3ee33de"
};
