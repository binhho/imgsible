/** @jsx React.DOM */

var AppDispatcher = require('./dispatchers/app_dispatcher.js');
var ApplicationView = require('./components/application_view.jsx');
var ImageStore = require('./stores/image_store.js');
var UrlStore = require('./stores/url_store.js');

var preloadData = window.preloadData;
var dispatcher = new AppDispatcher();
dispatcher.register(new ImageStore(ImageStore.ClientFetchStrategy()));
dispatcher.register(new UrlStore(preloadData.route));

React.renderComponent(<ApplicationView preloadData={preloadData} dispatcher={dispatcher} />, document.getElementById('app'));