/** @jsx h */
import { h } from "skatejs";
import { ReduxComponent } from "../lib/";
import { requestSiteData } from "../reducers/site";

class AppHeader extends ReduxComponent {
  styles = () => require("./header.css").toString();

  static get props() {
    return {
      _name: undefined
    };
  }

  constructor() {
    super();
    this._name = "Loading";
    this.dispatch(requestSiteData());
  }

  onStoreChange() {
    const { Site } = this.getStoreState();
    this._name = Site.siteName || this._name;
  }

  render() {
    return (
      <div class="header">
        <span class="text-large">{this._name}</span>
      </div>
    );
  }
}

customElements.define("app-header", AppHeader);
