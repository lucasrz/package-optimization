import { Packer } from '../index';
import { Packer as PackerExpected } from '../lib/packer';

describe('App index', () => {
    it('Should export Packer ckass', () => {
        expect(Packer).toBeDefined();
        expect(Packer).toEqual(PackerExpected);
        expect(Packer.pack).toBeDefined();
    });
});
