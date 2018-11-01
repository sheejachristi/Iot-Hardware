/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-menu-button/paper-menu-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-input/iron-input';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-listbox/paper-listbox';
import '../../../shared-styles/paper-menu-button-styles';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior';

/**
* @customElement
* @polymer
*/
class IthRecipientsSettings extends mixinBehaviors([IronFormElementBehavior], PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-alignment iron-flex-factors paper-menu-button-styles">
      :host {
        --paper-listbox-width: 458px;
        height: 50px;
        --paper-menu-button:{
           width: 100%;
        };
        --paper-checkbox-label: {
          display: none;
        }
        --paper-checkbox-checked-color: var(--light-theme-background-color);
        --paper-checkbox-checkmark-color: var(--app-accent-color);
        --paper-checkbox-checked-ink-color: var(--app-accent-color);
      }
      paper-checkbox #checkboxContainer #checkbox.checked {
        background-color: #ff0000);
        border-color:  #ff0000);
      }
      paper-menu-button paper-listbox paper-checkbox {
          padding: 0px;
          border-bottom: none;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        paper-menu-button paper-listbox{
          box-shadow: 0px 3px 0px rgba(189, 203, 213, 1) !important;
        }
        .checkbox-title {
          font-size: 14px;
          font-family: 'Roboto-Regular';
          color: var(--app-accent-color);
          padding: 5px 8px 5px 10px;
          text-align: center;
          border-bottom:  1px solid var(--border-color);
          outline: none;
        }
        .list-container {
          outline: none;
          padding: 0px 8px 0px 20px;
          border-bottom:  1px solid var(--border-color);
          cursor: pointer;
        }
        .list-container:hover{
          background-color:var(--hover-color);
        }
    </style>
    
    <paper-menu-button  readonly no-animations horizontal-align="left" name="[[name]]"
    vertical-offset="[[verticalOffset]]" ignore-select opened="{{opened}}">
        
        <div class="dropdown-trigger" slot="dropdown-trigger">
            <paper-input  label="[[label]]" type="text" invalid="[[invalid]]" readonly disabled="[[disabled]]" value="[[_title]]" no-label-float placeholder="[[placeholderText]]">
              <iron-icon icon="icons:expand-more" suffix slot="suffix"></iron-icon>
            </paper-input>
        </div>
        <paper-listbox slot="dropdown-content" multi class="dropdown-menu" 
        selected-values="{{_selectedValues}}" attr-for-selected="name">
           <div class="layout horizontal checkbox-title">
                <div class="flex-5"></div>
                <div class="email flex-1">EMAIL</div>
                <div class="email flex-1">SMS</div>
                <div class="email flex-1">APP</div>
            </div>
            
          <template is="dom-repeat" items="[[items]]">
              <div class="layout horizontal center list-container">
                  <div class="flex-5 dropdown-title">[[item.name]]</div>
                  <paper-checkbox 
                    name="[[item.id]]" 
                    class="flex-1"
                    id="EMAIL"
                    checked="[[_isSelectedItem(item.id, 'EMAIL')]]" 
                    on-checked-changed="_onCheckedChanged">
                  </paper-checkbox>
                  <paper-checkbox 
                    name="[[item.id]]" 
                    class="flex-1"
                    id="SMS"
                    checked="[[_isSelectedItem(item.id, 'SMS')]]" 
                    on-checked-changed="_onCheckedChanged">
                  </paper-checkbox>
                  <paper-checkbox 
                    name="[[item.id]]" 
                    class="flex-1"
                    id="APP"
                    checked="[[_isSelectedItem(item.id, 'APP')]]" 
                    on-checked-changed="_onCheckedChanged">
                  </paper-checkbox>
              </div>
          </template>
        </paper-listbox>
    </paper-menu-button>
    
    `;
  }

  static get properties() {
    return {

      /**
       * List of multi select controller items
       */
      items: {
        type: Array,
        value: function() {
          return [];
        },
        observer: '_onItemsChanged'
      },

      inputValue: {
        type: Array,
        observer: '_onInputValueChanged'
      },

      /**
       * It is an input and output property.
       * Pass array of Item id to select by default it.
       * e.g. [{id: 1, name: 'Bed Sensor'}, {id: 2, name: 'Move Sensor'}]
       */
      value: {
        type: Array,
        notify: true,
        value: function () {
          return [];
        }
      },


      /**
       * Default placeholder text of trigger element.
       */
      placeholderText: {
        type: String,
        value: 'Select recipients'
      },


      /**
       * True if the dropdown is open. Otherwise, false.
       */
      opened: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
        value: false
      },

      /**
       * The orientation against which to align the menu dropdown
       * horizontally relative to the dropdown trigger.
       */
      horizontalAlign: {
        type: String,
        value: 'right'
      },

      /**
       * The orientation against which to align the menu dropdown
       * vertically relative to the dropdown trigger.
       */
      verticalAlign: {
        type: String,
        value: 'top'
      },

      /**
       * Overrides the vertical offset computed in
       * _computeMenuVerticalOffset.
       */
      verticalOffset: {
        type: Number,
        value: 48
      },

      name: String,

      _title: {
        type: String,
        value: '0 contacts'
      }
    };
  }

  static get observers() {
    return ['_computeTitle(value.*)'];
  }

  _computeTitle(){
    if(!this.value || !this.value.length){
      this.set('_title', '0 contacts');
      return;
    }

    this.set('_title', `${this.value.length} contacts`);
  }

  _onCheckedChanged(e){
    var isChecked = e.detail.value;
    var contactId = e.target.name;
    var setting = e.target.id;
    var num;

    var index = this.value.findIndex(function(item){
      var key = Object.keys(item)[0];
      return contactId === key;
    });
    
    if(index === -1 && isChecked){
      this._addNewRecipents(setting, contactId);
      return;
    }
    
    if(isChecked){
      this._addNewSetting(index, contactId, setting);
      return;
    }
    
    this._removeSetting(index, contactId, setting);
  }
  
  _addNewRecipents(setting, contactId){
    var obj = {};
    obj[contactId] = [setting];
    this.push('value', obj);
  }
  
  _addNewSetting(index, contactId, setting){
    var item = this.value[index];
    var settings = item[contactId];
    
    settings.splice(0, 0, setting);
    this.splice('value', index, 1, item);
  }
  
  _removeSetting(index, contactId, setting){
    var item = this.value[index];
    var settings = item[contactId];
    var i = settings.indexOf(setting);

    if(i === -1){
      return;
    }
   

    settings.splice(i, 1);

    if(!item[contactId].length){
      this.splice('value', index, 1);
      return;
    }

    this.splice('value', index, 1, item);
  }
  
  _onItemsChanged(){
    this._notification = this.items.reduce(function(map, item, idx, arr) {
      var key = Object.keys(item)[0];
      map[key] = item[key];
      return map;
    }, {});
  }

  _isSelectedItem(id, key){
    if(!this._recipients){
      return;
    }

     var recipientInfo =  this._recipients[id];

     if(!recipientInfo){
       return;
     }

     if(recipientInfo.indexOf(key) === -1){
       return false;
     }

     return true;
  }

  _onInputValueChanged(){
    if(!this.inputValue || !Object.keys(this.inputValue).length){
      return;
    }
    
    var arrayIsNew = JSON.parse(JSON.stringify(this.inputValue));
    var anotherObject = {};
    this.set('value', arrayIsNew);
   
    arrayIsNew.forEach((item) => {
      Object.keys(item).forEach(function(key) {
        anotherObject[key] = item[key];
      });
    });

    this.set('_recipients', anotherObject);
  }
}

window.customElements.define('ith-recipients-settings', IthRecipientsSettings);
