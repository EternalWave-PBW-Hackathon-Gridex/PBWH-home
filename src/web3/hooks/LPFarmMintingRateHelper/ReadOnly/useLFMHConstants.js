import useLFMHEarned from "./useLFMHEarned";

export default function useLFMHConstants(fromAddress) {
  return { ...useLFMHEarned(fromAddress) };
}
