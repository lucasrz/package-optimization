import { Packer } from '../lib/packer';

describe('Packer Class', () => {
    it('Should throw an exception if the file path is missing', () => {
        try {
            Packer.pack('');
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe('APIException');
        }
    });

    it('Should throw an exception if the file is not found', () => {
        try {
            Packer.pack('./data/noFile');
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe('APIException');
        }
    });

    it('Should throw an exception if the package weight is higher than 100', () => {
        try {
            Packer.pack('./data/packageWeightExceeded');
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe('APIException');
        }
    });


    it('Should throw an exception if the number of itens is higher than 15', () => {
        try {
            Packer.pack('./data/itensLimitExceeded');
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe('APIException');
        }
    });

    it('Should throw an exception if one of the itens weighs more than 100', () => {
        try {
            Packer.pack('./data/itemWeightExceeded');
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe('APIException');
        }
    });


    it('Should throw an exception if one of the itens value is higher than 100', () => {
        try {
            Packer.pack('./data/itemValueExceeded');
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe('APIException');
        }
    });

    it('Should return line 1 correct result', () => {
        const result = Packer.pack('./data/input');
        expect(result.split('\n')[1]).toBe('4');
    });

    it('Should return line 2 correct result', () => {
        const result = Packer.pack('./data/input');
        expect(result.split('\n')[2]).toBe('-');
    });

    it('Should return line 3 correct result', () => {
        const result = Packer.pack('./data/input');
        expect(result.split('\n')[3]).toBe('2, 7');
    });

    it('Should return line 4 correct result', () => {
        const result = Packer.pack('./data/input');
        expect(result.split('\n')[4]).toBe('8, 9');
    });

    it('Should return line 5 correct result - Combination with more than 2 itens', () => {
        const result = Packer.pack('./data/input');
        expect(result.split('\n')[5]).toBe('4, 6, 8, 9');
    });

    it('Should return line 6 correct result - Combination with more than 4 itens', () => {
        const result = Packer.pack('./data/input');
        expect(result.split('\n')[6]).toBe('1, 2, 8, 9, 10');
    });

    it('Should return line 7 correct result - No item weighs less then the capacity', () => {
        const result = Packer.pack('./data/input');
        expect(result.split('\n')[7]).toBe('-');
    });

    it('Should return line 8 correct - Itens with same value and different weight', () => {
        const result = Packer.pack('./data/input');
        expect(result.split('\n')[8]).toBe('2, 3');
    });

    it('Should return line 9 correct - Itens with the same weight and differente value ', () => {
        const result = Packer.pack('./data/input');
        expect(result.split('\n')[9]).toBe('1');
    });

    it('Should return line 10 correct - All itens fits in the package', () => {
        const result = Packer.pack('./data/input');
        expect(result.split('\n')[10]).toBe('1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15');
    });
});
