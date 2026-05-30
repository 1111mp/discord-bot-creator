import { DBC } from './src/DBC.js';

async function main() {
  const dbc = new DBC();

  await dbc.files.startBot();

  console.log('Bot started');
}

main();
