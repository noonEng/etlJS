/* global describe, it, before */

import chai from 'chai';
import {SynchronousPost} from '../lib/etljs.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my SynchronousPost library', () => {
  before(() => {
    lib = new SynchronousPost();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('SynchronousPost');
    });
  });
});
