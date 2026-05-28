export enum ErrorType {
  LoadCommandDataError,
  LoadEventDataError,
  LoadSettingsDataError,

  InitActionModError,
  InitEventModError,
  InitExtensionModError,

  MissingActionMod,
  MissingEventMod,
  MissingExtensionMod,

  DuplicateSlashCommand,
  DuplicateUserContextMenuCommand,
  DuplicateMessageContextMenuCommand,
  DuplicateTextCommand,
}
