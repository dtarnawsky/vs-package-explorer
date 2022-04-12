import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products = [
    { name: 'Auth Connect', description: 'Auth Connect makes it easy to add single sign-on and secure user authentication to your Ionic apps.', version: '5.7.0', icon: 'https://ionic.io/docs/img/auth-connect-icon.svg' },
    { name: 'Identity Vault', description: 'Identity Vault is an all-in-one frontend identity management system that combines security best practices and the latest in biometric authentication options for Ionic apps running on iOS and Android.', version: '3.4.0', icon: 'https://ionic.io/docs/img/identity-vault-icon.svg' },
    { name: 'Secure Storage', description: 'Ionic Secure Storage is a cross-platform local database system for high performance, secure data storage on iOS and Android. It provides full SQL query and relational data support through SQLite, as well as key/value support for simpler use cases when used with the Ionic Storage utility library. Full encryption support (using 256-bit AES) is provided out of the box for security sensitive applications.', version: '1.0.0', icon: 'https://ionic.io/docs/img/secure-storage-icon.svg' },
    { name: 'Microsoft Intune', description: 'Ionics Intune support makes it easy to add Intune MAM and Microsoft authentication features into your Ionic/Capacitor app, such as Intune security policies and brokered auth with Microsoft Authenticator and/or the Intune Company Portal app.', version: '1.0.0', icon: 'https://ionic.io/docs/img/logo-intune.png' },
    { name: 'Apple Pay', description: 'Ionic Payments enables you to collect payment from your customers securely and efficiently, using a drop-in solution powered by the most trusted providers by consumers worldwide: Apple Pay', version: '1.0.0', icon: 'https://ionic.io/docs/img/logo-payments.svg' },
    { name: 'Google Pay', description: 'Ionic Payments enables you to collect payment from your customers securely and efficiently, using a drop-in solution powered by the most trusted providers by consumers worldwide: Google Pay', version: '1.0.0', icon: 'https://ionic.io/docs/img/logo-payments.svg' }
  ];
  constructor() {
    const defaultTheme = JSON.parse(
      `{"--vscode-foreground":"#cccccc","--vscode-editor-background":"#1e1e1e","--vscode-font-size":"13px",
      "--vscode-font-weight":"normal","--vscode-font-family":"-apple-system, BlinkMacSystemFont, sans-serif",
      "--vscode-focusBorder":"#007fd4","--vscode-textLink-foreground":"#3794ff",
      "--vscode-textLink-activeForeground":"#3794ff","--vscode-button-background":"#0e639c",
      "--vscode-button-foreground":"#ffffff","--vscode-button-hoverBackground":"#1177bb",
      "--vscode-button-secondaryForeground":"#ffffff","--vscode-button-secondaryBackground":"#3a3d41",
      "--vscode-button-secondaryHoverBackground":"#45494e"}`
    );
    this.setCssVariables(defaultTheme);

    window.addEventListener('message', (event) => {
      if (event.data.type === 'css') {
        this.setCssVariables(event.data.data);
      }
    });
    window.parent.postMessage({ code: 'up' }, '*');
  }

  setCssVariables(data) {
    for (const cssVar of Object.keys(data)) {
      document.documentElement.style.setProperty(cssVar, data[cssVar]);
    }
  }

}
