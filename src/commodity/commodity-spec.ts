import { Commodity } from './commodity';
import { CommodityType } from './commodity-types';

describe('Commodity', () => {
    let commodity: Commodity;
    let testCommodityType = CommodityType.TEST;
    let testCommodityValue = 42;

    beforeEach(() => {
        commodity = new Commodity(testCommodityType, testCommodityValue);
    });

    it('has a type and value', () => {
        expect(commodity.type).toEqual(testCommodityType);
        expect(commodity.value).toEqual(testCommodityValue);
    })
});