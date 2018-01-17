export const DEFAULT_TAB_ID_TYPE: string = "__TAB_ID__";

/**
 * Responsible for responding to tab inquiries from
 * outside of event page with the tabId of the requester
 */
export class TabIdentifier {
  public tabIdType: string = DEFAULT_TAB_ID_TYPE;

  constructor(tabIdType?: string) {
    if (tabIdType) {
      this.tabIdType = tabIdType;
    }

    this.onMessage = this.onMessage.bind(this);

    chrome.runtime.onMessage.addListener(this.onMessage);
  }

  /**
   * When message is received, send a response
   * containing the tabId of the sender
   */
  onMessage(message, { tab }, sendResponse): void {
    if (message.type === this.tabIdType && !!tab) {
      sendResponse({ tabId: tab.id });
    }
  }

  destroy(): void {
    chrome.runtime.onMessage.removeListener(this.onMessage);
  }
}

export class TabIdentifierClient {
  public tabIdType: string = DEFAULT_TAB_ID_TYPE;
  private tabId?: number;

  constructor(tabIdType?: string) {
    if (tabIdType) {
      this.tabIdType === tabIdType;
    }

    this.tabId = null;
  }

  /**
   * Attempts to get the current
   * tabId via message sent to event page. If
   * the tab has already been fetched, this will
   * return a cached result
   */
  getTabId(): Promise<number> {
    if (this.tabId) {
      return Promise.resolve(this.tabId);
    }

    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: this.tabIdType }, ({ tabId }) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          this.tabId = tabId;
          resolve(tabId);
        }
      });
    });
  }
}
