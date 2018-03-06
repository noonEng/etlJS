/* global describe, it, before */

import chai from 'chai';
import {Madrid, PSG} from '../lib/etljs.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my Madrid library', () => {
  before(() => {
    lib = new Madrid();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('Madrid');
    });
  });
});

describe('Given an instance of my PSG library', () => {
  before(() => {
    lib = new PSG();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('PSG');
    });
  });
});
