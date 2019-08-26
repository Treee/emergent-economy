import { CommodityType } from "../commodity/commodity-types";
import { Market, Transaction } from "../market/market";

export class PriceRange {
    minimum: number;
    maximum: number;

    constructor(min: number = 0, max: number = 0) {
        this.minimum = min;
        this.maximum = max;
    }

    getIdealPrice() {
        return Math.floor(Math.random() * (this.maximum - this.minimum + 1)) + this.minimum;
    }
}

export class Agent {

    priceBeliefs = new Map<CommodityType, PriceRange>();
    inventory = new Map<CommodityType, number>();

    market: Market;

    maxCommodity = 1000;
    excessThreshhold = 750;

    bidCount = 0;
    askCount = 0;
    agentId: string;

    constructor(market: Market, agentId: string) {
        this.market = market;
        this.agentId = agentId;
        this.priceBeliefs.set(CommodityType.TEST, new PriceRange(0, 42));
    }

    createBid(commodityType: CommodityType): Transaction {
        const bidPrice = this.getPriceOf(commodityType);
        const amountToPurchase = this.determineAmountToBuy(commodityType);
        const transaction = new Transaction(commodityType, bidPrice, amountToPurchase, this.agentId, this.bidCount++);
        return transaction;
    }

    createAsk(commodityType: CommodityType): Transaction {
        const askPrice = this.getPriceOf(commodityType);
        const amountToSell = this.determineAmountToSell(commodityType);
        const transaction = new Transaction(commodityType, askPrice, amountToSell, this.agentId, this.askCount++);
        return transaction;
    }

    determineAmountToSell(commodityType: CommodityType): number {
        const currentQuantity = this.inventory.get(commodityType) || 0;
        const excessCommodity = Math.max(currentQuantity - this.excessThreshhold, 0);
        const marketFavorability = this.getMarketFavorabilityOf(commodityType);
        // console.log(`current: ${currentQuantity}, excess: ${excessCommodity}, favor: ${marketFavorability * 100}%, suggest: ${Math.round(marketFavorability * excessCommodity)}`);
        return Math.round(marketFavorability * excessCommodity);
    }

    determineAmountToBuy(commodityType: CommodityType): number {
        const currentQuantity = this.inventory.get(commodityType) || 0;
        const availableInventorySpace = Math.max(this.maxCommodity - currentQuantity, this.maxCommodity);
        const marketFavorability = this.getMarketFavorabilityOf(commodityType);
        return Math.round(marketFavorability * availableInventorySpace);
    }

    getMarketFavorabilityOf(commodityType: CommodityType): number {
        const commodityPriceRange = this.getPriceRangeOf(commodityType);
        const currentValue = this.market.getHistoricalMeanPriceOf(commodityType); (commodityType);
        const favorability = (currentValue - commodityPriceRange.minimum) / (commodityPriceRange.maximum - commodityPriceRange.minimum);
        return favorability;
    }

    getPriceRangeOf(commodityType: CommodityType): PriceRange {
        return this.priceBeliefs.get(commodityType) || new PriceRange();
    }

    getPriceOf(commodityType: CommodityType) {
        return this.getPriceRangeOf(commodityType).getIdealPrice();
    }
}