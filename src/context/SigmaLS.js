import { SUPPORT_WALLET_KEYS } from "./constants";
// import { ALERT_TYPE } from "../components/SigmaAlert";

const lsKey = "SIGMA_GROUP";
const applicationKey = "shogun";

export const getSigmaLS = () => {
  let lsData = window.localStorage.getItem(lsKey);
  try {
    if (lsData) {
      checkIsValidSigmaLS(JSON.parse(lsData)[applicationKey]);
      return JSON.parse(lsData)[applicationKey];
    }
    return null;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const setSigmaLS = (sigmaLSFormat) => {
  try {
    checkIsValidSigmaLS(sigmaLSFormat);
  } catch (error) {
    console.error(error.message);
    throw new SigmaLSError("sigma ls format validation error in setSigmaLS");
  }

  localStorage.setItem(
    lsKey,
    JSON.stringify({
      [applicationKey]: sigmaLSFormat
    })
  );
};

export const removeSigmaLS = () => {
  localStorage.removeItem(lsKey);
};

const checkIsValidSigmaLS = (sigmaLS) => {
  const isValidType = sigmaLS && typeof sigmaLS === "object";
  if (!isValidType) throw new Error("sigma ls type error");

  const { walletKey } = sigmaLS;
  const isValidWalletKey =
    walletKey &&
    Object.keys(SUPPORT_WALLET_KEYS)
      .map((key) => SUPPORT_WALLET_KEYS[key])
      .includes(walletKey);
  if (!isValidWalletKey) throw new SigmaLSValidationError("wallet key error");
};

/** Custom Error */
export class SigmaLSValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "SigmaLSValidationError";
  }

  // alert = () => {
  //   SigmaFormatAlert({
  //     alertType: ALERT_TYPE.WALLET_CONNECTION
  //   });
  // };
}

export class SigmaLSError extends Error {
  constructor(message) {
    super(message);
    this.name = "SigmaLSError";
  }
}
