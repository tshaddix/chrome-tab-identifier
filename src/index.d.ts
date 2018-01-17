export declare const DEFAULT_TAB_ID_TYPE: string;
/**
 * Responsible for responding to tab inquiries from
 * outside of event page with the tabId of the requester
 */
export declare class TabIdentifier {
  tabIdType: string;
  constructor(tabIdType?: string);
  /**
   * When message is received, send a response
   * containing the tabId of the sender
   */
  onMessage(
    message: any,
    {
      tab
    }: {
      tab: any;
    },
    sendResponse: any
  ): void;
  destroy(): void;
}
export declare class TabIdentifierClient {
  tabIdType: string;
  private tabId?;
  constructor(tabIdType?: string);
  /**
   * Attempts to get the current
   * tabId via message sent to event page. If
   * the tab has already been fetched, this will
   * return a cached result
   */
  getTabId(): Promise<number>;
}
