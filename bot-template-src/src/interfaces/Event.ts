import type { ModName } from './../types/ModName.js';
import type { ModMeta } from './ModMeta.js';
import type { DBC } from './../DBC.js';
import type { ModDependencies } from './../types/ModDependencies.js';

export interface Event {
  /**
   * Event Name
   */
  name: ModName;
  /**
   * Event Description
   *
   * The event description displayed in the DBC program is used to briefly describe what this event is used for.
   */
  description?: string;
  /**
   * Event Category
   *
   * All events should be in the appropriate category to maintain order.
   */
  category: string;
  /**
   * Event Meta Data
   */
  meta: ModMeta;
  /**
   * Event Fields
   *
   * An array of html field id strings for saving data.
   */
  fields: string[];
  /**
   * Event HTML
   *
   * The html function should return the html code that will be used to render the event in the editor.
   */
  html: () => string;
  /**
   * Event Dependencies
   *
   * Npm dependencies required by this event.
   */
  dependencies?: ModDependencies;
  /**
   * Event Mod
   *
   * The mod function is executed after the event file (module) is loaded.
   */
  mod?: (dbc: DBC) => Promise<void> | void;
}
