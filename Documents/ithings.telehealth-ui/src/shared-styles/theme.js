import '@polymer/polymer/polymer-legacy';
import '@polymer/paper-styles/paper-styles';

const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style is="custom-style">
    html {
      --app-accent-color: #11367A;
      --app-text-color: #2F3042;
      --very-pale-blue-grey: #ecf2f6;
      --pale-blue-grey: #e5ebef;
      --light-blue-grey: #d9e0e5;
      --medium-blue-grey: #bdcbd5;
      --dark-blue-grey: #92a3af;
      --table-background-color: #F5F8FA;
      
      --border-color: var(--medium-blue-grey);
      --hover-color: var(--pale-blue-grey);

      --icon-color: rgba(0, 0, 0, 0.54);

      --paper-checkbox-size: 22px;
      --paper-checkbox-ink-size: 22px;
      --paper-checkbox-label-spacing: 20px;
      --paper-checkbox-unchecked-ink-size: 20px;
      --paper-checkbox-checked-color: #11367A;
      --paper-checkbox-unchecked-color: #11367A;
      --paper-checkbox-unchecked-ink-color: transparent;
    }

    @font-face {
      font-family: 'Roboto-Bold';
      src:url(src/fonts/Roboto-Bold.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Roboto-Regular';
      src:url(src/fonts/Roboto-Regular.ttf) format('truetype');
    }
    
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
