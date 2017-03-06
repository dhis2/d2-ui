/* istanbul ignore next */
global.chai = require('chai');
global.sinon = require('sinon');

// Chai plugins
global.chai.use(require('sinon-chai'));
global.chai.use(require('chai-enzyme')());

global.expect = global.chai.expect;

// process.env.NODE_ENV = 'production'; // TODO: This hides errors but it also minifies the code atm which makes test reports basically unreadable
