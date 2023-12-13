import {describe, expect, it, jest} from '@jest/globals';

import {PUBLIC_HOLIDAYS_API_URL} from "../config";
describe('Nager.Date API', () => {
    describe('/Version', () => {
        it('api should return response with status 200 and correct structure', async () => {
            const response = await fetch(`${PUBLIC_HOLIDAYS_API_URL}/Version`);
            const { status } = response;
            const result = await response.json();

            expect(status).toEqual( 200);
            expect(result?.name).toBeTruthy();
            expect(result?.version).toBeTruthy();
        });
    });

    describe('/AvailableCountries', () => {
        it('api should return response with status 200 and correct structure', async () => {
            const response = await fetch(`${PUBLIC_HOLIDAYS_API_URL}/AvailableCountries`);
            const { status } = response;
            const result = await response.json();

            expect(status).toEqual( 200);
            expect(Array.isArray(result)).toBeTruthy();
        });
    });
})