import { Market } from './market';
import { CommodityType } from '../commodity/commodity-types';
import { Commodity } from '../commodity/commodity';

describe('Market', () => {
    let testMarket: Market;
    const testCommodityType = CommodityType.TEST;

    beforeEach(() => {
        testMarket = new Market();
    });

    it('has a list of commodities that are traded', () => {
        expect(testMarket.commodities).toBeTruthy();
    });

    it('can add and retrieve a new commodity for trading', () => {
        const commodityValue = 42;
        const expectedCommodity = new Commodity(testCommodityType, commodityValue);
        testMarket.addCommodity(expectedCommodity);
        const testCommodity = testMarket.getCommodity(testCommodityType);
        expect(testCommodity).toEqual(expectedCommodity);
    });

});