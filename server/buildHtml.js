import { writeFileSync } from 'fs';
import runMiddleware from 'run-middleware';
import app from './app';

runMiddleware(app);

app.runMiddleware('/', (code, body) => {
    writeFileSync('./public/index.html', body);
});
