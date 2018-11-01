/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-toast/paper-toast';
import '@polymer/iron-media-query/iron-media-query';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-styles/default-theme';
import '../shared-styles/paper-button-styles';
import '../shared-styles/input-styles';
import '../shared-styles/shared-styles';
import '../elements/loader-view/loader-view';
import "./search-item";

class SearchListView extends PolymerElement {
  static get template() {
    return html `
      <style include="shared-styles input-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
        :host {
          @apply --layout-vertical;
        }
        .cell-content {
          padding: 0px 20px 0px 20px;
          border-right: 2px solid var(--light-theme-background-color);
        }
        .header-description {
          padding: 0px 52px 0px 20px;
          border-right: 2px solid var(--light-theme-background-color);
        }
        .header-cell-margin {
          margin-right: 2px;
        }
        .list {
          overflow: auto;
        }
        .header-last-child {
          min-width: 110px;
        }
        :host([mode='NORMAL']) .advance-search-main-container{
          display: none;
        }
        :host([_screen-size='small']) .list{
           overflow: initial;
         }
        .advance-search-main-container {
          margin-bottom: 24px;
          font-size: 14px;
          font-family: 'Roboto-Regular';
          color: var(--app-text-color);
        }
        .dropdown-margin {
          margin-right: 24px;
        }
        .search-btn-container{
          margin-top: 24px;
        }
        paper-button.search-btn{
          width: 110px;
        }
        .loader-container{
          position: relative;
          min-height: 100px;
        }
        .no-record-view{
          text-align: center;
          font-size: 18px;
          color: var(--app-text-color);
          font-family: 'Roboto-Regular';
        }
        .from-drop-down{
          margin-right: 16px;
        }
        search-item.event-row{
          background: var(--table-background-color);
        }
        search-item.event-row:nth-of-type(odd){
          background: var(--very-pale-blue-grey);
        }
        #search {
          font-size: 16px;
        }
        @media (max-width: 767px) {
        .header-cell-margin {
          margin-right: 0px;
         }
         .dropdown-container {
          min-width: 100%;
         }
         .dropdown-margin{
          margin: 0px 0px 16px 0px;
         }
         .advance-search-main-container  {
           margin-bottom: 16px;
           padding: 0px 30px;
         }
         .advance-search-container {
           flex-wrap: wrap;
         }
        }
      </style>

    <div class="advance-search-main-container">
      <div class="search-btn-container layout vertical end">
        <paper-button class="borderBlue search-btn" on-tap="_search">
          <iron-icon icon="icons:search"></iron-icon>
            search
        </paper-button>
      </div>
     </div>

     <template is="dom-if" if="[[_showLoaderView(_searchInProgress, searchResult)]]" observe="#">
      <div class="loader-container">
        <loader-view></loader-view>
      </div>
     </template>

      <div class="list">
        <div class="layout horizontal header-list-container">
          <template is="dom-repeat" items="[[columns]]">
              <div class="header-cell-margin cell-content layout vertical center-justified flex-1">[[item.label]]</div>
          </template>
          <div class=" layout vertical cell-content center-justified flex-1 header-last-child"></div>
        </div>
        <template is="dom-repeat" items="[[searchResult]]" observe="#">
            <search-item template="[[item]]" class="event-row"
                  columns="[[columns]]"
                  actions="[[actions]]"
                  on-action-item="_doAction">
            </search-item>
        </template>      
     </div>
     
     <paper-toast opened="[[_showToast(_searchFailureReason)]]" text="Search request failed"></paper-toast>
    `;
  }

  static get properties() {
    return {
      actions: {
          type: Array,
          value: [
          { id: 'edit', label: '+ EDIT' }
          ]
      },
      columns: {
          type: Array
      },
      mode: {
        type: String,
        notify: true,
        reflectToAttribute: true,
        value: 'NORMAL'
      },

      _screenSize: {
        type: String,
        reflectToAttribute: true
      },

      _searchInProgress: {
        type: Boolean,
        value: false
      },

      _searchFailureReason: Object,

      searchResult: {
        type: Array,
        value: []
      },
    };
  }

 connectedCallback(){
   super.connectedCallback();
 }

  _onKeyDown(e) {
    if(e.keyCode !== 13) {
      return;
    }

    let noDelay = true;
    this._search(noDelay);
  }

  _search(){
    var searchValue = this.$.search.value;
   
    //TODO: call search here?
    //store.dispatch(search(searchValue, devices, catgories, timeFrom, timeTo, true));
  }

  _showToast(failedReason){
    return failedReason;
  }

  _showLoaderView(searchReqInprogress, reaseResults){
    return searchReqInprogress && (!reaseResults || !reaseResults.length);
    }

  _hasSearchResults(searchResult){
    if(searchResult && searchResult.length){
      return true;
    }

    return false;
  }

  _doAction(event) {
      var action = event.detail.action;
      var object = event.detail.data;
      this.dispatchEvent(new CustomEvent("action-" + action, { detail: { data: object }}));
  }
}

window.customElements.define('search-listview', SearchListView);
