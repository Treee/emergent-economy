// Each agent maintains a set of price beliefs for each commodity it is able to buy or sell. 
//These price beliefs are represented as an upper and lower price bound, with the agent believing the price
// to be somewhere in this interval. 
//Any time the agent needs to make a price estimation (for example
// during offer creation), it will select a uniformly random value in this interval.
//The outcome of a trade will provide either positive or negative reinforcement to this belief. 
// Positive reinforcement will result in the agent shrinking this interval around the mean, 
// negative reinforcement may result in the interval increasing about the mean and/or being translated to a different mean. 
// When an agent wishes to create an offer, it will need to determine the commodity
// to trade, a fair price, and the quantity of the commodity to trade. 

// mod idea
//A designer interested in creating an economic system would need to decide when these updates occur, and the
// magnitude of the changes.

// Simulation
// Periodically agents will need to submit trade offers to the clearing house in order to buy or sell
// commodities. 


//A designer may choose to have agents buy only commodities they use for production and sell commodities they produce.
//In this case, an agent would create bids when the inventory of needed commodities drops below some
// threshold, and create asks anytime it has inventory to sell. The Create Bid routine creates an
// offer to buy at most limit units of Commodity, and Create Ask creates an offer to sell at least
// limit units of Commodity.
// Create Bid(Commodity, limit)
// 1 bid-price ← PriceOf (Commodity)
// 2 ideal ← Determine-Purchase-Quantity(Commodity)
// 3 quantity-to-buy ← Min(desired, limit)
// Create Ask(Commodity, limit)
// 1 bid-price ← PriceOf (Commodity)
// 2 ideal ← Determine-Sale-Quantity(Commodity)
// 3 quantity-to-sell ← Max(ideal, limit)

// The determination of offer quantities is based on an agent’s need, the inventory on hand, and the
// observed market price for that commodity. An agent might determine that it has no need to trade
// in a particular commodity, or that a need is present but current market prices are unfavorable and
// trades should be avoided. If an agent believes that a commodity is either overpriced or underpriced,


import { Agent, PriceRange } from './agent';
import { CommodityType } from '../commodity/commodity-types';
import { Commodity } from '../commodity/commodity';
import { Market, Transaction } from '../market/market';

describe('Agent', () => {
    let testMarket: Market;
    let testCommodity: Commodity;
    let agent: Agent;
    const testCommodityValue = 42;
    const testCommodityType = CommodityType.TEST;
    const testPriceRange = new PriceRange(0, testCommodityValue);

    beforeEach(() => {
        testMarket = new Market();
        testCommodity = new Commodity(testCommodityType, testCommodityValue);
        testMarket.addCommodity(testCommodity);
        testCommodity.makeTrade(10);
        testCommodity.makeTrade(20);
        testCommodity.makeTrade(30);
        testCommodity.makeTrade(40);
        testCommodity.makeTrade(50);
        agent = new Agent(testMarket, 'testAgent');
    });

    describe('Price Beliefs', () => {
        it('has a set of price beliefs for each commodity it can buy or sell', () => {
            expect(agent.getPriceRangeOf(CommodityType.TEST)).toEqual(testPriceRange);
        });
    });

    it('has a knowledge of the market', () => {
        expect(agent.market).toBeDefined();
    });


    it('determines a price to pay via a uniformly random distribution', () => {
        const actualAskingPrice = agent.getPriceOf(testCommodityType);
        expect(actualAskingPrice).toBeGreaterThan(testPriceRange.minimum - 1);
        expect(actualAskingPrice).toBeLessThan(testPriceRange.maximum + 1);
    });

    it('the outcome of a trade positivly or negatively reinforces price beliefs', () => {

    });

    it('positive reinforcement shrinks the price beliefs around the mean', () => {

    });

    it('negative reinforcement grows the price beliefs around the mean', () => {

    });

    it('changes price beliefs if enough negative reinforcement events happen', () => {

    });

    it('knows what commodoties it needs to trade', () => {

    });

    it('determines a fair price for commodoties to trade', () => {

    });

    it('creates a bid for a commodity', () => {
        const expectedBid = new Transaction(testCommodityType, 35, 714, agent.agentId, 0);
        const actualBid = agent.createBid(testCommodityType);
        delete actualBid.bidPrice;
        delete expectedBid.bidPrice;
        expect(actualBid).toEqual(expectedBid);
    });

    it('creates an ask for a commodity', () => {
        agent.inventory.set(testCommodityType, 1000);
        const expectedAsk = new Transaction(testCommodityType, 35, 179, agent.agentId, 0);
        const actualAsk = agent.createAsk(testCommodityType);
        delete actualAsk.bidPrice;
        delete expectedAsk.bidPrice;
        expect(actualAsk).toEqual(expectedAsk);
    });

    it('determines favorability of conditions for purchasing', () => {
        const expectedFavorability = 0.7142857142857143;
        const actualFavorability = agent.getMarketFavorabilityOf(testCommodityType);
        expect(actualFavorability).toEqual(expectedFavorability);
    });

    it('determines the amount of commodity to purchase', () => {
        const expectedBuyAmount = 714;
        const actualBuyAmount = agent.determineAmountToBuy(testCommodityType);
        expect(actualBuyAmount).toEqual(expectedBuyAmount);
    });

    it('determines the amount of commodity to sell', () => {
        const expectedSellAmount = 0;
        const actualSellAmount = agent.determineAmountToSell(testCommodityType);
        expect(actualSellAmount).toEqual(expectedSellAmount);
    });

    it('determines the amount of commodity to sell when there is excess', () => {
        agent.inventory.set(testCommodityType, 1000);
        const expectedSellAmount = 179;
        const actualSellAmount = agent.determineAmountToSell(testCommodityType);
        expect(actualSellAmount).toEqual(expectedSellAmount);
    });

});