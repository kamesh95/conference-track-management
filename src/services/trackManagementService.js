const Conference = require('../entities/conference');
const Track = require('../entities/track');

class TrackManagementService {
    constructor() {
        this.conferenceList = [];
        this.trackList = [];
    }

    // Prepares a list of valid conference talks
    prepareConferenceList(conferences) {
        for (let talk of conferences) {
            let duration = talk.split(' ').pop();
            if (duration.toLowerCase() === 'lightning') {
                duration = 5;
            } else if (duration.toLowerCase().endsWith('min')) {
                duration = parseInt(duration.slice(0, -3));
            } else {
                throw new Error(`Talk: ${talk} contains an invalid duration.`);
            }
            this.conferenceList.push(new Conference(talk, duration));
        }

        this.conferenceList.sort((conference1, conference2) => conference1.duration < conference2.duration ? 1 : -1);
    }

    // Computes the final track array
    computeTracks() {
        while (this.conferenceList.length > 0) {
            const track = new Track();
            for (let conference of this.conferenceList) {
                track.trackConference(conference);
            }
            this.trackList.push(track.prepareTrack());
            this.conferenceList = this.conferenceList.filter(conference => !conference.isTracked);
        }
    }

    // Prints the tracks
    printTracks() {
        for (let [index, talkArray] of this.trackList.entries()) {
            console.log(`Track ${index + 1}:`);
            console.log(`${talkArray.join('\n')}\n`);
        }
    }
}

module.exports = TrackManagementService;