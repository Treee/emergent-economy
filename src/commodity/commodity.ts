import { CommodityType } from "./commodity-types";

export class Commodity {
    type: CommodityType;
    value: number;

    historicalPrices: number[] = [];

    constructor(type: CommodityType, value: number) {
        this.type = type;
        this.value = value;
    }

    makeTrade(price: number) {
        this.historicalPrices.push(price);
    }

    getHistoricalMean(): number {
        return this.historicalPrices.reduce((total, num) => {
            return total + num;
        }) / this.historicalPrices.length;
    }
}