const core = require('@actions/core');
const github = require('@actions/github');

try {

    var config = {
        path: '.',
        build: true,
        publish: true,
        lint: true,
        unittest: true,
        release: true,
        plan: true,
        deploy: true,
        environments: ['sandbox', 'runtime-prd'],
        autoDeployToPrd: true,
    }

    let input = core.getInput('config');
    let _input = JSON.parse(input);

    let finalConfig = Object.assign(config, _input);

    console.log(`finalConfig: ${JSON.stringify(finalConfig)}`);

    // const nameToGreet = core.getInput('who-to-greet');
    // console.log(`Hello ${nameToGreet}!`);
    // const time = (new Date()).toTimeString();
    // core.setOutput("time", time);
    // // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
