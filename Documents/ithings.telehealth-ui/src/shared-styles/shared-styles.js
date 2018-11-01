import '@polymer/polymer/polymer-element';
import '@polymer/paper-styles/typography';
import "@polymer/iron-flex-layout/iron-flex-layout-classes";
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style include="iron-flex iron-flex-alignment iron-positioning">
    .three-line-ellipsis {
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
    }
    .ellipsis {
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-header {
        height: 45px;
        color: #fff;
        font-size: 18px;
        background-color: #11367A;
        margin: 0px;
        padding-left: 25px;
        padding-top: 10px;
    }
    .card-content {
        background-color: #ECF2F6;
        margin: 0px;
        padding: 20px;
    }
    .content-single {
        padding-left: 45px;
        padding-right: 45px;
        padding-bottom: 20px;
        padding-top: 20px;
        background-color: #fff;
        min-height: 200px;
        @apply --layout-vertical;
    }

    .content-single .row .element {
        width: 60%;
    }

    .content-two {
        padding-left: 45px;
        padding-right: 45px;
        padding-bottom: 20px;
        padding-top: 20px;
        background-color: #fff;
        min-height: 200px;
        @apply --layout-vertical;
    }

    .content-two .row {
        width: 100%;
        @apply --layout-horizontal;
    }
    .content-two .row .element {
        width: 45%;
    }

    .content-two .row .spacer {
        @apply --layout-flex;
    }

    .card-buttons {
        background-color: #11367A;
        padding-right: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .inputlabel {
        font-size: 14px;
        color: #2f3042;
        font-family: 'Roboto-Regular';
        padding-top: 20px;
    }
    .readonlylabel {
        font-size: 18px;
        color: #2f3042;
        font-family: 'Roboto-Regular';
        padding-top: 10px;
    }

    .content-title {
        background-color: #fff;
    }

    .content-title h2 {
        font-size: 24px;
        color: #11367A;
    }

    .add-template-header {
      height: 45px;
      padding: 0px 21px 0px 26px;
      background: var(--app-accent-color);
    }
    .add-template-header-title {
      color: var(--light-theme-background-color);
      font-size: 18px;
      font-family: 'Roboto-Regular';
    }
    .help-icon-container {
      position: relative;
    }
    .help-icon-container:hover .help-info-container{
      display: block;
    }
    .help-info-container {
      display: none;
    }
    .help-info-container {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 462px;
      background: var(--light-theme-background-color);
      border: 1px solid var(--medium-blue-grey);
      box-shadow: 0px 3px 0px rgba(189, 203, 213, 1);
      padding: 21px 29px 23px 33px;
      z-index: 1;
    }
    .help-title {
      font-size: 18px;
      font-family: 'Roboto-Bold';
      padding-bottom: 14px;
      border-bottom: 1px solid var(--pale-blue-grey);
      color: var(--app-accent-color);
    }
    .help-info {
      font-size: 14px;
      font-family: 'Roboto-Regular';
      color: var(--app-text-color);
      padding-top: 16px;
    }
    paper-icon-button.help-icon{
      --iron-icon-fill-color: var(--light-theme-background-color);
      padding: 0px;
      width: 30px;
      height: 30px;
    }
    .add-template-view-container {
      background: var(--very-pale-blue-grey);
      padding: 18px 25px 23px 18px;
    }
   
    .header-list-container{
      height: 40px;
      text-transform: uppercase;
      background: var(--app-accent-color);
      color:  var(--light-theme-background-color);
      font-family: 'Roboto-Bold';
      font-size: 14px;
    }
    .border {
      border-right: 2px solid  var(--light-theme-background-color);
     }
     .header-cell-content {
       padding: 0px 24px 0px 20px;
     }
     .dropdown-title {
      font-size: 14px;
      font-family: 'Roboto-Regular';
      color: var(--app-text-color);
      padding-bottom:  4px;
    }
    .basic-detail-title {
      font-size: 14px;
      font-family: 'Roboto-Regular';
      color: var(--app-text-color);
      height: 28px;
    }
    .basic-detail-title-padding {
      padding-top: 20px;
    }
    textarea{
      min-height: 8px;
      resize: none;
      padding: 16px 0px 0px 14px;
      font-size: 14px;
      font-family: 'Roboto-Regular';
      color: var(--app-text-color);
      border: 2px solid var(--medium-blue-grey);
      outline: none;
    }
    textarea:focus{
      border-color: var(--app-accent-color);
    }


     @media (max-width: 1024px) {
      .border {
        border-right: none;
      }
      .header-list-container {
        display: none !important;
      }
     }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

