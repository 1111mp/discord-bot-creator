export class ActionsCache {
  actions;
  index;
  message;
  interaction;
  constructor(options) {
    this.actions = options.actions;
    this.index = options.index || 0;
    this.message = options.message;
    this.interaction = options.interaction;
  }
}
