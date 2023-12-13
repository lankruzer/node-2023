import axios from 'axios';
import {describe, expect, it, jest} from '@jest/globals';

import {checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays} from './public-holidays.service';

const defaultHoliday = {
    name: 'name',
    localName: 'localName',
    date: '2023',
    countryCode: 'BY',
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ['']
};

describe('public-holidays.service', () => {
    describe('getListOfPublicHolidays()', () => {
        it('should return the correctly mapped response', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [defaultHoliday] }));

            const result = await getListOfPublicHolidays(2023, 'GB');

            expect(result).toEqual( [{"date": "2023", "localName": "localName", "name": "name"}]);
        });

        it('should return empty array for loading error', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());

            const result = await getListOfPublicHolidays(2023, 'GB');

            expect(result).toEqual( []);
        });
    });

    describe('checkIfTodayIsPublicHoliday()', () => {
        it('should return TRUE for success api request', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));

            const result = await checkIfTodayIsPublicHoliday('GB');

            expect(result).toBeTruthy();
        });

        it('should return FALSE for rejected api request', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({ status: 400 }));

            const result = await checkIfTodayIsPublicHoliday('GB');

            expect(result).toBeFalsy();
        });
    });

    describe('getNextPublicHolidays()', () => {
        it('should return the correctly mapped response', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [defaultHoliday] }));

            const result = await getNextPublicHolidays('GB');

            expect(result).toEqual( [{"date": "2023", "localName": "localName", "name": "name"}]);
        });

        it('should return empty array for loading error', async () => {
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject());

            const result = await getNextPublicHolidays('GB');

            expect(result).toEqual( []);
        });
    });
})