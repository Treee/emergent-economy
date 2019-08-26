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
    });

    it('has a list of historical prices', () => {
        expect(commodity.historicalPrices).toBeTruthy();
    });

    it('knows how many trades happen in a day', () => {
        expect(commodity.historicalPrices.length).toEqual(0);
        commodity.makeTrade(Math.random());
        commodity.makeTrade(Math.random());
        commodity.makeTrade(Math.random());
        expect(commodity.historicalPrices.length).toEqual(3);
    });

    it('has a historical mean price', () => {
        commodity.makeTrade(5);
        commodity.makeTrade(2);
        commodity.makeTrade(8);
        commodity.makeTrade(5);
        commodity.makeTrade(10);
        const expectedHistoricalMean = (5 + 2 + 8 + 5 + 10) / 5;
        const actualHistoricalMean = commodity.getHistoricalMean();
        expect(actualHistoricalMean).toEqual(expectedHistoricalMean);
    });
});