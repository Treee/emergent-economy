import { CommodityType } from "./commodity-types";

export class Commodity {
    type: CommodityType;
    value: number;

    constructor(type: CommodityType, value: number) {
        this.type = type;
        this.value = value;
    }
}