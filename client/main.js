import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import './main.html';
import { renderRoutes } from '../imports/routes/routes.js';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
