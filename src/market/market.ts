import { Commodity } from "../commodity/commodity";
import { CommodityType } from "../commodity/commodity-types";

export class Market {

    commodities = new Map<CommodityType, Commodity>();

    constructor() { }

    addCommodity(commodity: Commodity): void {
        this.commodities.set(commodity.type, commodity);
    }

    getCommodity(commodityType: CommodityType): Commodity {
        const commodity = this.commodities.get(commodityType) || null;
        if (!commodity) {
            throw new Error('Commodity Does not exist');
        }
        return commodity;
    }

    getHistoricalMeanPriceOf(commodityType: CommodityType): number {
        return this.getCommodity(commodityType).getHistoricalMean();
    }

}