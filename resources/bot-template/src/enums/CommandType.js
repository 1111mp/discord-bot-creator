export var CommandType;
(function (CommandType) {
  CommandType[(CommandType['Slash'] = 0)] = 'Slash';
  CommandType[(CommandType['UserContextMenu'] = 1)] = 'UserContextMenu';
  CommandType[(CommandType['MessageContextMenu'] = 2)] = 'MessageContextMenu';
  CommandType[(CommandType['Text'] = 3)] = 'Text';
})(CommandType || (CommandType = {}));
