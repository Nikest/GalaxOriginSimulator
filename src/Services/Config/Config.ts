const GLOBAL_TYPE_NAMES = {
  AUCTION_DATA_TYPE_NAME: 'auctionData',
  AUCTION_STATUS_TYPE_NAME: 'auctionStatus',
  SLOTS_REMAINING_TYPE_NAME: 'slotsRemaining',
  ALL_BIDS_TYPE_NAME: 'allBid',
  ALL_POOLS_TYPE_NAME: 'allPools'
};

export class Config {
  public static get(key: string): any {
    if (key in window) {
      return window[key];
    }

    if (key in CONFIG) {
      return CONFIG[key];
    }

    if (key in GLOBAL_TYPE_NAMES) {
      return GLOBAL_TYPE_NAMES[key];
    }

    throw new Error(`${key} doesn't set`);
  }
}
