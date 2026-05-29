import type { ModName } from './../types/ModName.js';
import type { ModMeta } from './../../src/interfaces/ModMeta.js';
import type { ModDependencies } from './../../src/types/ModDependencies.js';
import type { DBC } from './../../src/DBC.js';

export interface Extension {
  /**
   * Extension Name
   */
  name: ModName;
  /**
   * Extension Meta Data
   */
  meta: ModMeta;
  /**
   * Extension Fields
   *
   * An array of html field id strings for saving data.
   */
  fields: string[];
  /**
   * Extension HTML
   *
   * The html function should return the html code that will be used to render the extension in the editor.
   */
  html: () => string;
  /**
   * Extension Init
   *
   * The init function is executed when the extension window is opened in the editor.
   */
  init?: () => void;
  /**
   * Extension Close
   *
   * The close function is executed when the extension window is closed in the editor.
   */
  close?: () => void;
  /**
   * Extension Dependencies
   *
   * Npm dependencies required by this extension.
   */
  dependencies?: ModDependencies;
  /**
   * Extension Mod
   *
   * The mod function is executed after the extension file (module) is loaded.
   */
  mod?: (dbc: DBC) => Promise<void> | void;
}
