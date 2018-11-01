/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="paper-menu-button-styles">
  <template>
    <style>
    
      paper-menu-button {
          padding: 0;
          
          --paper-menu-button-content: {
              @apply --shadow-none;
          };
      }
      
      :host([opened]) paper-menu-button .dropdown-trigger {
        position: relative;
        z-index: 999;
      }

      :host([opened]) paper-menu-button paper-input {
        --paper-input-container: {
          border-bottom: 1px solid var(--border-color, rgba(0,0,0,.20));
        };
      }

      :host([opened]) paper-menu-button paper-input {
        --paper-input-container-input: {
          color: var(--app-accent-color);
        };
      }
      
      paper-menu-button paper-input {
        --paper-input-container: {
          padding: 0;
        };
        
        --paper-input-container-underline: {
          display: none;
        };
        
        --paper-input-container-underline-focus: {
          display: none;
        };
        
        --paper-input-container-input: {
          padding: 10px 20px !important;
          margin: 0px;
          cursor: pointer;
          
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 100%;
          cursor: pointer;
          
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          
          @apply(--paper-font-common-nowrap);
          @apply(--paper-font-body1);
        };
        
        --paper-input-container: {
          padding: 0px;
          
          box-sizing: border-box;
          height: 44px;
          width: var(--paper-input-select-box-width, auto);
          background-color: var(--primary-background-color);
          border: 2px solid var(--border-color, rgba(0,0,0,.20));
          border-bottom: 2px solid var(--border-color, rgba(0,0,0,.20));

          border-radius: 0px;
          -moz-border-radius: 0px;
          -webkit-border-radius: 0px;
          
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
        };
        
        --paper-input-suffix: {
          color: var(--paper-input-suffix-color, var(--icon-color));
          margin: var(--paper-input-suffix-margin, 0px 8px 0px 0px);
        };
        
        --paper-dropdown-menu-ripple: {
          top:0px !important;
          bottom: 0px !important;
        }
      }
      
      paper-menu-button paper-input {
          @apply --paper-menu-trigger-input;
      }
      
      /* If paper-listbox is used inside the dropdown content */
      paper-menu-button .dropdown-menu paper-listbox {
        --paper-listbox: {
          padding: 0px;
          border: none;
          
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          
          border-radius: 0px;
          -moz-border-radius: 0px;
          -webkit-border-radius: 0px;
          
          @apply --shadow-none;
        };
      }
      
      /* If paper-listbox is used as dropdown content */
      paper-menu-button .dropdown-menu {
        padding: 0px;
        width: var(--paper-listbox-width,paper-listbox-width, 200px);
        border: 2px solid var(--border-color, rgba(0, 0, 0, .20));
        
        @apply --paper-font-body1;
        
        border-radius: 0px;
        -moz-border-radius: 0px;
        -webkit-border-radius: 0px;
        
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        
        @apply --shadow-none;
      }
      
      paper-menu-button paper-listbox paper-item {
        cursor: pointer;
        border-bottom: 1px solid var(--border-color, rgba(0,0,0,.20));
        
        --paper-item-selected-weight: 400;
        
        @apply --paper-font-body1;
        
        --paper-item-selected: {
          background-color: inherit;
          font-weight: 400;
        };
        
        --paper-item-focused: {
            background-color: inherit;
            font-weight: 400;
        };
        
        --paper-item-focused-before: {
            background-color: inherit;
            font-weight: 400;
        };
      }
      
      paper-menu-button paper-listbox paper-item:hover {
        background-color:var(--hover-color);
        color: inherit;
      }
      
      paper-menu-button paper-listbox paper-item iron-icon.checked-icon {
        color: var(--light-green);
      }
      
      paper-menu-button paper-listbox paper-item:not(.iron-selected) iron-icon.checked-icon {
        display:none;
      }
      
      
      paper-menu-button paper-listbox paper-checkbox {
        display: block;
        min-height: 40px;
        padding: 8px 20px;
        border-bottom: 1px solid var(--border-color, rgba(0,0,0,.20));
        
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        
      }
      
      paper-menu-button paper-listbox paper-checkbox:hover {
        background-color:var(--hover-color);
        color: inherit;
      }
      
        
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
