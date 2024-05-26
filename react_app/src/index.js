import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'animate.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
window.ZOHO.embeddedApp.on('PageLoad', function (data) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  // For TELEPHONY
  // MAX_HEIGHT, 500
  // MAX_WIDTH,390

  // For CUSTOM_BUTTON
  // MAX_HEIGHT, 500
  // MAX_WIDTH,1350

  // For STARTUP
  // MAX_HEIGHT, 700
  // MAX_WIDTH,1350

  // For Related list
  // MAX_HEIGHT, 500
  // StandardWidth, 1000

  // For Business Card View
  // MAX_HEIGHT, 200
  // Standard Width, 1000
  window.ZOHO.CRM.UI.Resize({ height: 700, width: 1350 });
  root.render(
    <Provider store={store}>
      <App tab='home' data={data} />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        rtl={false}
        hideProgressBar
        newestOnTop={true}
      />
    </Provider>
  );
});
window.ZOHO.embeddedApp.init();
