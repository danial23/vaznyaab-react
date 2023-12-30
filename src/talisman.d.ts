declare module "talisman/metrics/damerau-levenshtein" {
  function damerauLevenshtein(a: string, b: string): number;
  function limited(max: number, a: string, b: string): number;
  export { damerauLevenshtein, limited };
}
