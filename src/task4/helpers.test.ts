import {describe, expect, it, beforeAll, jest, afterAll} from '@jest/globals';
import {shortenPublicHoliday, validateCountry, validateInput, validateYear} from './helpers';

describe('helpers', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(2023, 1, 1));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    describe('validateCountry()', () => {
        it('should return TRUE for supported country', () => {
            expect(validateCountry('GB')).toBeTruthy()
        });

        it('should return false for supported country', () => {
            expect(validateCountry('TEST')).toBeFalsy()
        });
    });

    describe('validateYear()', () => {
        it('should return TRUE for current year', () => {
            expect(validateYear(2023)).toBeTruthy()
        });

        it('should return FALSE for next year', () => {
            expect(validateYear(2024)).toBeFalsy()
        })
    });

    describe('validateInput()', () => {
        it('should return TRUE if year and country not provided', () => {
            expect(validateInput({})).toBeTruthy();
        });

        it('should return TRUE if current year and not provided country', () => {
            expect(validateInput({ year: 2023 })).toBeTruthy();
        });

        it('should return TRUE if provided year is current and provided country is supported', () => {
            expect(validateInput({ year: 2023, country: 'GB' })).toBeTruthy();
        });

        it('should return Error if provided year is not current', () => {
            expect(() => validateInput({ year: 2024 })).toThrow('Year provided not the current, received: 2024');
        });

        it('should return Error if provided country is not supported', () => {
            expect(() => validateInput({ country: 'TEST' })).toThrow('Country provided is not supported, received: TEST');
        });
    });

    describe('shortenPublicHoliday()', () => {
        it('should return correct holiday object', () => {
            expect(shortenPublicHoliday({
                name: 'name',
                localName: 'localName',
                date: 'date',
                countryCode: 'countryCode',
                fixed: true,
                global: true,
                counties: null,
                launchYear: null,
                types: ['']
            })).toEqual({
                name: 'name',
                localName: 'localName',
                date: 'date'
            });
        });
    })
});