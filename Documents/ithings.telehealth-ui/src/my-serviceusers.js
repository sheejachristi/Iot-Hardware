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
import './dialogs/subscriber-add.js';
import './api/telehealthcareflow-searchsubscribers.js';

class MyServiceUsers extends PolymerElement {
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
      <search-view search-query="{{searchQuery}}" mode="{{_mode}}" title="Service User" on-open-createnew="_openCreateNew" on-search-changed="_triggerSearch"></search-view> 
      <search-listview class="search-result" columns="[[columns]]"
        search-result="{{searchResult}}" mode="{{_mode}}" on-action-edit="_showDetails"></search-listview>
      <telehealthcareflow-searchsubscribers id="searchsubscribers" on-subscriber-result="_setupResult"></telehealthcareflow-searchsubscribers>
      <subscriber-add id="addsubscriber" on-serviceuser-created="_serviceUserEdit"></subscriber-add>
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
      this.$.searchsubscribers.search(this.searchQuery);
  }

  _setupResult(event) {
      console.log(event.detail);
      this.searchResult = event.detail.subscribers.subscribers;
  }

  _openCreateNew() {
      this.$.addsubscriber.open();
  }

  _serviceUserEdit(event) {
      this._triggerSearch();
      var email = event.detail.email;
  }

  _showDetails(event) {
     console.log(event.detail.email);
      var subscriber = event.detail.data;
      this.dispatchEvent(new CustomEvent("change-page", { detail: { activepage: "subscribergeneral", activedata: "email=" + subscriber.email + "&name=" + subscriber.name }}));
  }
}

window.customElements.define('my-serviceusers', MyServiceUsers);
