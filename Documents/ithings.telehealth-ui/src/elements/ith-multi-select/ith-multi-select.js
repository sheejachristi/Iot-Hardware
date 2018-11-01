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
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-input/paper-input';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-input/iron-input';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-listbox/paper-listbox';
import '../../../shared-styles/paper-menu-button-styles';

/**
* @customElement
* @polymer
*/
class IthMultiSelect extends PolymerElement {

  static get template() {
    return html`
      <style include="iron-flex iron-flex-alignment iron-flex-factors paper-menu-button-styles">
      :host {
        display: block;
        --paper-listbox-width: 320px;
        --paper-menu-button:{
           width: 100%;
        }
      }
    </style>
    
    <paper-menu-button no-label-float readonly no-animations horizontal-align="left" 
    vertical-offset="[[verticalOffset]]" ignore-select opened="{{opened}}" restore-focus-on-close="[[restoreFocusOnClose]]"
    on-iron-overlay-closed="_applySelection" on-iron-overlay-canceled="_applySelection" disabled="[[_isDisabled(items)]]">
      <div class="dropdown-trigger" slot="dropdown-trigger">
          <paper-input type="text" invalid="[[invalid]]" readonly disabled="[[disabled]]" value="[[_title]]" no-label-float placeholder="[[placeholderText]]">
            <iron-icon icon="icons:expand-more" suffix slot="suffix"></iron-icon>
          </paper-input>
      </div>
      <paper-listbox slot="dropdown-content" multi class="dropdown-menu" 
      selected-values="{{_selectedValues}}" attr-for-selected="name">
        <dom-repeat items="[[items]]">
          <template>
            <paper-checkbox hidden="[[isString]]" name="[[_getItemId(item, valueField)]]" checked="[[_isSelectedSensorItem(item, _selectedValues.*)]]">[[_getItemName(item, textField)]]</paper-checkbox>
            <paper-checkbox hidden="[[!isString]]" name="[[item]]">[[item]]</paper-checkbox>
          </template>
        </dom-repeat>
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
        }
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
       * Name of field which represents id of item in `items` object
       */
      valueField: {
        type: String,
        value: 'id'
      },

      /**
       * Name of field which represents name of item in `items` object
       */
      textField: {
        type: String,
        value: 'name'
      },

      /**
       * Default placeholder text of trigger element.
       */
      placeholderText: {
        type: String,
        value: ''
      },

      /**
       * Represents default text of trigger element when dropdown is opened
       */
      defaultText: {
        type: String,
        value: ''
      },

      /**
       * Trigger element title text representation format enum.
       * Possible values: `FIRST`, `ALL`
       * When its value is `FIRST` then shows title as `{Item Name} + {N}`
       * When its value is `FIRST` then shows title as `{Item Name}, {Item Name2}, {Item Name3}`
       */
      valueTextRepresentation: {
        type: String,
        value: 'FIRST'
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

      isString: {
        type: Boolean,
        value: false
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

      /**
       * If true, the `horizontalAlign` and `verticalAlign` properties will
       * be considered preferences instead of strict requirements when
       * positioning the dropdown and may be changed if doing so reduces
       * the area of the dropdown falling outside of `fitInto`.
       */
      dynamicAlign: {
        type: Boolean
      },

      /**
       * Whether focus should be restored to the dropdown when the menu closes.
       */
      restoreFocusOnClose: {
        type: Boolean,
        value: false
      },


      /**
       * Represents trigger element title which is computed from `items`, `value`, `valueTextRepresentation` and `defaultText` and `opened`
       */
      _title: {
        type: String,
        computed: '_computeTitle(items.*, value.*, defaultText, valueTextRepresentation, opened)'
      },
      

      /**
       * It represents actual selected sensors list of ids
       */
      _selectedValues: {
        type: Array,
        value: function () {
          return [];
        }
      }
    };
  }

  static get observers() {
    return ['_setSelectedValues(value.*)'];
  }

  /**
   * @return {Boolean} - `true` when `items` is not empty
   */
  _isDisabled() {
    return !this.items || !this.items.length
  }

  /**
   * @param {item} - Item object
   * @param {valueField} - Field name of id
   * @return {String | Number} - Id of item
   */
  _getItemId(item, valueField) {
    return item && item[valueField];
  }

  /**
   * @param {item} - Item object
   * @param {textField} - Field name of item name
   * @return {String | Number} - Name of item
   */
  _getItemName(item, textField) {
    return item && item[textField];
  }

  /**
   * Set `_selectedValues` as a `selectedValues`.
   */
  _setSelectedValues() {
    let self = this;
    self.set('_selectedValues', [...self.value]);
  }

  /**
   * Invoked when dropdown menu is closed
   * Set `selectedValues` from `_selectedValues`
   */
  _applySelection() {
    let self = this;
    if(self.isString){
      self.set('value', self._selectedValues);
    }

    self.set('value', [...self._selectedValues]);
  }

  /**
   * @param {Object} item - item
   * @param {Array} aSelectedItems - Selected item ids
   * @return {Boolean} - True if sensor item is selected
   *
   */
  _isSelectedSensorItem(item, aSelectedItems) {
    return (aSelectedItems.base.indexOf(this._getItemId(item, this.valueField)) !== -1)
  }

  /**
   * Computes trigger element title based `items`, `value`, `valueTextRepresentation` and `placeholderText`
   */
  _computeTitle() {
    let self = this;

    if(this.isString && this.value.length){
      var str = '';

      this.value.forEach(item => {
        if(!str){
          str = item;
        }else{
          str = str + ',  ' + item;
        }
      });

      return str;
    }

    //If there is no selection
    if (!self.value.length) {
      if(self.opened) {
        return self.defaultText;
      }
      return '';
    }

    //If there is selected items
    if (self.valueTextRepresentation === 'FIRST') {
      let sFirstSelectedItemName = self._getFirstSelectedItemName();
      if (self.value.length === 1) {
        return sFirstSelectedItemName;
      }

      return `${sFirstSelectedItemName} + ${self.value.length - 1}`;
    }

    return self._getAllSelectedItemsName().join(', ');

  }

  /**
   * @return {String} - First selected item name
   */
  _getFirstSelectedItemName() {
    let self = this;

    let sFirstSelectedItemName = '';
    self.items.forEach(item => {
      if (!sFirstSelectedItemName && self.value.includes(self._getItemId(item, self.valueField))) {
        sFirstSelectedItemName = self._getItemName(item, self.textField);
        return false;
      }
    });

    return sFirstSelectedItemName;
  }

  /**
   * @return {Array} - Array of selected items name
   */
  _getAllSelectedItemsName() {
    let self = this;

    let aAllSelectedItemsName = [];
    self.items.forEach(item => {
      if (self.value.includes(self._getItemId(item, self.valueField))) {
        aAllSelectedItemsName.push(self._getItemName(item, self.textField));
      }
    });

    return aAllSelectedItemsName;
  }

}

window.customElements.define('ith-multi-select', IthMultiSelect);
