import { Commodity } from "../commodity/commodity";
import { CommodityType } from "../commodity/commodity-types";

export class Market {

    commodities = new Map<CommodityType, Commodity>();

    constructor() { }

    addCommodity(commodity: Commodity): void {
        this.commodities.set(commodity.type, commodity);
    }

    getCommodity(commodityType: CommodityType): Commodity | null {
        return this.commodities.get(commodityType) || null;
    }

}