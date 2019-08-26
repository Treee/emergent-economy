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
    excessThreshhold = 750;

    constructor(market: Market) {
        this.market = market;
        this.priceBeliefs.set(CommodityType.TEST, new PriceRange(0, 42));
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