const fs = require('fs');
const path = require('path');
const promise = require('bluebird');

const TrackManagementService = require('./services/trackManagementService');

const TEST_DIRECTORY = 'test-cases';
const fsAsync = promise.promisifyAll(fs);

(async () => {
    const testFiles = await fsAsync.readdirAsync(path.join('..', TEST_DIRECTORY));
    for (let file of testFiles) {
        console.log(`File: ${file}`);
        const content = await fs.readFileAsync(path.join('..', TEST_DIRECTORY, file), 'utf8');
        const trackManagementService = new TrackManagementService();
        try {
            trackManagementService.prepareConferenceList(content.split('\n'));
            trackManagementService.computeTracks();
            trackManagementService.printTracks();
        } catch (error) {
            console.error(`${error.message}\n`);
        }
    }
})()
.catch(err => {
    console.error(err);
});

