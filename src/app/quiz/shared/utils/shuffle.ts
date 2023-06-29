export function shuffle (strings: string[]): string[] {
  return strings.sort(() => Math.random() - 0.5);
}
