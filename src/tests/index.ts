import {exec} from 'child_process';
const file = process.argv[2];

const tests = exec(`ts-node-dev src/tests/${file}.test.ts`);

tests.stdout.on('data', data => {
    console.log(data);
})

