import { Resolver } from 'node:dns/promises';
import { request } from 'node:https';

const domain = 'nixonbrazil.page';
const verificationHost = `_github-pages-challenge-viniciusdaniel-law.${domain}`;
const expectedA = [
  '185.199.108.153',
  '185.199.109.153',
  '185.199.110.153',
  '185.199.111.153',
];
const expectedCname = 'viniciusdaniel-law.github.io';

const resolver = new Resolver();
resolver.setServers(['1.1.1.1', '8.8.8.8']);

const normalize = (value) => value.replace(/\.$/, '');

async function query(label, action) {
  try {
    return { label, values: await action() };
  } catch (error) {
    return { label, values: [], error: error.code ?? error.message };
  }
}

function checkHttps() {
  return new Promise((resolve) => {
    const req = request({
      hostname: domain,
      method: 'HEAD',
      path: '/',
      timeout: 8_000,
    }, (response) => {
      resolve({
        ok: (response.statusCode ?? 500) < 500,
        status: response.statusCode,
        location: response.headers.location,
      });
      response.resume();
    });

    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', (error) => {
      resolve({
        ok: false,
        error: error.code ?? error.message,
        reason: error.reason,
      });
    });
    req.end();
  });
}

const [a, cname, txt, https] = await Promise.all([
  query('A', () => resolver.resolve4(domain)),
  query('CNAME', () => resolver.resolveCname(`www.${domain}`)),
  query('TXT', async () => (await resolver.resolveTxt(verificationHost)).flat()),
  checkHttps(),
]);

const actualA = [...a.values].sort();
const wantedA = [...expectedA].sort();
const aOk = JSON.stringify(actualA) === JSON.stringify(wantedA);
const cnameOk = cname.values.map(normalize).includes(expectedCname);
const txtOk = txt.values.length > 0;

console.log(`Domínio: ${domain}`);
console.log(`A: ${aOk ? 'OK' : 'INCOMPLETO'} ${actualA.join(', ') || `(${a.error ?? 'sem resposta'})`}`);
console.log(`www: ${cnameOk ? 'OK' : 'AUSENTE'} ${cname.values.join(', ') || `(${cname.error ?? 'sem resposta'})`}`);
console.log(`TXT: ${txtOk ? 'OK' : 'AUSENTE'} ${txt.values.join(', ') || `(${txt.error ?? 'sem resposta'})`}`);
console.log(`HTTPS: ${https.ok ? 'OK' : 'PENDENTE'} ${https.status ?? https.error ?? ''}${https.reason ? ` — ${https.reason}` : ''}`);

if (!aOk || !cnameOk || !txtOk || !https.ok) {
  process.exitCode = 1;
}

