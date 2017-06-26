/** @jsx h */
import { Component as SkateComponent, h } from "skatejs";
import Store from "../store";

export class Component extends SkateComponent {
  styles() {
    return "";
  }

  renderCallback() {
    return (
      <div>
        <style>
          @import "wp-content/themes/custom-theme/style.css";
          {this.styles()}
        </style>
        {this.render()}
      </div>
    );
  }
}

export class ReduxComponent extends Component {
  constructor() {
    super();
    this.store = Store.subscribe(() => this.onStoreChange());
  }

  dispatch(anAction) {
    Store.dispatch(anAction);
  }

  getStoreState() {
    return Store.getState();
  }

  onStoreChange() {
    console.warn("This component has no store listener.");
  }

  disconnectedCallback() {
    this.store.unsubscribe();
  }
}
