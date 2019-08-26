import { Market } from './market';
import { CommodityType } from '../commodity/commodity-types';
import { Commodity } from '../commodity/commodity';

describe('Market', () => {
    let testMarket: Market;
    let testCommodity: Commodity;

    const commodityValue = 42;
    const testCommodityType = CommodityType.TEST;

    beforeEach(() => {
        testMarket = new Market();
        testCommodity = new Commodity(testCommodityType, commodityValue);
        testMarket.addCommodity(testCommodity);
    });

    it('has a list of commodities that are traded', () => {
        expect(testMarket.commodities).toBeTruthy();
    });

    it('can add and retrieve a new commodity for trading', () => {
        const actualCommodity = testMarket.getCommodity(testCommodityType);
        expect(actualCommodity).toEqual(testCommodity);
    });

    it('can retrieve the historical mean for a commodity', () => {
        testCommodity.makeTrade(10);
        testCommodity.makeTrade(20);
        const expectedHistoricalMeanPrice = 15;
        const actualHistoricalMeanPrice = testMarket.getHistoricalMeanPriceOf(testCommodityType);
        expect(actualHistoricalMeanPrice).toEqual(expectedHistoricalMeanPrice);
    });

});