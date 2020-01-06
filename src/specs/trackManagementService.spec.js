const expect = require('chai').expect;
const sinon = require('sinon');

const config = require('../config');
const TrackManagementService = require('../services/trackManagementService');

const conferencesTestData = [
    'Woah 30min',
    'Sit Down and Write 60min',
    'NodeJS Lightning'
];

describe('TrackManagementService', () => {
    describe('#printTracks()', () => {
        context('With tracklist containing 2 tracks', () => {
            let logMethod;
            before(() => {
                const trackManagementService = new TrackManagementService();
                trackManagementService.trackList = [conferencesTestData];
                logMethod = sinon.spy(console, 'log');
                trackManagementService.printTracks();
            });

            it('Should call console.log method 2 times', () => {
                expect(logMethod.getCalls().length).to.be.equal(2);
            });
        });
    });

    describe('#prepareConferenceList()', () => {
        context('With conferences containing talks with minutes and lightning talks', () => {
            let trackManagementService;
            before(() => {
                trackManagementService = new TrackManagementService();
                trackManagementService.prepareConferenceList(conferencesTestData);
            });

            it('Should have conference list containing correct durations in decreasing order', () => {
                expect(trackManagementService.conferenceList.length).to.be.equal(3);
                expect(trackManagementService.conferenceList.findIndex(o => o.duration === 5)).to.be.equal(2);
                expect(trackManagementService.conferenceList.findIndex(o => o.duration === 30)).to.be.equal(1);
                expect(trackManagementService.conferenceList.findIndex(o => o.duration === 60)).to.be.equal(0);
            });
        });

        context('With conferences containing invalid talk', () => {
            let error;
            before(() => {
                trackManagementService = new TrackManagementService();
                try {
                    trackManagementService.prepareConferenceList(conferencesTestData.concat(['Invalid Talk 0minutes']));
                } catch (err) {
                    error = err;
                }
            });

            it('Should throw error for invalid talk', () => {
                expect(error.message).to.be.equal('Talk: Invalid Talk 0minutes contains an invalid duration.');
            });
        });
    });

    describe('#computeTracks()', () => {
        context('With conferenc list containing talks with minutes and lightning talks', () => {
            let trackManagementService;
            before(() => {
                trackManagementService = new TrackManagementService();
                trackManagementService.prepareConferenceList(conferencesTestData);
                trackManagementService.computeTracks();
            });

            it('Should add all conferences in track list along with lunch and networking events', () => {
                expect(trackManagementService.conferenceList.length).to.be.equal(0);
                expect(trackManagementService.trackList.length).to.be.equal(1);
                expect(trackManagementService.trackList[0].length).to.be.equal(5);
                expect(trackManagementService.trackList[0].includes(`${config.LUNCH_TIME} Lunch`)).to.be.true;
                expect(trackManagementService.trackList[0].includes(`${config.NETWORKING_TIME} Networking Event`)).to.be.true;
            });
        });
    });
});
