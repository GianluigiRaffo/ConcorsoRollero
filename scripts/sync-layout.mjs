import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

// Update the shared regions in the checked-in pages for both HTTP and file:// use.
const site = new URL('../', import.meta.url);
const fragments = ['header', 'footer', 'cta-iscrizione'].map((name) => ({
  name,
  lines: readFileSync(new URL(`${name}.html`, site), 'utf8').trimEnd().split(/\r?\n/),
}));

for (const page of readdirSync(site, { withFileTypes: true })) {
  if (!page.isFile() || !page.name.endsWith('.html')) continue;

  const url = new URL(encodeURIComponent(page.name), site);
  const source = readFileSync(url, 'utf8');
  const newline = source.includes('\r\n') ? '\r\n' : '\n';
  let output = source;

  for (const { name, lines } of fragments) {
    const begin = `<!-- shared:${name} -->`;
    const end = `<!-- /shared:${name} -->`;
    const region = new RegExp(`^([ \\t]*)${begin}[\\s\\S]*?^\\1${end}`, 'm');

    output = output.replace(region, (_, indent) =>
      [begin, ...lines, end].map((line) => line ? indent + line : '').join(newline)
    );
  }

  if (output !== source) writeFileSync(url, output, 'utf8');
}
