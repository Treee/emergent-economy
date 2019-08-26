import { CommodityType } from "../commodity/commodity-types";
import { Market } from "../market/market";

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

export class Bid {
    quantity: number;
    commodityType: CommodityType;

    constructor(quantity: number, commodityType: CommodityType) {
        this.quantity = quantity;
        this.commodityType = commodityType;
    }
}

export class Agent {

    priceBeliefs = new Map<CommodityType, PriceRange>();
    inventory = new Map<CommodityType, number>();

    market: Market;

    maxCommodity = 1000;

    constructor(market: Market) {
        this.market = market;
        this.priceBeliefs.set(CommodityType.TEST, new PriceRange(0, 42));
    }

    // return Math.min(Math.max(this, min), max);

    determineAmountToBuy(commodityType: CommodityType): number {
        const currentQuantity = this.inventory.get(commodityType) || 0;
        const availableInventorySpace = Math.max(this.maxCommodity - currentQuantity, this.maxCommodity);
        const marketFavorability = this.getMarketFavorabilityOf(commodityType);
        return Math.round(marketFavorability * availableInventorySpace);
    }

    getMarketFavorabilityOf(commodityType: CommodityType): number {
        const commodityPriceRange = this.getPriceRangeOf(commodityType);
        const currentValue = this.getHistoricalMeanPriceOf(commodityType);
        const favorability = (currentValue - commodityPriceRange.minimum) / (commodityPriceRange.maximum - commodityPriceRange.minimum);
        return favorability;
    }

    getHistoricalMeanPriceOf(commodityType: CommodityType): number {
        return this.market.getCommodity(commodityType).getHistoricalMean();
    }

    getPriceRangeOf(commodityType: CommodityType): PriceRange {
        return this.priceBeliefs.get(commodityType) || new PriceRange();
    }

    getPriceOf(commodityType: CommodityType) {
        return this.getPriceRangeOf(commodityType).getIdealPrice();
    }
}