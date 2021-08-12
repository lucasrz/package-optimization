import { ApiError } from '../lib/apiError';

describe('ApiError Class', () => {
    it('Should create an error with the correct message', () => {
        try {
            throw new ApiError();
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe('APIException');
        }
    });
});
