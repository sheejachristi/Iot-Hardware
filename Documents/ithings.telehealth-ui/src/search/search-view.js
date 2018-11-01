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
import '@polymer/paper-button/paper-button';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-spinner/paper-spinner-lite';
import '@polymer/iron-input/iron-input';
import '../shared-styles/paper-button-styles';
import '../shared-styles/input-styles';

class SearchView extends (GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
      <style include="paper-button-styles input-styles iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
          background-color: var(--pale-blue-grey);
          padding: 0px 40px;
          border-bottom: 2px solid var(--light-blue-grey);
          box-sizing: border-box;
          --paper-spinner-color:--primary-color;
          --paper-spinner-stroke-width: 2px;
        }
        .text {
          color: var(--app-accent-color);
          font-size: 24px;
          font-family: 'Roboto-Regular';
          text-align: center;
        }
        .search-title{
          font-size: 14px;
          text-align: center;
          font-family: 'Roboto-Regular';
          color: var(--app-text-color);
          text-decoration: underline;
          cursor: pointer;
        }
        .search-container {
          margin-top: 17px;
          overflow: hidden;
          padding: 15px 46px;
          z-index: 1;
        }
        :host([active]) .search-container {
          background: var( --light-theme-background-color);
          box-shadow:  0px -3px 0px rgba(47, 48, 66, 0.15);
        }
        .empty-div,
        .paper-button-container{
          @apply --layout-flex;
        }
        .paper-button-container {
          margin-top: 28px;
          margin-left: 5px;
        }
        paper-button.add-tmp {
          text-align: center;
        }
        iron-input {
          margin: 15px 0px;
          position: relative;
        }
        .close-search-container {
          margin-top: 16px;
          cursor: pointer;
        }
        :host([mode='NORMAL']) .close-search-container{
          display: none;
        }
        paper-icon-button{
          --iron-icon-fill-color: var(--app-accent-color);
        }
        paper-icon-button.search-remove-icon {
          padding: 0px;
          margin-right: 14px;
          top: 45px;
          width: 30px;
          height: 30px;
        }
        paper-spinner-lite{
          width: 16px;
          height: 16px;
          line-height:16px;
          position: absolute;
          right: 10px;
          top: 14px;
          color: var(--app-accent-color);
        }
        .search-icon {
          position: absolute;
          right: 0px;
          top: 5px;
        }
        .search-remove-icon.medium,
        .search-remove-icon.small{
           display: none;
         }
        @media (max-width: 767px) {
         :host {
           padding: 0px 4px;
         }
          paper-button {
            display: none; 
          }
         .paper-button-container,
         .empty-div {
          @apply  --layout-flex-none;
            margin: 0px;
         }
         .search-container {
          margin: 5px 0px 0px 0px;
          padding: 10px 16px;
         }
         .close-search-container {
            margin-top: 10px;
         }
        }
      </style>
      <div class="layout horizontal">
         <div class="empty-div"></div>
          <div class="flex-2 layout vertical search-container">
            <div class="text">Search for [[title]]</div>  
            <iron-input class="search-input">
                <input id="search" value="[[searchQuery]]" placeholder="Enter a search key" 
                      on-keydown="_onKeyDown" autocomplete="off">
                <paper-spinner-lite active="[[_searchInProgress]]"></paper-spinner-lite>
                <paper-icon-button on-tap="_onSearchIconTap" icon="icons:search" class="search-icon" hidden="[[_searchInProgress]]"></paper-icon-button>
            </iron-input>
        </div> 
        <div class="end layout vertical paper-button-container">
           <paper-button class="filledBlue add-tmp" on-tap="_showCreate">create new [[title]]</paper-button>
           <paper-icon-button icon="icons:close" class$="[[_screenSize]] close-icon search-remove-icon" on-tap="_reset" hidden="[[_hideClose]]"></paper-icon-button>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      title: {
          type: String
      },
      searchQuery: {
        type: String,
        notify: true
      },
      mode: {
        type: String,
        value: 'NORMAL',
        reflectToAttribute: true,
        notify: true
      },
      _searchResult: {
        type: Array
      },

      active: {
        type: Boolean,
        reflectToAttribute: true,
        value: true,
        notify: true,
        observer: "_hideCloseIcon"
      },
      _searchInProgress: {
        type: Boolean,
        value: false
      },
      enableClose: {
          type: Boolean,
          value: false
      },
      _hideClose: {
          type: Boolean,
          value: true
      }
    };
  }

  _hideCloseIcon(){
    if (!this.enableClose) {
        this._hideClose = true;
        return true;
    }

    if(this.mode === 'NORMAL' && this.active){
      this._hideClose = false;
      return false;
    }

    this._hideClose = true;
    return true;
  }
  

  _onKeyDown(e) {
    if(e.keyCode !== 13) {
      return;
    }

    let noDelay = true;
    this._search(noDelay);
  }

  _onSearchIconTap(){
    let noDelay = true;
    this._search(noDelay);
  }

  _search(noDelay){
      this.searchQuery = this.$.search.value;
      this.active = true;
      this.dispatchEvent(new CustomEvent("search-changed", { detail: { search: this.searchQuery }}));
  }

  _reset() {
    this.mode = "NORMAL";
    this.active = false;
    this.dispatchEvent(new CustomEvent("close-listview", { detail: { "closed": "true" }}));
  }

  _showCreate() {
      this.dispatchEvent(new CustomEvent("open-createnew"));
  }
}

window.customElements.define('search-view', SearchView);
