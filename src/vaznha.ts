import { ARKAAN, VAZNHA } from "./data.ts"
import { limited as damerau_levenshtein } from "talisman/metrics/damerau-levenshtein"

let match: (a: string, b: string) => boolean =
  (a: string, b: string) => a === b;

export function set_exact_matcher() {
  match = (a: string, b: string) => a === b;
}

export function set_fuzzy_matcher(threshold: number) {
  match = (a: string, b: string) => isFinite(damerau_levenshtein(threshold, a, b));
}

export async function vaznha(input: string): Promise<string[]> {
  const input_heja = heja_special(input.toLowerCase().replace(/[^\s\w]/g, ""));
  const vznha: string[] = [];
  for (let key_vazn in VAZNHA) {
    const vazn_variants = VAZNHA[key_vazn];
    for (let variant of vazn_variants) {
      let vazn = "";
      for (let key_arkaan of variant.arkaan) {
        vazn += heja(ARKAAN[key_arkaan]);
      }
      if (check_match(vazn, input_heja)) {
        vznha.push(variant.desc);
      }
    }
  }
  return vznha;
}

function check_match(vazn: string, heja: string): boolean {
  if (match(vazn, heja) || check_UU_transform_match(vazn, heja)) {
    return true;
  }
  const vazn_alt = vazn.replace(/^UU__/g, "_U__");
  if (vazn_alt !== vazn) {
    if (match(vazn_alt, heja) || check_UU_transform_match(vazn_alt, heja)) {
      return true;
    }
  }
  return false;
}

function check_UU_transform_match(vazn: string, heja: string): boolean {
  let i = -1;
  while (true) {
    i = vazn.indexOf("_UU_", i + 4)
    if (i < 0) {
      return false;
    }
    if (vazn.slice(0, i) + "U_U_" + vazn.slice(i + 4) === heja) {
      return true;
    }
  }
}

function CSL(input: string): string {
  // order is important
  const L = /(?:aa|ee|o[ow]|i(?!y)|u)/g;
  const S = /(?:(?<!a)a(?!a)|(?<!o)o(?![ow])|e|i(?=y))/g;
  const N_DEL = /(?<=L)n(?![LS])/g;
  const C = /(?:['bdfhjlmnpqrtvxy]|ch|g[h]?|k[h]?|s[h]?|z[h]?)/g;
  const HAMZE = /(?:(?<=[LS]) (?=[LS])|^(?=[LS]))/g; // to C

  let s = input;
  s = s.replace(L, "L");
  s = s.replace(S, "S");
  s = s.replace(N_DEL, "");
  s = s.replace(C, "C");
  s = s.replace(HAMZE, "C");
  s = s.replace(/\s/g, "");

  return s;
}

export function heja(input: string): string {
  const KESHIDE = /CLCC(?![LS])|CLC(?![LS])|CSCC(?![LS])/g;
  const BOLAND = /CSC(?![LS])|CL/g;
  const KOOTAH = /CS/g;

  let s = input;
  s = CSL(s);

  s = s.replace(KESHIDE, "_U");
  s = s.replace(BOLAND, "_");
  s = s.replace(KOOTAH, "U");

  return s;
}

function heja_special(input: string): string {
  let s = input;
  s = heja(s);

  s = s.replace(/UUU/g, "UU_");
  s = s.replace(/_U$/g, "_");

  return s;
}
