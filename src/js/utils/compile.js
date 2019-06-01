import path from 'path';
import fs from 'fs';
import solc from 'solc';
import Logger from './logger';

const compileContract = filename => {
    const contractPath = path.resolve('contracts', `${filename}.sol`);
    const source = fs.readFileSync(contractPath, 'utf8');
    const compiledContracts = solc.compile(source, 1).contracts;
    for (const contract in compiledContracts) {
        const outputPath = path.resolve('build', `${contract.slice(1)}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(compiledContracts[contract]));
    }
    Logger.success('Successfully compiled contracts');
    return compiledContracts;
};

compileContract('TSPInstance');

export default compileContract;
