import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';

class IthChipView extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
        }
        paper-icon-button.close-icon{
          --iron-icon-fill-color: var(--app-accent-color);
          padding: 0px;
          width: 20px;
          height: 20px;
        }
        .chip-container {
          border: 1px solid var(--pale-blue-grey);
          padding: 0px 10px;
          min-height: 29px;
          box-sizing: border-box;
        }
        .chip-text {
          font-size: 14px;
          padding-right: 17px;
          font-family: 'Roboto-Regular';
        }
        .chip-container{
          background: #F1F9FF;
          border-radius: 5px;
          margin-right: 10px;
        }
      </style>
     <div class="layout center horizontal chip-container">
         <div class="chip-text">[[name]]</div>
         <paper-icon-button icon="icons:close" class="close-icon" on-tap="_dispatchRemoveEvent"></paper-icon-button>
      </div>
    `;
  }

  static get properties() {
    return {
      id: String,
      name: String
    }
  }

  _dispatchRemoveEvent(){
    this.dispatchEvent(new CustomEvent('remove', {detail: {id: this.id}}));
  }
}

window.customElements.define('ith-chip-view', IthChipView);
