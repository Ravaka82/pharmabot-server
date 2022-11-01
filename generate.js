#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const _ = require('lodash');
const {mkdirSync, existsSync, readFileSync, writeFileSync} = require('fs');
const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
    description: 'Example command'
});

parser.add_argument('-c','--component', { help: 'Generate module' });
parser.add_argument('--pluralize', { help: 'Pluralize a collection on mongo database' });

const args = parser.parse_args();

const run = async (lName, uName, pluralize) => {
    try {
        // create folder on module
        await mkdirSync(`./src/modules/${pluralize}`, {recursive: true});
        console.log(chalk.green('Folder', lName, 'created.'));

        await generate('service', lName, uName, pluralize);
        console.log(chalk.green('Service', lName, 'created.'))

        await generate('controller', lName, uName, pluralize);
        console.log(chalk.green('Controller', lName, 'created.'))

        await generate('route', lName, uName, pluralize);
        console.log(chalk.green('Route', lName, 'created.'))

        await generate('model', lName, uName, pluralize);
        console.log(chalk.green('Model', lName, 'created.'))

        await insertText(lName, uName, pluralize, {
            key: 'IMPORT_NEW_ROUTE',
            template: 'import TemplateRouter from "./modules/templates/template.route";'
        });

        await insertText(lName, uName, pluralize, {
            key: 'ADD_NEW_ROUTE',
            template: "this.router.use('/api/template', TemplateRouter)"
        });

        console.log(chalk.green('Module imported successfully !'))

    } catch(error) {
        console.error(error);
    }
}

const insertText = async(lName, uName, pluralize, {
    template,
    key
}) => {
    const appRouter = await readFileSync(`./src/app.router.ts`).toString();
    let res = '';
    for (const line of appRouter.split('\n')) {
        if (line.match(key)) {
            let indentation = Number(line.split(':')[1]) || 0;
            let r = '';
            while(indentation !== 0) {
                r += ' ';
                indentation--
            }
            r += template
                .replace(/Template/g, uName)
                .replace(/templates/g, pluralize)
                .replace(/template/g, lName)
            res += r + '\n';
        }
        res += line + '\n';
    }
    await writeFileSync(`./src/app.router.ts`, res);
}

const generate = async (fileType, lName, uName, pluralize) => {
    const tmp = await readFileSync(`./template/Template.${fileType}.ts`).toString();
    let template = '';
    for(const line of tmp.split('\n')) {
        let w = line
            .replace(/Template/g, uName)
            .replace(/templates/g, pluralize)
            .replace(/template/g, lName)
        template += w + '\n';
    }
    await writeFileSync(`./src/modules/${pluralize}/${lName}.${fileType}.ts`, template);
}

if (args.component) {
    const componentName = args.component.toLowerCase();
    const componentNameCapitalize = _.capitalize(componentName);
    const pluralize = args.pluralize || componentName;
    run(componentName, componentNameCapitalize, pluralize);
}
