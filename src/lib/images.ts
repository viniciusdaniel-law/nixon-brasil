const commonsRedirect = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/';

export function imageAtWidth(source: string, width: number) {
  if (!source.startsWith(commonsRedirect)) return source;

  const url = new URL(source);
  url.searchParams.set('width', String(width));
  return url.toString();
}

export function imageSrcset(source: string, widths: number[]) {
  if (!source.startsWith(commonsRedirect)) return undefined;
  return widths.map((width) => `${imageAtWidth(source, width)} ${width}w`).join(', ');
}
