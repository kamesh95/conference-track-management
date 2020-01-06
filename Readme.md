::::::::::::::::::: Conference Track Management Problem ::::::::::::::::::::::::

# Algorithm Flow:
This Project contains the implementation for Conference Track Management problem. The basic steps I have used to track conferences are:
1. Sort the conferences based on their duration (Highest duration conference is on Top)
2. Pick the conference from the list and check if it fits in the morning or the afternoon timeline.
    2.1. If it fits in the morning or afternoon timeline, mark that the conference is tracked.
    2.2. If it does not fit in any timeline for the day, leave it and move forward.
3. Update the conference list to filter out the conferences that are already tracked.
4. Repeat the process from 2nd step for the remaining conferences till all the conferences are tracked.

# Steps to execute the Project
1. Place your txt files with test cases you want to check inside the test-cases directory
2. Run `npm install` in the root directory
3. Run `npm start` to execute the application with the test cases in test-cases directory
4. Run `npm run test` to execute the unit test cases or `npm run test-coverage` for checking the coverage of unit tests
5. Run `npm run test-coverage` to generate a coverage report of the test cases. (The test case coverage is 100%)
