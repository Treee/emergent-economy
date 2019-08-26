import { CommodityType } from "../commodity/commodity-types";

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

    constructor() {
        this.priceBeliefs.set(CommodityType.TEST, new PriceRange(0, 42));
    }

    getPriceRangeOf(commodityType: CommodityType): PriceRange {
        return this.priceBeliefs.get(commodityType) || new PriceRange();
    }

    getPriceOf(commodityType: CommodityType) {
        return this.getPriceRangeOf(commodityType).getIdealPrice();
    }
}