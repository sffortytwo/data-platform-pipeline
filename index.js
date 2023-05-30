const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

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

    let args = core.getInput('args');
    let _args = JSON.parse(args);

    let finalConfig = Object.assign(config, _args);

    var params = {};
    if (config.deploy) {
        config.environments.forEach(environment => {
            if (['cicd-prd', 'runtime-prd', 'landingzone'].includes(environment)) {
                if (['master', 'main'].includes(github.context.ref)) {
                    params[`DEPLOY_${environment.toUpperCase()}`] = config.autoDeployToPrd;
                }
            } else {
                params[`DEPLOY_${environment.toUpperCase()}`] = false;
            }
        });
    }

    // Checkout this repository using git
    // Enable fetch depth to 1 to speed up cloning.`
    // const git = require('simple-git/promise')();
    // await git.init();
    // await git.addConfig('user.name', 'github-actions[bot]');
    // await git.addConfig('user.email', 'github-actions[bot]@users.noreply.');
    // await git.addConfig('pull.rebase', 'false');
    // await git.addConfig('fetch.prune', 'true');
    // await git.addConfig('fetch.depth', '1');
    // await git.addConfig('remote.origin.fetch', '+refs/heads/*:refs/remotes/origin/*');


    exec.exec('checkout@v3')
    // Get a directory listing
    exec.exec('ls', ['-al']);


    // Get the current git branch
    const branch = github.context.ref;
    console.log(`branch: ${branch}`);

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
