/* eslint-disable @kbn/eslint/require-license-header */

/**
 * @notice
 *
 * This module was heavily inspired by the externals plugin that ships with webpack@97d58d31
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Tobias Koppers @sokra
 */

import { KbnImportReq } from '@kbn/repo-packages';

// @ts-ignore not typed by @types/webpack
import Module from 'webpack/lib/Module';
import { BundleRemote } from '../common';

export class BundleRemoteModule extends Module {
  public built = false;
  public buildMeta?: any;
  public buildInfo?: any;

  constructor(public readonly remote: BundleRemote, public readonly req: KbnImportReq) {
    super('kbn/bundleRemote', null);
  }

  libIdent() {
    return this.req.full;
  }

  chunkCondition(chunk: any) {
    return chunk.hasEntryModule();
  }

  identifier() {
    return `@kbn/bundleRemote ${this.req.full}`;
  }

  readableIdentifier() {
    return this.identifier();
  }

  needRebuild() {
    return false;
  }

  build(_: any, __: any, ___: any, ____: any, callback: () => void) {
    this.built = true;
    this.buildMeta = {};
    this.buildInfo = {
      exportsArgument: '__webpack_exports__',
    };
    callback();
  }

  source() {
    return `
      __webpack_require__.r(__webpack_exports__);
      var ns = __kbnBundles__.get('${this.remote.bundleType}/${this.remote.bundleId}/${this.req.target}');
      Object.defineProperties(__webpack_exports__, Object.getOwnPropertyDescriptors(ns))
    `;
  }

  size() {
    return 42;
  }

  updateHash(hash: any) {
    hash.update(this.identifier());
    super.updateHash(hash);
  }
}
