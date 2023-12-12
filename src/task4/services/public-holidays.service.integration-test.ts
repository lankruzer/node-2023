import {describe, expect, it, jest} from '@jest/globals';

import {checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays} from './public-holidays.service';
describe('public-holidays.service', () => {
    describe('getListOfPublicHolidays()', () => {
        it('should return the correctly count of holidays', async () => {
            const result = await getListOfPublicHolidays(2023, 'GB');

            expect(result.length).toEqual( 16);
        });
    });

    describe('checkIfTodayIsPublicHoliday()', () => {
        it('should return result for today', async () => {
            const result = await checkIfTodayIsPublicHoliday('GB');

            expect(result).toBeFalsy();
        });
    });

    describe('getNextPublicHolidays()', () => {
        it('should return the correctly count of next holidays', async () => {
            const result = await getNextPublicHolidays('GB');

            expect(result.length).toEqual( 13);
        });
    });
})