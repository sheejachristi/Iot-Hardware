import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import  '@vaadin/vaadin-dropdown-menu/vaadin-dropdown-menu';
import  '@vaadin/vaadin-item/vaadin-item';
import  '@vaadin/vaadin-list-box/vaadin-list-box';
import '../../../shared-styles/vaadin-dropdown-menu-styles';

class IthEventStatusSelect extends PolymerElement {
  static get template() {
    return html`
      <style include="vaadin-dropdown-menu-styles vaadin-item-styles vaadin-text-field-styles iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
        }
      </style>
      <vaadin-dropdown-menu id="dropdown" class="status-drop-down" label="[[label]]" placeholder="[[placeholder]]" value="{{_value}}" on-value-changed="_ondropDownValueChanged">
        <template>
          <vaadin-list-box>
            <vaadin-item>
             <iron-icon icon="icons:done" style="margin-right:8px; border: 2px solid #6CBE5E;border-radius: 50%;color:#6CBE5E;"></iron-icon>
                 active 
             </vaadin-item>
            <vaadin-item>
            <iron-icon icon="icons:close" style="margin-right:8px;border: 2px solid #DD422D;border-radius: 50%;color:#DD422D;"></iron-icon>
             inactive
            </vaadin-item>
          </vaadin-list-box>
        </template>
      </vaadin-dropdown-menu>
    `;
  }

  static get properties() {
    return {
      label: String,
      _value: {
        type: String,
        value: 'active'
      },
      value: {
        type: Object,
        notify: true,
        observer: '_onValueChanaged',
        value: function(){
          return {
            'active': true
          }
        }
      }
    } 
  }
  
  _onValueChanaged(){
    if(this.value.active){
      this.set('_value', 'active');
    }else {
      this.set('_value', 'inactive');
    }
  }

  _ondropDownValueChanged(){
    if(this._value === 'active'){
      this.set('value.' + 'active', true);
    }else{
      this.set('value.' + 'active', false);
    }
  }

  connectedCallback(){
    super.connectedCallback();

    var elDropDown = this.$.dropdown;
    var elTextField = elDropDown.shadowRoot.querySelector('vaadin-dropdown-menu-text-field');

    elTextField.setAttribute('class', 'status-drop-down');
  }
}

window.customElements.define('ith-event-status-select', IthEventStatusSelect);
