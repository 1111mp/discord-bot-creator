export var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["LoadCommandDataError"] = 0] = "LoadCommandDataError";
    ErrorType[ErrorType["LoadEventDataError"] = 1] = "LoadEventDataError";
    ErrorType[ErrorType["LoadSettingsDataError"] = 2] = "LoadSettingsDataError";
    ErrorType[ErrorType["InitActionModError"] = 3] = "InitActionModError";
    ErrorType[ErrorType["InitEventModError"] = 4] = "InitEventModError";
    ErrorType[ErrorType["InitExtensionModError"] = 5] = "InitExtensionModError";
    ErrorType[ErrorType["MissingActionMod"] = 6] = "MissingActionMod";
    ErrorType[ErrorType["MissingEventMod"] = 7] = "MissingEventMod";
    ErrorType[ErrorType["MissingExtensionMod"] = 8] = "MissingExtensionMod";
    ErrorType[ErrorType["DuplicateSlashCommand"] = 9] = "DuplicateSlashCommand";
    ErrorType[ErrorType["DuplicateUserContextMenuCommand"] = 10] = "DuplicateUserContextMenuCommand";
    ErrorType[ErrorType["DuplicateMessageContextMenuCommand"] = 11] = "DuplicateMessageContextMenuCommand";
    ErrorType[ErrorType["DuplicateTextCommand"] = 12] = "DuplicateTextCommand";
})(ErrorType || (ErrorType = {}));
