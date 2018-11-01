import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import  '@vaadin/vaadin-dropdown-menu/vaadin-dropdown-menu';
import  '@vaadin/vaadin-item/vaadin-item';
import  '@vaadin/vaadin-list-box/vaadin-list-box';
import '../../../shared-styles/vaadin-dropdown-menu-styles';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior';

class ItnDropdownMenu extends mixinBehaviors([IronFormElementBehavior], PolymerElement) {
  static get template() {
    return html`
      <style include="vaadin-dropdown-menu-styles vaadin-item-styles vaadin-list-box-styles vaadin-text-field-styles iron-flex iron-flex-factors iron-flex-alignment">
      </style> 
      <vaadin-dropdown-menu placeholder="[[placeholder]]" label="[[label]]" value="{{value}}" name="[[name]]">
        <template>
          <vaadin-list-box>
            <template is="dom-repeat" items="[[items]]">
              <vaadin-item hidden="[[valueIsObject]]" value="[[item]]">[[item]]</vaadin-item>
              <vaadin-item value="[[item.id]]" hidden="[[!valueIsObject]]">[[item.name]]</vaadin-item>
            </template>
          </vaadin-list-box>
        </template>
      </vaadin-dropdown-menu>
    `;
  }

  static get properties() {
    return {
      items: Array,
      label: String,
      value: {
        type: String,
        notify: true
      },
      placeholder: String,
      valueIsObject: {
        type: Boolean,
        value: false
      },
      name: String
    } 
  }
}

window.customElements.define('ith-dropdown-menu', ItnDropdownMenu);
