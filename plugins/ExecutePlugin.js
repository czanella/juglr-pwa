const { spawn } = require('child_process');

const defaultOptions = {
    async: true,
    emitFile: false,
    childProcessArgs: [],
};

function handleChildProcess(childProcess, callback, async) {
    childProcess.stdout.on('data', data => console.log(`###### ${data}`));
    childProcess.stderr.on('data', err => console.log(`!!!!!! ${err}`));

    if (async) {
        callback();
    } else {
        childProcess.on('close', callback);
    }
}

function ExecutePlugin(options) {
    this.options = Object.assign({}, defaultOptions, options);
    this.childProcess = null;

    if (!this.options.bundleName) {
        throw 'No bundleName was provided in ExecutePlugin parameters';
    }
}

ExecutePlugin.prototype.apply = function (compiler) {
    if (this.options.emitFile) {
        compiler.hooks.afterEmit.tapAsync('ExecutePlugin', (compilation, callback) => {
            const bundlePath = compilation.assets[this.options.bundleName].existsAt;
            console.log(`Running bundle at ${bundlePath}`);

            this.childProcess = spawn('node', [bundlePath]);

            handleChildProcess(this.childProcess, callback, this.options.async);
        });
    } else {
        compiler.hooks.emit.tapAsync('ExecutePlugin', (compilation, callback) => {
            const bundleSource = compilation.assets[this.options.bundleName].source();
            console.log(`Bundled code has ${bundleSource.length} bytes`);

            this.childProcess = spawn('node', ['-e', bundleSource].concat(this.options.childProcessArgs));
            delete compilation.assets[this.options.bundleName];

            handleChildProcess(this.childProcess, callback, this.options.async);
        });
    }
};

module.exports = ExecutePlugin;
