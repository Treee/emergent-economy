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
import { Commodity } from '../commodity/commodity';
import { CommodityType } from '../commodity/commodity-types';

describe('Agent', () => {
    let agent: Agent;
    const testCommodityPrice = 42;
    const testCommodityType = CommodityType.TEST;
    const testCommodity = new Commodity(testCommodityType, testCommodityPrice);
    const testPriceRange = new PriceRange(0, testCommodityPrice);

    beforeEach(() => {
        agent = new Agent();
    });

    describe('Price Beliefs', () => {
        it('has a set of price beliefs for each commodity it can buy or sell', () => {
            expect(agent.getPriceRangeOf(CommodityType.TEST)).toEqual(testPriceRange);
        });

    });


    it('has an upper and lower bound for its price beliefs', () => {

    });

    it('selects a uniformly random value from its price belief', () => {

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

    it('determines quantities of commodoties to trade', () => {

    });

    it('creates a bid for a commodity with a limit to buy', () => {

    });

    describe('Create Bid To Buy', () => {
        it('determines a price to pay', () => {
            const actualAskingPrice = agent.getPriceOf(testCommodityType);
            expect(actualAskingPrice).toBeGreaterThan(testPriceRange.minimum - 1);
            expect(actualAskingPrice).toBeLessThan(testPriceRange.maximum + 1);
        });
    });

    describe('Create Ask To Sell', () => {

        it('when agent needs money', () => {

        });

        it('when there is a surplus of inventory', () => {

        });

        it('when there are favorable market conditions', () => {

        });
    });



});