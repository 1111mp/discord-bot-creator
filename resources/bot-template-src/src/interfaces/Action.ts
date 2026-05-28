import type { ModName } from "./../types/ModName.js";
import type { ModMeta } from "./ModMeta.js";
import type { ModDependencies } from "./../types/ModDependencies.js";
import type { ActionsCache } from "./../ActionsCache.js";
import type { DBC } from "./../DBC.js";

export interface Action {
  /**
   * Action Name
   */
  name: ModName;
  /**
   * Action Description
   *
   * The action description displayed in the DBC program is used to briefly describe what this event is used for.
   */
  description?: string;
  /**
   * Action Category
   *
   * All actions should be in the appropriate category to maintain order.
   */
  category: string;
  /**
   * Action Subtitle
   *
   * The action subtitle is used to display additional information about an action in the editor. This function returns a string that will be displayed as the action subtitle in the action list.
   */
  subtitle: () => string;
  /**
   * Action Meta Data
   */
  meta: ModMeta;
  /**
   * Action Fields
   *
   * An array of html field id strings for saving data.
   */
  fields: string[];
  /**
   * Action HTML
   *
   * The html function should return the html code that will be used to render the action in the editor.
   */
  html: () => string;
  /**
   * Action Init
   *
   * The init function is executed when the action window is opened in the editor.
   */
  init?: () => void;
  /**
   * Action Dependencies
   *
   * Npm dependencies required by this action.
   */
  dependencies?: ModDependencies;
  /**
   * Action Code
   *
   * The action function is executed when the action is executed in the bot.
   */
  action?: (cache: ActionsCache) => Promise<void> | void;
  /**
   * Action Mod
   *
   * The mod function is executed after the action file (module) is loaded.
   */
  mod?: (dbc: DBC) => Promise<void> | void;
}
