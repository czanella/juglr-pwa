import notifier from 'node-notifier';
import opn from 'opn';

import app from './app';

import packageData from '../package.json';

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`${packageData.name} - Server listening on port ${PORT}`);

    notifier.notify({
        title: packageData.name,
        message: `Server listening on port ${PORT}`,
        wait: true,
    });

    notifier.on('click', () => {
        opn(`http://localhost:${PORT}`);
    });
});
