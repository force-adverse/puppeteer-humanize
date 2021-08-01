export const PUNCTUATION_CHARS: string[] = [...`@#$%^&*()-+_=/[]{}:;|~<>"'`]
export const TERMINATION_CHARS: string[] = [...`.,?!`]
export const WHITESPACE_CHARS: string[] = [...` `]

export const NUMERIC_CHARS: string[] = [...`0123456789`]
export const ALPHA_CHARS: string[] = [
  ...`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
]

export const PROXIMATE_CHARS: Record<string, string[]> = {
  A: [...`QWESZ`],
  B: [...`VFGHN`],
  C: [...`XSDFV`],
  D: [...`WERSFXC`],
  E: [...`34WRSDF`],
  F: [...`ERTDGCV`],
  G: [...`RTYFHVB`],
  H: [...`TYUGJBN`],
  I: [...`89UOJKL`],
  J: [...`UIHKNM`],
  K: [...`UIOJLNM,`],
  L: [...`IOPK;,.`],
  M: [...`HJKN,`],
  N: [...`GHJKBM`],
  O: [...`90IPKL;`],
  P: [...`0-O[L;`],
  Q: [...`12WAS`],
  R: [...`45ETDFG`],
  S: [...`QWEADZXC`],
  T: [...`56RYFGH`],
  U: [...`78YIHJK`],
  V: [...`DFGCB`],
  W: [...`23QEASD`],
  X: [...`ASDZC`],
  Y: [...`67TUGHJ`],
  Z: [...`ASDX`],
  "1": [...`2QW`],
  "2": [...`13QW`],
  "3": [...`24WE`],
  "4": [...`35ER`],
  "5": [...`46RT`],
  "6": [...`57TY`],
  "7": [...`68YU`],
  "8": [...`79UI`],
  "9": [...`80IO`],
  "0": [...`9-OP`]
}
