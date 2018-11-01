import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes'
import  '@polymer/iron-icon/iron-icon';
import  '@polymer/paper-button/paper-button';
import  '@polymer/paper-tooltip/paper-tooltip'
import '../shared-styles/paper-button-styles';

class SearchItem extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex paper-button-styles iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
        }
        .cell-margin {
          margin-right: 2px;
        }
        .row {
          margin-bottom: 2px;
          min-height: 100px;
          flex-wrap: wrap;
        }
        .cell-content {
          padding: 19px 20px 19px 20px;
          border-right: 2px solid var(--light-theme-background-color);
        }
        paper-button.btn{
          min-width: 110px;
        }
        .in-use-btn{
            color: var(--app-accent-color);
        }
        .title-content {
          font-size: 16px;
          font-family: 'Roboto-Bold';
          color: var(--app-text-color);
        }
        .description-content {
          font-size: 14px;
          font-family: 'Roboto-Regular';
          color: var(--app-text-color);
          border-right: 2px solid var(--light-theme-background-color);
          padding: 19px 52px 19px 20px;
        }
        iron-icon.sensor-icon {
          --iron-icon-fill-color: var(--app-accent-color);
        }
        .in-used-label {
          min-width: 110px;
          font-size: 16px;
          font-family: 'Roboto-Regular';
          color: var(--app-text-color);
        }
        @media (max-width: 767px) {
         .sensor-container{
           display: none !important;
         }
         .cell-content {
          padding: 0px;
          min-width: 100%;
          border-right: 0px;
          box-sizing: border-box;
         }
         .cell-margin {
          margin-right: 0px;
         }
         .row{
           margin-bottom: 8px;
           padding: 17px;
         }
         .description-content { 
           padding: 16px 0px;
           border-right: none;
         }
        }
      </style>
      <div class="layout horizontal row">
        <template is="dom-repeat" items="[[columns]]" as="column">
            <div class="description-content cell-margin title-content flex-1">[[_getValue(column.label)]]</div>
        </template>
        
        <div class="cell-content  center-justified flex-1">
            <template is="dom-repeat" items="[[actions]]" as="action">
                <paper-button id="[[action.id]]btn" class="filledBlue btn" on-tap="_dispatchAction">[[action.label]]</paper-button>
            </template>
        </div>
      </div>        
    `;
  }

  static get properties() {
    return {
      columns: {
          type: Array,
          value: [ 
              { label: 'title', flex: 'flex-1' }, 
              { label: 'description', flex: 'flex-2' }
          ]
      },
      actions: {
          type: Array,
          value: [ 
              { id: 'edit', label: '+ EDIT' }
          ]
      },
      template: Object,
    }
  }

  _dispatchAction(event) {
      var name = event.model.action.id;
      this.dispatchEvent(new CustomEvent('action-item', { detail: { data: this.template, action: name }}));
  }

  _getValue(name) {
      return this.template[name];
  }
}

window.customElements.define('search-item', SearchItem);
