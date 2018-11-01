/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import './search/search-view.js';
import './search/search-listview.js';
import './dialogs/user-add.js';
import './dialogs/user-edit.js';
import './api/telehealthcareflow-searchtecusers.js';

class MyProviderUsers extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
          position: relative;
          background-color: var(--pale-blue-grey);
          @apply --layout-vertical;
          margin: 26px 40px 0px 40px;
        }
        .search-result {
          display: none;
        }
        :host .search-result { 
          display: flex;          
          box-shadow: 0px -3px 0px rgba(47, 48, 66, 0.15);          
          background: white;
          padding: 92px 24px 34px 24px;
          margin: -60px 40px 40px 40px;
        }
        :host .event-templates-list{
          display: none;
        }
        :host([_screen-size='small']){
           overflow: auto;
        }
        :host([_view="CREATE_TEMPLATE"]){
          background-color: var(--light-theme-background-color);
          margin-top: 11px;
        }
        @media (max-width: 767px) {
          :host {
           overflow-y: auto;
         }
         :host .search-result {
            box-shadow: none;
            margin: 0px 4px 4px 4px;
            padding: 8px 5px 5px 5px;
         }
         :host {
           margin: 8px;
         }
        }
      </style>
      <search-view search-query="{{searchQuery}}" mode="{{_mode}}" title="User" on-open-createnew="_openCreateNew" on-search-changed="_triggerSearch"></search-view> 
      <search-listview class="search-result" columns="[[columns]]"
        search-result="{{searchResult}}" mode="{{_mode}}"  on-action-edit="_showDetails"  title="Edit"></search-listview>
      <telehealthcareflow-searchtecusers id="searchusers" on-tec-users="_setupResult"></telehealthcareflow-searchtecusers>
      <user-add id="adduser" on-user-created="_triggerSearch"></user-add>
      <user-edit id="edituser" on-user-edited="_triggerSearch"></user-edit>
    `;
  }

  static get properties() {

    return {
      columns: {
          type: Array,
          value: [
              { flex: "flex-1", label: "email" },
              { flex: "flex-2", label: "name" },
              { flex: "flex-1", label: "phone" },
              { flex: "flex-1", label: "role" }
          ]
      },
      searchQuery: {
          type: String,
          value: "",
          notify: true,
      },
      _mode: {
        type: String,
        reflectToAttribute: true
      },

      searchResult: {
          type: Array,
          value: []
      },

      _view: {
        type: String,
        reflectToAttribute: true
      },

      _screenSize: {
        type: String,
        reflectToAttribute: true
      }
    }
  }

  loadData() {
      this._triggerSearch();

  }

  _triggerSearch() {

      this.$.searchusers.search(this.searchQuery);

  }

  _setupResult(event) {
      
      this.searchResult = event.detail.users.users;

     
  }

  _openCreateNew() {
      this.$.adduser.open();
  }
_openEdit() {
     

  }
_showDetails(event) {
      var user = event.detail.data;
      this.dispatchEvent(new CustomEvent("change-page", { detail: { activepage: this.$.edituser.open()}}));
      this.$.edituser.loadData(event.detail.data.email);
  }
}

window.customElements.define('my-providerusers', MyProviderUsers);
