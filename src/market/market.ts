import { Commodity } from "../commodity/commodity";
import { CommodityType } from "../commodity/commodity-types";

export class Transaction {
    commodityType: CommodityType;
    bidPrice: number;
    quantity: number;
    userId: string;
    transactionId: number;

    constructor(commodityType: CommodityType, price: number, quantity: number, agentId: string, transactionId: number) {
        this.commodityType = commodityType;
        this.bidPrice = price;
        this.quantity = quantity;
        this.userId = agentId;
        this.transactionId = transactionId;
    }
}

export class Market {

    commodities: Map<CommodityType, Commodity> = new Map<CommodityType, Commodity>();

    bids: Transaction[] = [];
    asks: Transaction[] = [];

    constructor() { }

    addBid(transaction: Transaction): void {
        this.bids.push(transaction);
    }

    addAsk(transaction: Transaction): void {
        this.asks.push(transaction);
    }

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