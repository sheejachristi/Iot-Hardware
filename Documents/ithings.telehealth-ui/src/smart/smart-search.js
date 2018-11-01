import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './smart-client.js'

class SmartSearch extends PolymerElement {
  static get template() {
    return html`
        <smart-client id="client" flow="{{flow}}" flow-event="SearchEvent" on-smart-error="_handleError" on-smart-response="_handleResults"></smart-client>
    `;
  }

  static get properties() {
    return {
      flow: String,
      group: String,
      query: Object,
      sortBy: String,
      pageNum: { 
          type: Number,
          value: 1
      },
      pageSize: {
          type: Number,
          value: 20
      },
      ascending: {
          type: Boolean,
          value: true
      },
      searchResult: {
          type: Array,
          notify: true
      }
    }
  }

  search() {
      var postData = {};
      postData['group'] = this.group;
      postData['queryMap'] = this.query;
      postData['pageNum'] = this.pageNum;
      postData['pageSize'] = this.pageSize;
      if (this.sortBy != undefined) {
          postData['sortBy'] = this.sortBy;
          postData['ascending'] = this.ascending;
      }
      var postTo = {};
      postTo['FlowAdmin'] = this.flow;
      this.$.client.postSmart(postTo, postData);
  }

  _handleResults(evt) {
      var response = evt.detail.responses[0];
      this.searchResult = response['searchResult'];
  }

  _handleError(evt) {
    var error = evt.detail.errors[0];
    if (error != undefined) {
        this.dispatchEvent(new CustomEvent("smart-search-error", { detail: { "code" : error.code, "context" : error.context } }));
    }
  }
}

window.customElements.define('smart-search', SmartSearch);


