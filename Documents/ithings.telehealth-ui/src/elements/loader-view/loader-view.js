/*
  Element showing to show loader.

  ## Behaviors
  - Fits itself within it's parent Element
  - Shows loader at center.

  ## Example
  - <loader-view></loader-view>
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
class LoaderView extends PolymerElement {
  static get template() {
    return html`
    <style include="">
      :host {
        display: block;
        @apply --layout-fit;
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-center-justified;
      }
    </style>

    <paper-spinner active></paper-spinner>
`;
  }
}

window.customElements.define('loader-view', LoaderView);
