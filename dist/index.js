'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _assertThisInitialized = _interopDefault(require('@babel/runtime/helpers/assertThisInitialized'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _taggedTemplateLiteral = _interopDefault(require('@babel/runtime/helpers/taggedTemplateLiteral'));
var React = require('react');
var React__default = _interopDefault(React);
var styled = require('@stream-io/styled-components');
var withTheme = styled.withTheme;
var styled__default = _interopDefault(styled);
var PropTypes = _interopDefault(require('prop-types'));
var reactNative = require('react-native');
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var merge = _interopDefault(require('lodash/merge'));
var lodashSet = _interopDefault(require('lodash/set'));
var lodashGet = _interopDefault(require('lodash/get'));
var mapValues = _interopDefault(require('lodash/mapValues'));
var isPlainObject = _interopDefault(require('lodash/isPlainObject'));
var Markdown = _interopDefault(require('@stream-io/react-native-simple-markdown'));
var lodashEs = require('lodash-es');
var anchorme = _interopDefault(require('anchorme'));
var Moment = _interopDefault(require('moment'));
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var ImageViewer = _interopDefault(require('react-native-image-zoom-viewer'));
var reactNativeActionsheet = require('react-native-actionsheet');
var Immutable = _interopDefault(require('seamless-immutable'));
var deepequal = _interopDefault(require('deep-equal'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var uuidv4 = _interopDefault(require('uuid/v4'));
var debounce = _interopDefault(require('lodash/debounce'));
var throttle = _interopDefault(require('lodash/throttle'));
var streamChat = require('stream-chat');
var mimeTypes = require('mime-types');
var uniq = _interopDefault(require('lodash/uniq'));
var truncate = _interopDefault(require('lodash/truncate'));
var uniqBy = _interopDefault(require('lodash/uniqBy'));
var uniqWith = _interopDefault(require('lodash/uniqWith'));
var isEqual = _interopDefault(require('lodash/isEqual'));

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  max-height: 60px;\n  margin: -5px;\n  flex: 1;\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var InputBox = styled__default.TextInput(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageInput.inputBox.css;
});
var AutoCompleteInput =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(AutoCompleteInput, _React$PureComponent);

    function AutoCompleteInput(props) {
      var _this;

      _classCallCheck(this, AutoCompleteInput);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoCompleteInput).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "startTracking", function () {
        _this.isTrackingStarted = true;
        var _this$props$triggerSe = _this.props.triggerSettings[_this.state.currentTrigger],
          component = _this$props$triggerSe.component,
          title = _this$props$triggerSe.title;

        _this.props.openSuggestions(title, component); // console.log('start TRACKING');

      });

      _defineProperty(_assertThisInitialized(_this), "stopTracking", function () {
        _this.isTrackingStarted = false; // console.log('STOP TRACKING');

        _this.props.closeSuggestions();
      });

      _defineProperty(_assertThisInitialized(_this), "handleChange", function (text) {
        var fromUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        // console.log('in handle change: ' + text + ' from update: ' + fromUpdate);
        if (!fromUpdate) {
          _this.props.onChange(text);

          return;
        }

        _this.handleSuggestions(text);
      });

      _defineProperty(_assertThisInitialized(_this), "handleSelectionChange", function (_ref2) {
        var _ref2$nativeEvent$sel = _ref2.nativeEvent.selection,
          start = _ref2$nativeEvent$sel.start,
          end = _ref2$nativeEvent$sel.end;

        // console.log('in handle selection: ', start, end);
        _this.setState({
          selectionStart: start,
          selectionEnd: end
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onSelectSuggestion", function (item) {
        var _this$state = _this.state,
          text = _this$state.text,
          currentTrigger = _this$state.currentTrigger;
        var selectionEnd = _this.state.selectionEnd;
        var triggers = _this.props.triggerSettings;
        var newToken = triggers[currentTrigger].output(item); // const { onChange, trigger } = this.props;

        if (!currentTrigger) return;

        var computeCaretPosition = function computeCaretPosition(token, startToken) {
          return startToken + token.length;
        };

        var textToModify = text.slice(0, selectionEnd);
        var startOfTokenPosition = textToModify.search(
          /**
           * It's important to escape the currentTrigger char for chars like [, (,...
           */
          new RegExp("\\".concat(currentTrigger, "[^\\".concat(currentTrigger).concat(triggers[currentTrigger].allowWhitespace ? '' : '\\s', "]"), "*$"))); // we add space after emoji is selected if a caret position is next

        var newTokenString = "".concat(newToken.text, " ");
        var newCaretPosition = computeCaretPosition(newTokenString, startOfTokenPosition);
        var modifiedText = textToModify.substring(0, startOfTokenPosition) + newTokenString;

        _this.stopTracking();

        _this.props.onChange(text.replace(textToModify, modifiedText));

        _this.syncCaretPosition(newCaretPosition);

        if (triggers[currentTrigger].callback) triggers[currentTrigger].callback(item);
      });

      _defineProperty(_assertThisInitialized(_this), "syncCaretPosition",
        /*#__PURE__*/
        function () {
          var _ref3 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee() {
              var position,
                _args = arguments;
              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      position = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
                      _context.next = 3;
                      return _this.setState({
                        selectionStart: position,
                        selectionEnd: position
                      });

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

          return function () {
            return _ref3.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "_createRegExp", function () {
        var triggers = _this.props.triggerSettings; // negative lookahead to match only the trigger + the actual token = "bladhwd:adawd:word test" => ":word"
        // https://stackoverflow.com/a/8057827/2719917

        _this.tokenRegExp = new RegExp("([".concat(Object.keys(triggers).join(''), "])(?:(?!\\1)[^\\s])*$"));
      });

      _defineProperty(_assertThisInitialized(_this), "handleSuggestions", function (text) {
        // react native is not consistent in order of execution of onSelectionChange and onTextChange
        // with android and iOS. onSelectionChange gets executed first on iOS (which is ideal for our scenario)
        // Although on android, this order is reveresed. So need to add following 0 timeout to make sure that
        // onSelectionChange is executed first before we proceed with handleSuggestions.
        setTimeout(
          /*#__PURE__*/
          _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee2() {
              var selectionEnd, minChar, tokenMatch, lastToken, triggers, currentTrigger, actualToken;
              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      selectionEnd = _this.state.selectionEnd; // TODO: Move these const to props

                      minChar = 0;
                      tokenMatch = _this.tokenRegExp.exec(text.slice(0, selectionEnd)); // console.log(tokenMatch);

                      lastToken = tokenMatch && tokenMatch[0];
                      triggers = _this.props.triggerSettings;
                      currentTrigger = lastToken && Object.keys(triggers).find(function (a) {
                        return a === lastToken[0];
                      }) || null;
                      /*
                        if we lost the trigger token or there is no following character we want to close
                        the autocomplete
                      */

                      if (!((!lastToken || lastToken.length <= minChar) && ( // check if our current trigger disallows whitespace
                        _this.state.currentTrigger && !triggers[_this.state.currentTrigger].allowWhitespace || !_this.state.currentTrigger))) {
                        _context2.next = 9;
                        break;
                      }

                      // console.log('here 1');
                      _this.stopTracking();

                      return _context2.abrupt("return");

                    case 9:
                      if (!(currentTrigger && text[tokenMatch.index - 1] && triggers[currentTrigger].afterWhitespace && !text[tokenMatch.index - 1].match(/\s/))) {
                        _context2.next = 12;
                        break;
                      }

                      // console.log('here 2');
                      _this.stopTracking();

                      return _context2.abrupt("return");

                    case 12:
                      if (!(_this.state.currentTrigger && triggers[_this.state.currentTrigger].allowWhitespace)) {
                        _context2.next = 19;
                        break;
                      }

                      tokenMatch = new RegExp("\\".concat(_this.state.currentTrigger, "[^").concat(_this.state.currentTrigger, "]*$")).exec(text.slice(0, selectionEnd));
                      lastToken = tokenMatch && tokenMatch[0];

                      if (lastToken) {
                        _context2.next = 18;
                        break;
                      }

                      // console.log('here 3');
                      _this.stopTracking();

                      return _context2.abrupt("return");

                    case 18:
                      currentTrigger = Object.keys(triggers).find(function (a) {
                        return a === lastToken[0];
                      }) || null;

                    case 19:
                      actualToken = lastToken.slice(1); // if trigger is not configured step out from the function, otherwise proceed

                      if (currentTrigger) {
                        _context2.next = 22;
                        break;
                      }

                      return _context2.abrupt("return");

                    case 22:
                      _context2.next = 24;
                      return _this.setState({
                        currentTrigger: currentTrigger
                      });

                    case 24:
                      if (!_this.isTrackingStarted) _this.startTracking(); // console.log('from handle suggestions: ' + currentTrigger);

                      _this.updateSuggestions(actualToken);

                    case 26:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })));
      });

      _this.state = {
        text: props.value,
        selectionStart: 0,
        selectionEnd: 0,
        currentTrigger: null
      };
      _this.isTrackingStarted = false;
      _this.previousChar = ' ';

      _this._createRegExp();

      return _this;
    }

    _createClass(AutoCompleteInput, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        // console.log('in component did update: ' + prevProps.value);
        if (prevProps.value !== this.props.value) {
          this.setState({
            text: this.props.value
          });
          this.handleChange(this.props.value, true);
        }
      }
    }, {
      key: "updateSuggestions",
      value: function updateSuggestions(q) {
        var triggers = this.props.triggerSettings;
        this.props.updateSuggestions({
          data: triggers[this.state.currentTrigger].dataProvider(q, this.state.text),
          onSelect: this.onSelectSuggestion
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return React__default.createElement(InputBox, _extends({
          ref: this.props.setInputBoxRef,
          placeholder: "Write your message",
          onChangeText: function onChangeText(text) {
            _this2.handleChange(text);
          },
          value: this.state.text,
          onSelectionChange: this.handleSelectionChange,
          multiline: true
        }, this.props.additionalTextInputProps));
      }
    }]);

    return AutoCompleteInput;
  }(React__default.PureComponent);

_defineProperty(AutoCompleteInput, "propTypes", {
  value: PropTypes.string,

  /** @see See [suggestions context](https://getstream.github.io/stream-chat-react-native/#suggestionscontext) */
  openSuggestions: PropTypes.func,

  /** @see See [suggestions context](https://getstream.github.io/stream-chat-react-native/#suggestionscontext) */
  closeSuggestions: PropTypes.func,

  /** @see See [suggestions context](https://getstream.github.io/stream-chat-react-native/#suggestionscontext) */
  updateSuggestions: PropTypes.func,
  triggerSettings: PropTypes.object,
  setInputBoxRef: PropTypes.func,

  /**
   * @param text string
   */
  onChange: PropTypes.func,

  /**
   * Additional props for underlying TextInput component. These props will be forwarded as it is to TextInput component.
   *
   * @see See https://facebook.github.io/react-native/docs/textinput#reference
   */
  additionalTextInputProps: PropTypes.object
});

_defineProperty(AutoCompleteInput, "defaultProps", {
  value: ''
});

const img = require('.//assets/Poweredby_100px-White_VertText.png');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Colors = {
  primary: '#006cff',
  secondary: '#111',
  danger: '#EDD8DD',
  light: '#EBEBEB',
  textLight: 'white',
  textDark: 'rgba(0,0,0,1)',
  textGrey: 'rgba(0,0,0,0.5)',
  transparent: 'transparent'
};
var defaultTheme = {
  colors: _objectSpread({}, Colors),
  avatar: {
    container: {},
    image: {},
    text: {},
    fallback: {}
  },
  channelPreview: {
    container: {},
    details: {},
    detailsTop: {},
    title: {},
    date: {},
    message: {
      color: '#767676',
      unreadColor: '#000',
      fontWeight: 'normal',
      unreadFontWeight: 'bold'
    }
  },
  closeButton: {
    container: {}
  },
  iconBadge: {
    container: {},
    icon: {},
    iconInner: {},
    unreadCount: {}
  },
  message: {
    container: {},
    content: {
      container: {
        borderRadiusL: 16,
        borderRadiusS: 2
      },
      containerInner: {},
      metaContainer: {},
      metaText: {},
      errorContainer: {
        backgroundColor: Colors.danger
      },
      deletedContainer: {},
      deletedText: {},
      textContainer: {
        borderRadiusL: 16,
        borderRadiusS: 2,
        leftBorderWidth: 0.5,
        leftBorderColor: 'rgba(0,0,0,0.08)',
        rightBorderWidth: 0,
        rightBorderColor: 'transparent'
      },
      // Available options for styling text: https://github.com/CharlesMangwa/react-native-simple-markdown/tree/next#styles-1
      markdown: {}
    },
    status: {
      spacer: {},
      deliveredContainer: {},
      deliveredCircle: {},
      checkMark: {},
      sendingContainer: {},
      sendingImage: {},
      readByContainer: {},
      readByCount: {}
    },
    avatarWrapper: {
      container: {},
      spacer: {}
    },
    replies: {
      container: {},
      messageRepliesText: {},
      image: {}
    },
    file: {
      container: {},
      details: {},
      title: {},
      size: {}
    },
    actions: {
      container: {},
      button: {
        primaryBackgroundColor: Colors.primary,
        defaultBackgroundColor: 'white',
        primaryBorderColor: Colors.light,
        defaultBorderColor: 'transparent'
      },
      buttonText: {
        primaryColor: 'white',
        defaultColor: 'black'
      }
    },
    card: {
      container: {},
      cover: {},
      footer: {}
    },
    gallery: {
      width: 240,
      size: 120,
      halfSize: 80,
      doubleSize: 240,
      single: {},
      imageContainer: {},
      galleryContainer: {},
      header: {
        container: {},
        button: {}
      }
    },
    reactionList: {
      container: {},
      reactionCount: {}
    },
    reactionPicker: {
      container: {},
      containerView: {},
      column: {},
      emoji: {},
      reactionCount: {},
      text: {}
    },
    actionSheet: {
      titleContainer: {},
      titleText: {},
      buttonContainer: {},
      buttonText: {},
      cancelButtonContainer: {},
      cancelButtonText: {}
    }
  },
  loadingIndicator: {
    container: {},
    loadingText: {}
  },
  messageInput: {
    container: {
      conditionalPadding: 20
    },
    inputBox: {},
    inputBoxContainer: {},
    attachButton: {},
    attachButtonIcon: {},
    sendButton: {},
    sendButtonIcon: {},
    imageUploadPreview: {
      container: {},
      itemContainer: {},
      dismiss: {},
      dismissImage: {},
      upload: {}
    },
    uploadProgressIndicator: {
      overlay: {},
      container: {}
    },
    suggestions: {
      wrapper: {},
      container: {
        maxHeight: 250,
        itemHeight: 50
      },
      title: {},
      separator: {},
      item: {},
      mention: {
        container: {},
        name: {}
      },
      command: {
        container: {},
        top: {},
        title: {}
      }
    },
    actionSheet: {
      titleContainer: {},
      titleText: {},
      buttonContainer: {},
      buttonText: {}
    }
  },
  messageList: {
    listContainer: {},
    messageNotification: {
      container: {},
      text: {}
    },
    errorNotification: {},
    errorNotificationText: {},
    dateSeparator: {
      container: {},
      line: {},
      date: {},
      dateText: {}
    },
    messageSystem: {
      container: {},
      line: {},
      text: {},
      textContainer: {},
      dateText: {}
    },
    eventIndicator: {
      date: {},
      memberUpdateContainer: {},
      memberUpdateTextContainer: {},
      memberUpdateText: {}
    },
    typingIndicatorContainer: {}
  },
  spinner: {},
  thread: {
    newThread: {
      text: {}
    }
  },
  typingIndicator: {
    text: {
      fontSize: 14,
      color: Colors.textGrey
    }
  }
};
var themed = function themed(OriginalComponent) {
  if (OriginalComponent.themePath == null) {
    throw Error('Only use themed on components that have a static themePath');
  }

  var ThemedComponent = function ThemedComponent(_ref) {
    var style = _ref.style,
      props = _objectWithoutProperties(_ref, ["style"]);

    return React__default.createElement(styled.ThemeConsumer, null, function (themeProviderTheme) {
      if (!style && themeProviderTheme) {
        return React__default.createElement(OriginalComponent, props);
      }

      var modifiedTheme = themeProviderTheme || defaultTheme;

      if (style) {
        var themeDiff = {};
        var path = []; // replaces
        // { 'avatar.fallback': 'background-color: red;' }
        // with
        // { 'avatar.fallback': { css: 'background-color: red;' } }

        var replaceCssShorthand = function replaceCssShorthand(v) {
          if (isPlainObject(v)) {
            var m = mapValues(v, function (v, k) {
              path.push(k);
              return replaceCssShorthand(v);
            });
            path.pop();
            return m;
          }

          if (isPlainObject(lodashGet(defaultTheme, path.join('.')))) {
            path.pop();
            return {
              css: v
            };
          }

          path.pop();
          return v;
        };

        style = replaceCssShorthand(style);

        for (var k in style) {
          if (lodashGet(defaultTheme, OriginalComponent.themePath + '.' + k)) {
            merge(themeDiff, lodashSet({}, OriginalComponent.themePath + '.' + k, style[k]));
          } else if (lodashGet(defaultTheme, k)) {
            merge(themeDiff, lodashSet({}, k, style[k]));
          } else {
            throw Error("Unknown theme key ".concat(k));
          }
        }

        modifiedTheme = merge({}, modifiedTheme, themeDiff);
      }

      return React__default.createElement(styled.ThemeProvider, {
        theme: modifiedTheme
      }, React__default.createElement(OriginalComponent, props));
    });
  };

  ThemedComponent.themePath = OriginalComponent.themePath;
  ThemedComponent.extraThemePaths = OriginalComponent.extraThemePaths;
  ThemedComponent.displayName = "Themed".concat(getDisplayName(OriginalComponent));
  return ThemedComponent;
}; // Copied from here:
// https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

var ChatContext = React__default.createContext({
  client: null
});
function withChatContext(OriginalComponent) {
  var ContextAwareComponent = getContextAwareComponent(ChatContext, OriginalComponent);
  return ContextAwareComponent;
}
var ChannelContext = React__default.createContext({});
function withChannelContext(OriginalComponent) {
  var ContextAwareComponent = getContextAwareComponent(ChannelContext, OriginalComponent);
  return ContextAwareComponent;
}
var SuggestionsContext = React__default.createContext({});
function withSuggestionsContext(OriginalComponent) {
  return getContextAwareComponent(SuggestionsContext, OriginalComponent);
}
var MessageContentContext = React__default.createContext({});
function withMessageContentContext(OriginalComponent) {
  return getContextAwareComponent(MessageContentContext, OriginalComponent);
}
var KeyboardContext = React__default.createContext({});
function withKeyboardContext(OriginalComponent) {
  return getContextAwareComponent(KeyboardContext, OriginalComponent);
}

var getContextAwareComponent = function getContextAwareComponent(context, originalComponent) {
  var Context = context;
  var OriginalComponent = originalComponent;

  var ContextAwareComponent = function ContextAwareComponent(props) {
    return React__default.createElement(Context.Consumer, null, function (c) {
      return React__default.createElement(OriginalComponent, _extends({}, c, props));
    });
  };

  ContextAwareComponent.themePath = OriginalComponent.themePath;
  ContextAwareComponent.extraThemePaths = OriginalComponent.extraThemePaths;
  ContextAwareComponent.displayName = OriginalComponent.displayName || OriginalComponent.name || 'Component';
  ContextAwareComponent.displayName = ContextAwareComponent.displayName.replace('Base', '');
  return ContextAwareComponent;
};

var _class, _temp;

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  text-transform: uppercase;\n  font-size: ", ";\n  font-weight: bold;\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  border-radius: ", ";\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  justify-content: center;\n  align-items: center;\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  border-radius: ", ";\n  width: ", ";\n  height: ", ";\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  ", "\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var BASE_AVATAR_FALLBACK_TEXT_SIZE = 14;
var BASE_AVATAR_SIZE = 32;
var AvatarContainer = styled__default.View(_templateObject$1(), function (_ref) {
  var theme = _ref.theme;
  return theme.avatar.container.css;
});
var AvatarImage = styled__default.Image(_templateObject2(), function (_ref2) {
  var size = _ref2.size;
  return size / 2;
}, function (_ref3) {
  var size = _ref3.size;
  return size;
}, function (_ref4) {
  var size = _ref4.size;
  return size;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.avatar.image.css;
});
var AvatarFallback = styled__default.View(_templateObject3(), function (_ref6) {
  var size = _ref6.size;
  return size / 2;
}, function (_ref7) {
  var size = _ref7.size;
  return size;
}, function (_ref8) {
  var size = _ref8.size;
  return size;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.colors.primary;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.avatar.fallback.css;
});
var AvatarText = styled__default.Text(_templateObject4(), function (_ref11) {
  var theme = _ref11.theme;
  return theme.colors.textLight;
}, function (_ref12) {
  var fontSize = _ref12.fontSize;
  return fontSize;
}, function (_ref13) {
  var theme = _ref13.theme;
  return theme.avatar.text.css;
});
/**
 * Avatar - A round avatar image with fallback to user's initials
 *
 * @example ./docs/Avatar.md
 * @extends PureComponent
 */

var Avatar = themed((_temp = _class =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(Avatar, _React$PureComponent);

    function Avatar() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Avatar);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Avatar)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "state", {
        imageError: false
      });

      _defineProperty(_assertThisInitialized(_this), "setError", function () {
        _this.setState({
          imageError: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "getInitials", function (name) {
        return name ? name.split(' ').slice(0, 2).map(function (name) {
          return name.charAt(0);
        }) : null;
      });

      return _this;
    }

    _createClass(Avatar, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          size = _this$props.size,
          name = _this$props.name,
          image = _this$props.image;
        var initials = this.getInitials(name);
        var fontSize = BASE_AVATAR_FALLBACK_TEXT_SIZE * (size / BASE_AVATAR_SIZE);
        return React__default.createElement(AvatarContainer, null, image && !this.state.imageError ? React__default.createElement(AvatarImage, {
          size: size,
          source: {
            uri: image
          },
          accessibilityLabel: "initials",
          resizeMethod: "resize",
          onError: this.setError
        }) : React__default.createElement(AvatarFallback, {
          size: size
        }, React__default.createElement(AvatarText, {
          fontSize: fontSize
        }, initials)));
      }
    }]);

    return Avatar;
  }(React__default.PureComponent), _defineProperty(_class, "themePath", 'avatar'), _defineProperty(_class, "propTypes", {
    /** image url */
    image: PropTypes.string,

    /** name of the picture, used for title tag fallback */
    name: PropTypes.string,

    /** size in pixels */
    size: PropTypes.number,

    /** Style overrides */
    style: PropTypes.object
  }), _defineProperty(_class, "defaultProps", {
    size: 32
  }), _temp));

var _class$1, _temp$1;

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  padding: 10px;\n  color: black;\n  font-weight: bold;\n  ", "\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  flex-direction: row;\n  align-items: center;\n  padding: 10px;\n  ", "\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var Container = styled__default.View(_templateObject$2(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageInput.suggestions.mention.container.css;
});
var Name = styled__default.Text(_templateObject2$1(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageInput.suggestions.mention.name.css;
});
var MentionsItem = themed((_temp$1 = _class$1 =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(MentionsItem, _React$Component);

    function MentionsItem() {
      _classCallCheck(this, MentionsItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(MentionsItem).apply(this, arguments));
    }

    _createClass(MentionsItem, [{
      key: "render",
      value: function render() {
        var _this$props$item = this.props.item,
          name = _this$props$item.name,
          icon = _this$props$item.icon,
          id = _this$props$item.id;
        return React__default.createElement(Container, null, React__default.createElement(Avatar, {
          image: icon
        }), React__default.createElement(Name, null, name || id));
      }
    }]);

    return MentionsItem;
  }(React__default.Component), _defineProperty(_class$1, "themePath", 'messageInput.suggestions.mention'), _temp$1));
MentionsItem.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string
};

var _class$2, _temp$2;

function _templateObject3$1() {
  var data = _taggedTemplateLiteral(["\n  font-weight: bold;\n  ", "\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$2() {
  var data = _taggedTemplateLiteral(["\n  flex-direction: row;\n  align-items: center;\n  ", "\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  flex-direction: column;\n  padding: 10px;\n  ", "\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var Container$1 = styled__default.View(_templateObject$3(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageInput.suggestions.command.container.css;
});
var Top = styled__default.View(_templateObject2$2(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageInput.suggestions.command.top.css;
});
var Title = styled__default.Text(_templateObject3$1(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.messageInput.suggestions.command.title.css;
});
/**
 * @example ./docs/CommandsItem.md
 * @extends PureComponent
 */

var CommandsItem = themed((_temp$2 = _class$2 =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(CommandsItem, _React$Component);

    function CommandsItem() {
      _classCallCheck(this, CommandsItem);

      return _possibleConstructorReturn(this, _getPrototypeOf(CommandsItem).apply(this, arguments));
    }

    _createClass(CommandsItem, [{
      key: "render",
      value: function render() {
        var _this$props$item = this.props.item,
          name = _this$props$item.name,
          args = _this$props$item.args,
          description = _this$props$item.description;
        return React__default.createElement(Container$1, null, React__default.createElement(Top, null, React__default.createElement(Title, null, "/", name, " "), React__default.createElement(reactNative.Text, null, args)), React__default.createElement(reactNative.Text, null, description));
      }
    }]);

    return CommandsItem;
  }(React__default.Component), _defineProperty(_class$2, "themePath", 'messageInput.suggestions.command'), _defineProperty(_class$2, "propTypes", {
    name: PropTypes.string,
    args: PropTypes.string,
    description: PropTypes.string
  }), _temp$2));

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var renderText = function renderText(message, styles) {
  // take the @ mentions and turn them into markdown?
  // translate links
  var text = message.text;
  var _message$mentioned_us = message.mentioned_users,
    mentioned_users = _message$mentioned_us === void 0 ? [] : _message$mentioned_us;

  if (!text) {
    return;
  }

  text = text.trim();
  var urls = anchorme(text, {
    list: true
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = urls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var urlInfo = _step.value;
      var displayLink = lodashEs.truncate(urlInfo.encoded.replace(/^(www\.)/, ''), {
        length: 20,
        omission: '...'
      });

      var _mkdown = "[".concat(displayLink, "](").concat(urlInfo.protocol).concat(urlInfo.encoded, ")");

      text = text.replace(urlInfo.raw, _mkdown);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var newText = text;

  if (mentioned_users.length) {
    for (var i = 0; i < mentioned_users.length; i++) {
      var username = mentioned_users[i].name || mentioned_users[i].id;
      var mkdown = "**@".concat(username, "**");
      var re = new RegExp("@".concat(username), 'g');
      newText = newText.replace(re, mkdown);
    }
  }

  newText = newText.replace(/[<&"'>]/g, '\\$&');

  var markdownStyles = _objectSpread$1({}, defaultMarkdownStyles, {}, styles);

  return React__default.createElement(Markdown, {
    styles: markdownStyles
  }, newText);
};
var defaultMarkdownStyles = {
  link: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
};

var emojiData = [{
  id: 'like',
  icon: '👍'
}, {
  id: 'love',
  icon: '❤️️'
}, {
  id: 'haha',
  icon: '😂'
}, {
  id: 'wow',
  icon: '😮'
}, {
  id: 'sad',
  icon: '😔'
}, {
  id: 'angry',
  icon: '😠'
}];
var capitalize = function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
var FileState = Object.freeze({
  NO_FILE: 'no_file',
  UPLOADING: 'uploading',
  UPLOADED: 'uploaded',
  UPLOAD_FAILED: 'upload_failed'
});
var ProgressIndicatorTypes = Object.freeze({
  IN_PROGRESS: 'in_progress',
  RETRY: 'retry'
}); // ACI = AutoCompleteInput

var ACITriggerSettings = function ACITriggerSettings(_ref) {
  var users = _ref.users,
    onMentionSelectItem = _ref.onMentionSelectItem,
    commands = _ref.commands;
  return {
    '@': {
      dataProvider: function dataProvider(q) {
        var matchingUsers = users.filter(function (user) {
          if (!q) return true;

          if (user.name !== undefined && user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1) {
            return true;
          } else if (user.id.toLowerCase().indexOf(q.toLowerCase()) !== -1) {
            return true;
          } else {
            return false;
          }
        });
        return matchingUsers.slice(0, 10);
      },
      component: MentionsItem,
      title: 'Searching for people',
      output: function output(entity) {
        return {
          key: entity.id,
          text: "@".concat(entity.name || entity.id),
          caretPosition: 'next'
        };
      },
      callback: function callback(item) {
        onMentionSelectItem(item);
      }
    },
    '/': {
      dataProvider: function dataProvider(q, text) {
        if (text.indexOf('/') !== 0) {
          return [];
        }

        var selectedCommands = commands.filter(function (c) {
          return c.name.indexOf(q) !== -1;
        }); // sort alphabetically unless the you're matching the first char

        selectedCommands.sort(function (a, b) {
          var nameA = a.name.toLowerCase();
          var nameB = b.name.toLowerCase();

          if (nameA.indexOf(q) === 0) {
            nameA = "0".concat(nameA);
          }

          if (nameB.indexOf(q) === 0) {
            nameB = "0".concat(nameB);
          }

          if (nameA < nameB) {
            return -1;
          }

          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        return selectedCommands.slice(0, 10);
      },
      title: 'Commands',
      component: CommandsItem,
      output: function output(entity) {
        return {
          key: entity.id,
          text: "/".concat(entity.name),
          caretPosition: 'next'
        };
      }
    }
  };
};
var MESSAGE_ACTIONS = {
  edit: 'edit',
  "delete": 'delete',
  reactions: 'reactions',
  reply: 'reply'
};
var makeImageCompatibleUrl = function makeImageCompatibleUrl(url) {
  if (!url) return url;
  var newUrl = url;
  if (url.indexOf('//') === 0) newUrl = 'https:' + url;
  return newUrl;
};

var _class$3, _temp$3;

function _templateObject3$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  height: 150;\n  ", "\n"]);

  _templateObject3$2 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 10px;\n  ", "\n"]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n  border-top-left-radius: 16;\n  border-top-right-radius: 16;\n  overflow: hidden;\n  border-bottom-left-radius: ", ";\n  border-bottom-right-radius: ", ";\n  background-color: ", ";\n  width: 250;\n  ", "\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var Container$2 = styled__default.TouchableOpacity(_templateObject$4(), function (_ref) {
  var alignment = _ref.alignment;
  return alignment === 'right' ? 16 : 2;
}, function (_ref2) {
  var alignment = _ref2.alignment;
  return alignment === 'left' ? 16 : 2;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.colors.light;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.message.card.container.css;
});
var Footer = styled__default.View(_templateObject2$3(), function (_ref5) {
  var theme = _ref5.theme;
  return theme.message.card.footer.css;
});
var Cover = styled__default.Image(_templateObject3$2(), function (_ref6) {
  var theme = _ref6.theme;
  return theme.message.card.cover.css;
});
/**
 * UI component for card in attachments.
 *
 * @example ./docs/Card.md
 * @extends PureComponent
 */

var Card = withMessageContentContext(themed((_temp$3 = _class$3 =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Card, _React$Component);

    function Card(props) {
      var _this;

      _classCallCheck(this, Card);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Card).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "trimUrl", function (url) {
        var trimmedUrl;

        if (url !== undefined && url !== null) {
          trimmedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
        }

        return trimmedUrl;
      });

      _defineProperty(_assertThisInitialized(_this), "_goToURL", function (url) {
        reactNative.Linking.canOpenURL(url).then(function (supported) {
          if (supported) {
            reactNative.Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        });
      });

      return _this;
    }

    _createClass(Card, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
          image_url = _this$props.image_url,
          thumb_url = _this$props.thumb_url,
          title = _this$props.title,
          text = _this$props.text,
          title_link = _this$props.title_link,
          og_scrape_url = _this$props.og_scrape_url,
          type = _this$props.type,
          alignment = _this$props.alignment,
          onLongPress = _this$props.onLongPress;
        return React__default.createElement(Container$2, {
          onPress: function onPress() {
            _this2._goToURL(og_scrape_url || image_url || thumb_url);
          },
          onLongPress: onLongPress,
          alignment: alignment
        }, React__default.createElement(Cover, {
          source: {
            uri: makeImageCompatibleUrl(image_url || thumb_url)
          },
          resizMode: "cover"
        }), React__default.createElement(Footer, null, React__default.createElement(reactNative.View, {
          style: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transperant'
          }
        }, title && React__default.createElement(reactNative.Text, null, title), text && React__default.createElement(reactNative.Text, null, text), React__default.createElement(reactNative.Text, null, this.trimUrl(title_link || og_scrape_url))), type === 'giphy' && React__default.createElement(reactNative.Image, {
          source: img
        })));
      }
    }]);

    return Card;
  }(React__default.Component), _defineProperty(_class$3, "themePath", 'card'), _defineProperty(_class$3, "propTypes", {
    /** Title retured by the OG scraper */
    title: PropTypes.string,

    /** Link retured by the OG scraper */
    title_link: PropTypes.string,

    /** The scraped url, used as a fallback if the OG-data doesnt include a link */
    og_scrape_url: PropTypes.string,

    /** The url of the full sized image */
    image_url: PropTypes.string,

    /** The url for thumbnail sized image*/
    thumb_url: PropTypes.string,

    /** Description retured by the OG scraper */
    text: PropTypes.string,
    type: PropTypes.string,
    alignment: PropTypes.string,
    onLongPress: PropTypes.func
  }), _temp$3)));

var _class$4, _temp$4;

function _templateObject4$1() {
  var data = _taggedTemplateLiteral(["\n  font-weight: 700;\n  font-size: 10;\n  text-transform: uppercase;\n  opacity: 0.8;\n  ", "\n"]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$3() {
  var data = _taggedTemplateLiteral(["\n  margin-left: 5;\n  margin-right: 5;\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 10;\n  opacity: 0.8;\n  ", "\n"]);

  _templateObject3$3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$4() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  height: 0.5;\n  background-color: ", ";\n  ", "\n"]);

  _templateObject2$4 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  margin-top: 20;\n  margin-bottom: 20;\n  ", "\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var Container$3 = styled__default.View(_templateObject$5(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageList.dateSeparator.container.css;
});
var Line = styled__default.View(_templateObject2$4(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.light;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.messageList.dateSeparator.line.css;
});
var DateText = styled__default.Text(_templateObject3$3(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.messageList.dateSeparator.dateText.css;
});
var Date$1 = styled__default.Text(_templateObject4$1(), function (_ref5) {
  var theme = _ref5.theme;
  return theme.messageList.dateSeparator.date.css;
});
/**
 * @extends PureComponent
 * @example ./docs/DateSeparator.md
 */

var DateSeparator = themed((_temp$4 = _class$4 =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(DateSeparator, _React$PureComponent);

    function DateSeparator() {
      _classCallCheck(this, DateSeparator);

      return _possibleConstructorReturn(this, _getPrototypeOf(DateSeparator).apply(this, arguments));
    }

    _createClass(DateSeparator, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          message = _this$props.message,
          formatDate = _this$props.formatDate;
        return React__default.createElement(Container$3, null, React__default.createElement(Line, null), React__default.createElement(DateText, null, formatDate ? formatDate(message.date) : React__default.createElement(React__default.Fragment, null, React__default.createElement(Date$1, null, Moment(message.date).format('dddd')), " at", ' ', Moment(message.date).format('hh:mm A'))), React__default.createElement(Line, null));
      }
    }]);

    return DateSeparator;
  }(React__default.PureComponent), _defineProperty(_class$4, "propTypes", {
    message: PropTypes.object.isRequired,

    /**
     * Formatter function for date object.
     *
     * @param date Date object of message
     * @returns string
     */
    formatDate: PropTypes.func
  }), _defineProperty(_class$4, "themePath", 'messageList.dateSeparator'), _temp$4));

var EmptyStateIndicator = function EmptyStateIndicator(_ref) {
  var listType = _ref.listType;
  var Indicator;

  switch (listType) {
    case 'channel':
      Indicator = React__default.createElement(reactNative.Text, null, "You have no channels currently");
      break;

    case 'message':
      Indicator = null;
      break;

    default:
      Indicator = React__default.createElement(reactNative.Text, null, "No itens exist");
      break;
  }

  return Indicator;
};

function _templateObject4$2() {
  var data = _taggedTemplateLiteral(["\n  font-size: 13px;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.5);\n  ", "\n"]);

  _templateObject4$2 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  margin-left: 10px;\n  ", "\n"]);

  _templateObject3$4 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$5() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  padding: 10px;\n  ", "\n"]);

  _templateObject2$5 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n  font-size: 10;\n  color: rgba(0, 0, 0, 0.5);\n  ", "\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var Date$2 = styled__default.Text(_templateObject$6(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageList.eventIndicator.date.css;
});
var MemberUpdateContainer = styled__default.View(_templateObject2$5(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageList.eventIndicator.memberUpdateContainer.css;
});
var MemberUpdateTextContainer = styled__default.View(_templateObject3$4(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.messageList.eventIndicator.memberUpdateTextContainer.css;
});
var MemberUpdateText = styled__default.Text(_templateObject4$2(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.messageList.eventIndicator.memberUpdateText.css;
});
/**
 * A component to display a message regarding channel notifications such as
 * 'member.added', 'member.removed' etc.
 */

var EventIndicator = function EventIndicator(_ref5) {
  var event = _ref5.event;

  if (event.type === 'member.added' || event.type === 'member.removed') {
    return React__default.createElement(MemberUpdateContainer, null, React__default.createElement(Avatar, {
      name: event.user.name,
      image: event.user.image
    }), React__default.createElement(MemberUpdateTextContainer, null, React__default.createElement(MemberUpdateText, null, event.user.name, event.type === 'member.added' ? ' joined the chat' : ' was removed from the chat'), React__default.createElement(Date$2, null, Moment(event.received_at).format('hh:mm A'))));
  }

  return null;
};

EventIndicator.propTypes = {
  event: PropTypes.object
};

const img$1 = require('.//images/PDF.png');

const img$2 = require('.//images/DOC.png');

const img$3 = require('.//images/PPT.png');

const img$4 = require('.//images/XLS.png');

const img$5 = require('.//images/TAR.png');

// https://stackoverflow.com/a/4212908/2570866

var wordMimeTypes = [// Microsoft Word
  // .doc .dot
  'application/msword', // .doc .dot
  'application/msword-template', // .docx
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .dotx (no test)
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template', // .docm
  'application/vnd.ms-word.document.macroEnabled.12', // .dotm (no test)
  'application/vnd.ms-word.template.macroEnabled.12', // LibreOffice/OpenOffice Writer
  // .odt
  'application/vnd.oasis.opendocument.text', // .ott
  'application/vnd.oasis.opendocument.text-template', // .fodt
  'application/vnd.oasis.opendocument.text-flat-xml' // .uot
  // NOTE: firefox doesn't know mimetype so maybe ignore
];
var excelMimeTypes = [// .csv
  'text/csv', // TODO: maybe more data files
  // Microsoft Excel
  // .xls .xlt .xla (no test for .xla)
  'application/vnd.ms-excel', // .xlsx
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xltx (no test)
  'application/vnd.openxmlformats-officedocument.spreadsheetml.template', // .xlsm
  'application/vnd.ms-excel.sheet.macroEnabled.12', // .xltm (no test)
  'application/vnd.ms-excel.template.macroEnabled.12', // .xlam (no test)
  'application/vnd.ms-excel.addin.macroEnabled.12', // .xlsb (no test)
  'application/vnd.ms-excel.addin.macroEnabled.12', // LibreOffice/OpenOffice Calc
  // .ods
  'application/vnd.oasis.opendocument.spreadsheet', // .ots
  'application/vnd.oasis.opendocument.spreadsheet-template', // .fods
  'application/vnd.oasis.opendocument.spreadsheet-flat-xml' // .uos
  // NOTE: firefox doesn't know mimetype so maybe ignore
];
var powerpointMimeTypes = [// Microsoft Word
  // .ppt .pot .pps .ppa (no test for .ppa)
  'application/vnd.ms-powerpoint', // .pptx
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .potx (no test)
  'application/vnd.openxmlformats-officedocument.presentationml.template', // .ppsx
  'application/vnd.openxmlformats-officedocument.presentationml.slideshow', // .ppam
  'application/vnd.ms-powerpoint.addin.macroEnabled.12', // .pptm
  'application/vnd.ms-powerpoint.presentation.macroEnabled.12', // .potm
  'application/vnd.ms-powerpoint.template.macroEnabled.12', // .ppsm
  'application/vnd.ms-powerpoint.slideshow.macroEnabled.12', // LibreOffice/OpenOffice Writer
  // .odp
  'application/vnd.oasis.opendocument.presentation', // .otp
  'application/vnd.oasis.opendocument.presentation-template', // .fodp
  'application/vnd.oasis.opendocument.presentation-flat-xml' // .uop
  // NOTE: firefox doesn't know mimetype so maybe ignore
];
var archiveFileTypes = [// .zip
  'application/zip', // .z7
  'application/x-7z-compressed', // .ar
  'application/x-archive', // .tar
  'application/x-tar', // .tar.gz
  'application/gzip', // .tar.Z
  'application/x-compress', // .tar.bz2
  'application/x-bzip', // .tar.lz
  'application/x-lzip', // .tar.lz4
  'application/x-lz4', // .tar.lzma
  'application/x-lzma', // .tar.lzo (no test)
  'application/x-lzop', // .tar.xz
  'application/x-xz', // .war
  'application/x-webarchive', // .rar
  'application/vnd.rar'];
var codeFileTypes = [// .html .htm
  'text/html', // .css
  'text/css', // .js
  'application/x-javascript', // .json
  'application/json', // .py
  'text/x-python', // .go
  'text/x-go', // .c
  'text/x-csrc', // .cpp
  'text/x-c++src', // .rb
  'application/x-ruby', // .rust
  'text/rust', // .java
  'text/x-java', // .php
  'application/x-php', // .cs
  'text/x-csharp', // .scala
  'text/x-scala', // .erl
  'text/x-erlang', // .sh
  'application/x-shellscript'];
var mimeTypeToIconMap = {
  'application/pdf': img$1
};

for (var _i = 0, _wordMimeTypes = wordMimeTypes; _i < _wordMimeTypes.length; _i++) {
  var type = _wordMimeTypes[_i];
  mimeTypeToIconMap[type] = img$2;
}

for (var _i2 = 0, _excelMimeTypes = excelMimeTypes; _i2 < _excelMimeTypes.length; _i2++) {
  var _type = _excelMimeTypes[_i2];
  mimeTypeToIconMap[_type] = img$4;
}

for (var _i3 = 0, _powerpointMimeTypes = powerpointMimeTypes; _i3 < _powerpointMimeTypes.length; _i3++) {
  var _type2 = _powerpointMimeTypes[_i3];
  mimeTypeToIconMap[_type2] = img$3;
}

for (var _i4 = 0, _archiveFileTypes = archiveFileTypes; _i4 < _archiveFileTypes.length; _i4++) {
  var _type3 = _archiveFileTypes[_i4];
  mimeTypeToIconMap[_type3] = img$5;
}

for (var _i5 = 0, _codeFileTypes = codeFileTypes; _i5 < _codeFileTypes.length; _i5++) {
  var _type4 = _codeFileTypes[_i5];
  mimeTypeToIconMap[_type4] = img$2;
}

function mimeTypeToIcon(mimeType) {
  if (mimeType == null) {
    return img$2;
  }

  var icon = mimeTypeToIconMap[mimeType];

  if (icon) {
    return icon;
  }

  return img$2;
}

var FileIcon =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(FileIcon, _React$Component);

    function FileIcon() {
      _classCallCheck(this, FileIcon);

      return _possibleConstructorReturn(this, _getPrototypeOf(FileIcon).apply(this, arguments));
    }

    _createClass(FileIcon, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          mimeType = _this$props.mimeType,
          size = _this$props.size;
        return React.createElement(reactNative.Image, {
          source: mimeTypeToIcon(mimeType),
          style: {
            height: size,
            width: size
          }
        });
      }
    }]);

    return FileIcon;
  }(React.Component);

var _class$5, _temp$5;

function _templateObject3$5() {
  var data = _taggedTemplateLiteral(["\n    color: ", ";\n    ", "\n  "]);

  _templateObject3$5 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$6() {
  var data = _taggedTemplateLiteral(["\n    background-color: ", ";\n    border-color: ", ";\n    border-width: 1;\n    border-radius: 20;\n    padding-top: 5px;\n    padding-bottom: 5px;\n    padding-left: 10px;\n    padding-right: 10px;\n    ", "\n  "]);

  _templateObject2$6 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$7() {
  var data = _taggedTemplateLiteral(["\n    flex-direction: row;\n    justify-content: space-between;\n    padding: 5px;\n    ", "\n  "]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var Container$4 = styled__default.View(_templateObject$7(), function (_ref) {
  var theme = _ref.theme;
  return theme.message.actions.container.css;
});
var Button = styled__default(function (_ref2) {
  var buttonStyle = _ref2.buttonStyle,
    rest = _objectWithoutProperties(_ref2, ["buttonStyle"]);

  return React__default.createElement(reactNative.TouchableOpacity, rest);
})(_templateObject2$6(), function (_ref3) {
  var theme = _ref3.theme,
    buttonStyle = _ref3.buttonStyle;
  return buttonStyle === 'primary' ? theme.message.actions.button.primaryBackgroundColor : theme.message.actions.button.defaultBackgroundColor;
}, function (_ref4) {
  var theme = _ref4.theme,
    buttonStyle = _ref4.buttonStyle;
  return buttonStyle === 'primary' ? theme.message.actions.button.primaryBorderColor : theme.message.actions.button.defaultBorderColor;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.message.actions.button.css;
});
var ButtonText = styled__default(function (_ref6) {
  var buttonStyle = _ref6.buttonStyle,
    rest = _objectWithoutProperties(_ref6, ["buttonStyle"]);

  return React__default.createElement(reactNative.Text, rest);
})(_templateObject3$5(), function (_ref7) {
  var theme = _ref7.theme,
    buttonStyle = _ref7.buttonStyle;
  return buttonStyle === 'primary' ? theme.message.actions.buttonText.primaryColor : theme.message.actions.buttonText.defaultColor;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.message.actions.buttonText.css;
});
/**
 * AttachmentActions - The actions you can take on an attachment.
 * Actions in combination with attachments can be used to build [commands](https://getstream.io/chat/docs/#channel_commands).
 *
 * @example ./docs/AttachmentActions.md
 * @extends PureComponent
 */

var AttachmentActions = themed((_temp$5 = _class$5 =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(AttachmentActions, _React$PureComponent);

    function AttachmentActions() {
      _classCallCheck(this, AttachmentActions);

      return _possibleConstructorReturn(this, _getPrototypeOf(AttachmentActions).apply(this, arguments));
    }

    _createClass(AttachmentActions, [{
      key: "render",
      value: function render() {
        var _this = this;

        var _this$props = this.props,
          id = _this$props.id,
          actions = _this$props.actions,
          actionHandler = _this$props.actionHandler;
        return React__default.createElement(Container$4, null, actions.map(function (action) {
          return React__default.createElement(Button, {
            key: "".concat(id, "-").concat(action.value),
            buttonStyle: action.style,
            onPress: actionHandler.bind(_this, action.name, action.value)
          }, React__default.createElement(ButtonText, {
            buttonStyle: action.style
          }, action.text));
        }));
      }
    }]);

    return AttachmentActions;
  }(React__default.PureComponent), _defineProperty(_class$5, "themePath", 'message.actions'), _defineProperty(_class$5, "propTypes", {
    // /** The id of the form input */
    // id: PropTypes.string.isRequired,

    /** The text for the form input */
    text: PropTypes.string,

    /** A list of actions */
    actions: PropTypes.array.isRequired,

    /** The handler to execute after selecting an action */
    actionHandler: PropTypes.func.isRequired
  }), _temp$5));

const img$6 = require('.//images/icons/close-round.png');

var _class$6, _temp$6;

function _templateObject$8() {
  var data = _taggedTemplateLiteral(["\n  width: 30;\n  height: 30;\n  border-radius: 3;\n  align-items: center;\n  justify-content: center;\n  background-color: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  ", "\n"]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}
var Container$5 = styled__default.View(_templateObject$8(), function (_ref) {
  var theme = _ref.theme;
  return theme.closeButton.container.css;
});
var CloseButton = themed((_temp$6 = _class$6 =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(CloseButton, _React$PureComponent);

    function CloseButton() {
      _classCallCheck(this, CloseButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(CloseButton).apply(this, arguments));
    }

    _createClass(CloseButton, [{
      key: "render",
      value: function render() {
        return React__default.createElement(Container$5, null, React__default.createElement(reactNative.Image, {
          source: img$6
        }));
      }
    }]);

    return CloseButton;
  }(React__default.PureComponent), _defineProperty(_class$6, "themePath", 'closeButton'), _temp$6));
CloseButton.propTypes = {};

var _class$7, _temp$7;

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: 30;\n  height: 30;\n  margin-right: 20;\n  margin-top: 20;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 20;\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  position: absolute;\n  width: 100%;\n  z-index: 1000;\n  ", "\n"]);

  _templateObject4$3 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  height: ", ";\n  width: ", ";\n  ", "\n"]);

  _templateObject3$6 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$7() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  width: ", ";\n\n  height: ", ";\n\n  overflow: hidden;\n  border-radius: 16;\n  border-bottom-right-radius: ", ";\n  border-bottom-left-radius: ", ";\n  ", "\n"]);

  _templateObject2$7 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$9() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  height: 200px;\n  width: ", ";\n  border-top-left-radius: 16;\n  border-top-right-radius: 16;\n  border-bottom-left-radius: ", ";\n  border-bottom-right-radius: ", ";\n  overflow: hidden;\n  ", "\n"]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
var Single = styled__default.TouchableOpacity(_templateObject$9(), function (_ref) {
  var theme = _ref.theme;
  return theme.message.gallery.width;
}, function (_ref2) {
  var alignment = _ref2.alignment;
  return alignment === 'right' ? 16 : 2;
}, function (_ref3) {
  var alignment = _ref3.alignment;
  return alignment === 'left' ? 16 : 2;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.message.gallery.single.css;
});
var GalleryContainer = styled__default.View(_templateObject2$7(), function (_ref5) {
  var theme = _ref5.theme;
  return theme.message.gallery.width;
}, function (_ref6) {
  var theme = _ref6.theme,
    length = _ref6.length;
  return length >= 4 ? theme.message.gallery.doubleSize : length === 3 ? theme.message.gallery.halfSize : theme.message.gallery.size;
}, function (_ref7) {
  var alignment = _ref7.alignment;
  return alignment === 'left' ? 16 : 2;
}, function (_ref8) {
  var alignment = _ref8.alignment;
  return alignment === 'right' ? 16 : 2;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.message.gallery.galleryContainer.css;
});
var ImageContainer = styled__default.TouchableOpacity(_templateObject3$6(), function (_ref10) {
  var theme = _ref10.theme,
    length = _ref10.length;
  return length !== 3 ? theme.message.gallery.size : theme.message.gallery.halfSize;
}, function (_ref11) {
  var theme = _ref11.theme,
    length = _ref11.length;
  return length !== 3 ? theme.message.gallery.size : theme.message.gallery.halfSize;
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.message.gallery.imageContainer.css;
});
/**
 * UI component for card in attachments.
 *
 * @example ./docs/Gallery.md
 */

var Gallery = withMessageContentContext(themed((_temp$7 = _class$7 =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(Gallery, _React$PureComponent);

    function Gallery(props) {
      var _this;

      _classCallCheck(this, Gallery);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Gallery).call(this, props));
      _this.state = {
        viewerModalOpen: false,
        viewerModalImageIndex: 0
      };
      return _this;
    }

    _createClass(Gallery, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        if (!this.props.images || this.props.images.length === 0) return null;

        var images = _toConsumableArray(this.props.images).map(function (i) {
          return {
            url: makeImageCompatibleUrl(i.image_url || i.thumb_url)
          };
        });

        if (images.length === 1) {
          return React__default.createElement(React__default.Fragment, null, React__default.createElement(Single, {
            onPress: function onPress() {
              _this2.setState({
                viewerModalOpen: true
              });
            },
            onLongPress: function onLongPress() {
              _this2.props.onLongPress();
            },
            alignment: this.props.alignment
          }, React__default.createElement(reactNative.Image, {
            style: {
              width: 100 + '%',
              height: 100 + '%'
            },
            resizeMode: "cover",
            source: {
              uri: images[0].url
            }
          })), React__default.createElement(reactNative.Modal, {
            visible: this.state.viewerModalOpen,
            transparent: true,
            onRequestClose: function onRequestClose() {
              _this2.setState({
                viewerModalOpen: false
              });
            }
          }, React__default.createElement(reactNative.SafeAreaView, {
            style: {
              flex: 1,
              backgroundColor: 'transparent'
            }
          }, React__default.createElement(ImageViewer, {
            imageUrls: images // TODO: We don't have 'save image' functionality.
            // Until we do, lets disable this feature. saveToLocalByLongPress prop basically
            // opens up popup menu to with an option "Save to the album", which basically does nothing.
            ,
            saveToLocalByLongPress: false,
            onCancel: function onCancel() {
              _this2.setState({
                viewerModalOpen: false
              });
            },
            enableSwipeDown: true,
            renderHeader: function renderHeader() {
              return React__default.createElement(GalleryHeader, {
                handleDismiss: function handleDismiss() {
                  _this2.setState({
                    viewerModalOpen: false
                  });
                }
              });
            }
          }))));
        }

        return React__default.createElement(React__default.Fragment, null, React__default.createElement(GalleryContainer, {
          length: images.length,
          alignment: this.props.alignment
        }, images.slice(0, 4).map(function (image, i) {
          return React__default.createElement(ImageContainer, {
            key: "gallery-item-".concat(i),
            length: images.length,
            activeOpacity: 0.8,
            onPress: function onPress() {
              _this2.setState({
                viewerModalOpen: true,
                viewerModalImageIndex: i
              });
            },
            onLongPress: _this2.props.onLongPress
          }, i === 3 && images.length > 4 ? React__default.createElement(reactNative.View, {
            style: {
              width: '100%',
              height: '100%'
            }
          }, React__default.createElement(reactNative.Image, {
            style: {
              width: 100 + '%',
              height: 100 + '%'
            },
            resizeMode: "cover",
            source: {
              uri: images[3].url
            }
          }), React__default.createElement(reactNative.View, {
            style: {
              position: 'absolute',
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.69)'
            }
          }, React__default.createElement(reactNative.Text, {
            style: {
              color: 'white',
              fontWeight: '700',
              fontSize: 22
            }
          }, ' ', "+ ", images.length - 3, " more"))) : React__default.createElement(reactNative.Image, {
            style: {
              width: 100 + '%',
              height: 100 + '%'
            },
            resizeMode: "cover",
            source: {
              uri: image.url
            }
          }));
        })), React__default.createElement(reactNative.Modal, {
          onRequestClose: function onRequestClose() {
            _this2.setState({
              viewerModalOpen: false
            });
          },
          visible: this.state.viewerModalOpen,
          transparent: true
        }, React__default.createElement(reactNative.SafeAreaView, {
          style: {
            flex: 1,
            backgroundColor: 'transparent'
          }
        }, React__default.createElement(ImageViewer, {
          imageUrls: images,
          onCancel: function onCancel() {
            _this2.setState({
              viewerModalOpen: false
            });
          },
          index: this.state.viewerModalImageIndex,
          enableSwipeDown: true,
          renderHeader: function renderHeader() {
            return React__default.createElement(GalleryHeader, {
              handleDismiss: function handleDismiss() {
                _this2.setState({
                  viewerModalOpen: false
                });
              }
            });
          }
        }))));
      }
    }]);

    return Gallery;
  }(React__default.PureComponent), _defineProperty(_class$7, "themePath", 'message.gallery'), _defineProperty(_class$7, "propTypes", {
    /** The images to render */
    images: PropTypes.arrayOf(PropTypes.shape({
      image_url: PropTypes.string,
      thumb_url: PropTypes.string
    })),
    onLongPress: PropTypes.func,
    alignment: PropTypes.string
  }), _temp$7)));
var HeaderContainer = styled__default.View(_templateObject4$3(), function (_ref13) {
  var theme = _ref13.theme;
  return theme.message.gallery.header.container.css;
});
var HeaderButton = styled__default.TouchableOpacity(_templateObject5(), function (_ref14) {
  var theme = _ref14.theme;
  return theme.message.gallery.header.button.css;
});

var GalleryHeader = function GalleryHeader(_ref15) {
  var handleDismiss = _ref15.handleDismiss;
  return React__default.createElement(HeaderContainer, null, React__default.createElement(HeaderButton, {
    onPress: handleDismiss
  }, React__default.createElement(CloseButton, null)));
};

var _class$8, _temp$8;

function _templateObject4$4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject4$4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$7() {
  var data = _taggedTemplateLiteral(["\n  font-weight: 700;\n  ", "\n"]);

  _templateObject3$7 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$8() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  padding-left: 10px;\n  ", "\n"]);

  _templateObject2$8 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$a() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  background-color: #ebebeb;\n  padding: 10px;\n  border-radius: ", ";\n  border-bottom-left-radius: ", ";\n  border-bottom-right-radius: ", ";\n  ", "\n"]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}
var FileContainer = styled__default.View(_templateObject$a(), function (_ref) {
  var groupStyle = _ref.groupStyle;
  if (groupStyle === 'middle' || groupStyle === 'bottom') return 0;
  return 16;
}, function (_ref2) {
  var alignment = _ref2.alignment,
    groupStyle = _ref2.groupStyle;
  if (groupStyle === 'top' || groupStyle === 'middle') return 0;
  return alignment === 'right' ? 16 : 2;
}, function (_ref3) {
  var alignment = _ref3.alignment,
    groupStyle = _ref3.groupStyle;
  if (groupStyle === 'top' || groupStyle === 'middle') return 0;
  return alignment === 'left' ? 16 : 2;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.message.file.container.css;
});
var FileDetails = styled__default.View(_templateObject2$8(), function (_ref5) {
  var theme = _ref5.theme;
  return theme.message.file.details.css;
});
var FileTitle = styled__default.Text(_templateObject3$7(), function (_ref6) {
  var theme = _ref6.theme;
  return theme.message.file.title.css;
});
var FileSize = styled__default.Text(_templateObject4$4(), function (_ref7) {
  var theme = _ref7.theme;
  return theme.message.file.size.css;
});
/**
 * Attachment - The message attachment
 *
 * @example ./docs/Attachment.md
 * @extends PureComponent
 */

var Attachment = withMessageContentContext(themed((_temp$8 = _class$8 =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(Attachment, _React$PureComponent);

    function Attachment(props) {
      var _this;

      _classCallCheck(this, Attachment);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Attachment).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "_goToURL", function (url) {
        reactNative.Linking.canOpenURL(url).then(function (supported) {
          if (supported) {
            reactNative.Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        });
      });

      return _this;
    }

    _createClass(Attachment, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var a = this.props.attachment;

        if (!a) {
          return null;
        }

        var type;

        if (a.type === 'giphy' || a.type === 'imgur') {
          type = 'card';
        } else if (a.type === 'image' && (a.title_link || a.og_scrape_url)) {
          type = 'card';
        } else if (a.type === 'image') {
          type = 'image';
        } else if (a.type === 'file') {
          type = 'file';
        } else if (a.type === 'audio') {
          type = 'audio';
        } else if (a.type === 'video') {
          type = 'media';
        } else if (a.type === 'product') {
          type = 'product';
        } else {
          type = 'card'; // extra = 'no-image';
        }

        var AttachmentFileIcon = this.props.AttachmentFileIcon;

        if (type === 'image') {
          return React__default.createElement(React__default.Fragment, null, React__default.createElement(Gallery, {
            alignment: this.props.alignment,
            images: [a]
          }), a.actions && a.actions.length > 0 && React__default.createElement(AttachmentActions, _extends({
            key: 'key-actions-' + a.id
          }, a, {
            actionHandler: this.props.actionHandler
          })));
        }

        if (a.type === 'giphy' || type === 'card') {
          if (a.actions && a.actions.length) {
            return React__default.createElement(reactNative.View, null, React__default.createElement(Card, _extends({}, a, {
              alignment: this.props.alignment
            })), a.actions && a.actions.length > 0 && React__default.createElement(AttachmentActions, _extends({
              key: 'key-actions-' + a.id
            }, a, {
              actionHandler: this.props.actionHandler
            })));
          } else {
            return React__default.createElement(Card, _extends({
              alignment: this.props.alignment
            }, a));
          }
        }

        if (a.type === 'file') {
          return React__default.createElement(reactNative.TouchableOpacity, {
            onPress: function onPress() {
              _this2._goToURL(a.asset_url);
            },
            onLongPress: this.props.onLongPress
          }, React__default.createElement(FileContainer, {
            alignment: this.props.alignment,
            groupStyle: this.props.groupStyle
          }, React__default.createElement(AttachmentFileIcon, {
            filename: a.title,
            mimeType: a.mime_type,
            size: 50
          }), React__default.createElement(FileDetails, null, React__default.createElement(FileTitle, {
            ellipsizeMode: "tail",
            numberOfLines: 2
          }, a.title), React__default.createElement(FileSize, null, a.file_size, " KB"))), a.actions && a.actions.length > 0 && React__default.createElement(AttachmentActions, _extends({
            key: 'key-actions-' + a.id
          }, a, {
            actionHandler: this.props.actionHandler
          })));
        }

        if (a.type === 'video' && a.asset_url && a.image_url) {
          return (// TODO: Put in video component
            React__default.createElement(Card, _extends({
              alignment: this.props.alignment
            }, a))
          );
        }

        return false;
      }
    }]);

    return Attachment;
  }(React__default.PureComponent), _defineProperty(_class$8, "themePath", 'attachment'), _defineProperty(_class$8, "propTypes", {
    /** The attachment to render */
    attachment: PropTypes.object.isRequired,

    /**
     * Position of message. 'right' | 'left'
     * 'right' message belongs with current user while 'left' message belonds to other users.
     * */
    alignment: PropTypes.string,

    /** Handler for actions. Actions in combination with attachments can be used to build [commands](https://getstream.io/chat/docs/#channel_commands). */
    actionHandler: PropTypes.func,

    /**
     * Position of message in group - top, bottom, middle, single.
     *
     * Message group is a group of consecutive messages from same user. groupStyles can be used to style message as per their position in message group
     * e.g., user avatar (to which message belongs to) is only showed for last (bottom) message in group.
     */
    groupStyle: PropTypes.oneOf(['single', 'top', 'middle', 'bottom']),

    /** Handler for long press event on attachment */
    onLongPress: PropTypes.func,

    /**
     * Custom UI component for attachment icon for type 'file' attachment.
     * Defaults to and accepts same props as: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/FileIcon.js
     */
    AttachmentFileIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType])
  }), _defineProperty(_class$8, "defaultProps", {
    AttachmentFileIcon: FileIcon
  }), _temp$8)));

function _templateObject$b() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: stretch;\n"]);

  _templateObject$b = function _templateObject() {
    return data;
  };

  return data;
}
var Container$6 = styled__default.View(_templateObject$b());
var FileAttachmentGroup =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(FileAttachmentGroup, _React$PureComponent);

    function FileAttachmentGroup(props) {
      _classCallCheck(this, FileAttachmentGroup);

      return _possibleConstructorReturn(this, _getPrototypeOf(FileAttachmentGroup).call(this, props));
    }

    _createClass(FileAttachmentGroup, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          messageId = _this$props.messageId,
          files = _this$props.files,
          handleAction = _this$props.handleAction,
          alignment = _this$props.alignment,
          AttachmentFileIcon = _this$props.AttachmentFileIcon;
        return React__default.createElement(Container$6, null, files && files.map(function (file, index, files) {
          var groupStyle;
          if (files.length === 1) groupStyle = 'single'; else if (index === 0) {
            groupStyle = 'top';
          } else if (index < files.length - 1 && index > 0) {
            groupStyle = 'middle';
          } else if (index === files.length - 1) groupStyle = 'bottom';
          return React__default.createElement(Attachment, {
            key: "".concat(messageId, "-").concat(index),
            attachment: file,
            actionHandler: handleAction,
            alignment: alignment,
            groupStyle: groupStyle,
            AttachmentFileIcon: AttachmentFileIcon
          });
        }));
      }
    }]);

    return FileAttachmentGroup;
  }(React__default.PureComponent);

_defineProperty(FileAttachmentGroup, "propTypes", {
  messageId: PropTypes.string,
  files: PropTypes.array,
  handleAction: PropTypes.func,
  alignment: PropTypes.oneOf(['right', 'left']),

  /**
   * Custom UI component for attachment icon for type 'file' attachment.
   * Defaults to: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/FileIcon.js
   */
  AttachmentFileIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType])
});

const img$7 = require('.//images/reload1.png');

var _class$9, _temp$9;

function _templateObject2$9() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(255, 255, 255, 0);\n  ", ";\n"]);

  _templateObject2$9 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$c() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(0, 0, 0, 0.3);\n  opacity: 0;\n  ", ";\n"]);

  _templateObject$c = function _templateObject() {
    return data;
  };

  return data;
}
var Overlay = styled__default.View(_templateObject$c(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageInput.uploadProgressIndicator.overlay.css;
});
var Container$7 = styled__default.View(_templateObject2$9(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageInput.uploadProgressIndicator.container.css;
});
var UploadProgressIndicator = themed((_temp$9 = _class$9 =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(UploadProgressIndicator, _React$PureComponent);

    function UploadProgressIndicator(props) {
      _classCallCheck(this, UploadProgressIndicator);

      return _possibleConstructorReturn(this, _getPrototypeOf(UploadProgressIndicator).call(this, props));
    }

    _createClass(UploadProgressIndicator, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          active = _this$props.active,
          children = _this$props.children,
          type = _this$props.type;

        if (!active) {
          return React__default.createElement(reactNative.View, null, children);
        }

        return React__default.createElement(reactNative.TouchableOpacity, {
          onPress: this.props.action
        }, children, React__default.createElement(Overlay, null), React__default.createElement(Container$7, null, type === ProgressIndicatorTypes.IN_PROGRESS && React__default.createElement(reactNative.View, {
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center'
          }
        }, React__default.createElement(reactNative.ActivityIndicator, {
          style: {},
          color: "white"
        })), type === ProgressIndicatorTypes.RETRY && React__default.createElement(reactNative.Image, {
          source: img$7,
          style: {
            height: 18,
            width: 18
          }
        })));
      }
    }]);

    return UploadProgressIndicator;
  }(React__default.PureComponent), _defineProperty(_class$9, "themePath", 'messageInput.uploadProgressIndicator'), _defineProperty(_class$9, "propTypes", {
    active: PropTypes.bool,
    type: PropTypes.oneOf([ProgressIndicatorTypes.IN_PROGRESS, ProgressIndicatorTypes.RETRY]),
    action: PropTypes.func
  }), _temp$9));

/**
 * FileUploadPreview
 *
 * @example ./docs/FileUploadPreview.md
 * @extends PureComponent
 */

var FILE_PREVIEW_HEIGHT = 50;
var FILE_PREVIEW_PADDING = 10;
/**
 * UI Component to preview the files set for upload
 *
 * @example ./docs/FileUploadPreview.md
 * @extends PureComponent
 */

var FileUploadPreview =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(FileUploadPreview, _React$PureComponent);

    function FileUploadPreview(props) {
      var _this;

      _classCallCheck(this, FileUploadPreview);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(FileUploadPreview).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "_renderItem", function (_ref) {
        var item = _ref.item;
        var type;
        if (item.state === FileState.UPLOADING) type = ProgressIndicatorTypes.IN_PROGRESS;
        if (item.state === FileState.UPLOAD_FAILED) type = ProgressIndicatorTypes.RETRY;
        var AttachmentFileIcon = _this.props.AttachmentFileIcon;
        return React__default.createElement(UploadProgressIndicator, {
          active: item.state !== FileState.UPLOADED,
          type: type,
          action: _this.props.retryUpload.bind(_assertThisInitialized(_this), item.id)
        }, React__default.createElement(reactNative.View, {
          style: {
            height: FILE_PREVIEW_HEIGHT,
            padding: FILE_PREVIEW_PADDING,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5,
            borderColor: '#EBEBEB',
            borderWidth: 0.5
          }
        }, React__default.createElement(reactNative.View, {
          style: {
            flexDirection: 'row',
            alignItems: 'center'
          }
        }, React__default.createElement(AttachmentFileIcon, {
          mimeType: item.file.type,
          size: 20
        }), React__default.createElement(reactNative.Text, {
          style: {
            paddingLeft: 10
          }
        }, item.file.name.length > 35 ? item.file.name.substring(0, 35).concat('...') : item.file.name)), React__default.createElement(reactNative.Text, {
          onPress: _this.props.removeFile.bind(_assertThisInitialized(_this), item.id)
        }, "X")));
      });

      return _this;
    }

    _createClass(FileUploadPreview, [{
      key: "render",
      value: function render() {
        if (!this.props.fileUploads || this.props.fileUploads.length === 0) return null;
        return React__default.createElement(reactNative.View, {
          style: {
            display: 'flex',
            height: this.props.fileUploads.length * (FILE_PREVIEW_HEIGHT + 5),
            marginRight: 10,
            marginLeft: 10
          }
        }, React__default.createElement(reactNative.FlatList, {
          style: {
            flex: 1
          },
          data: this.props.fileUploads,
          keyExtractor: function keyExtractor(item) {
            return item.id;
          },
          renderItem: this._renderItem
        }));
      }
    }]);

    return FileUploadPreview;
  }(React__default.PureComponent);

_defineProperty(FileUploadPreview, "propTypes", {
  fileUploads: PropTypes.array.isRequired,
  removeFile: PropTypes.func,
  retryUpload: PropTypes.func,

  /**
   * Custom UI component for attachment icon for type 'file' attachment.
   * Defaults to and accepts same props as: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/FileIcon.js
   */
  AttachmentFileIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType])
});

_defineProperty(FileUploadPreview, "defaultProps", {
  AttachmentFileIcon: FileIcon
});

var IconSquare = function IconSquare(_ref) {
  var icon = _ref.icon,
    onPress = _ref.onPress;
  if (onPress) return React__default.createElement(reactNative.TouchableOpacity, {
    style: {
      padding: 5,
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 5
    },
    onPress: onPress
  }, React__default.createElement(reactNative.Image, {
    source: icon,
    style: {
      height: 15,
      width: 15
    }
  })); else return React__default.createElement(reactNative.View, {
    style: {
      padding: 5,
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 5
    }
  }, React__default.createElement(reactNative.Image, {
    source: icon,
    style: {
      height: 15,
      width: 15
    }
  }));
};
IconSquare.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func
};

var _class$a, _temp$a;

function _templateObject5$1() {
  var data = _taggedTemplateLiteral(["\n  width: 10;\n  height: 10;\n  ", ";\n"]);

  _templateObject5$1 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$5() {
  var data = _taggedTemplateLiteral(["\n  width: 50;\n  height: 50;\n  border-radius: 10;\n  ", ";\n"]);

  _templateObject4$5 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$8() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 5;\n  right: 5;\n  background-color: #fff;\n  width: 20;\n  height: 20;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 20;\n  ", ";\n"]);

  _templateObject3$8 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$a() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  height: 50;\n  flex-direction: row;\n  align-items: flex-start;\n  margin-left: 5;\n  ", ";\n"]);

  _templateObject2$a = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$d() {
  var data = _taggedTemplateLiteral(["\n  height: 70;\n  display: flex;\n  padding: 10px;\n  ", ";\n"]);

  _templateObject$d = function _templateObject() {
    return data;
  };

  return data;
}
var Container$8 = styled__default.View(_templateObject$d(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageInput.imageUploadPreview.container.css;
});
var ItemContainer = styled__default.View(_templateObject2$a(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageInput.imageUploadPreview.itemContainer.css;
});
var Dismiss = styled__default.TouchableOpacity(_templateObject3$8(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.messageInput.imageUploadPreview.dismiss.css;
});
var Upload = styled__default.Image(_templateObject4$5(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.messageInput.imageUploadPreview.upload.css;
});
var DismissImage = styled__default.Image(_templateObject5$1(), function (_ref5) {
  var theme = _ref5.theme;
  return theme.messageInput.imageUploadPreview.dismissImage.css;
});
/**
 * UI Component to preview the images set for upload
 *
 * @example ./docs/ImageUploadPreview.md
 * @extends PureComponent
 */

var ImageUploadPreview = themed((_temp$a = _class$a =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(ImageUploadPreview, _React$PureComponent);

    function ImageUploadPreview(props) {
      var _this;

      _classCallCheck(this, ImageUploadPreview);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageUploadPreview).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "_renderItem", function (_ref6) {
        var item = _ref6.item;
        var type;
        var retryUpload = _this.props.retryUpload;
        if (item.state === FileState.UPLOADING) type = ProgressIndicatorTypes.IN_PROGRESS;
        if (item.state === FileState.UPLOAD_FAILED) type = ProgressIndicatorTypes.RETRY;
        return React__default.createElement(React__default.Fragment, null, React__default.createElement(ItemContainer, null, React__default.createElement(UploadProgressIndicator, {
          active: item.state !== FileState.UPLOADED,
          type: type,
          action: retryUpload && retryUpload.bind(_assertThisInitialized(_this), item.id)
        }, React__default.createElement(Upload, {
          resizeMode: "cover",
          source: {
            uri: item.url || item.file.uri
          }
        })), React__default.createElement(Dismiss, {
          onPress: function onPress() {
            _this.props.removeImage(item.id);
          }
        }, React__default.createElement(DismissImage, {
          source: img$6
        }))));
      });

      return _this;
    }

    _createClass(ImageUploadPreview, [{
      key: "render",
      value: function render() {
        if (!this.props.imageUploads || this.props.imageUploads.length === 0) return null;
        return React__default.createElement(Container$8, null, React__default.createElement(reactNative.FlatList, {
          horizontal: true,
          style: {
            flex: 1
          },
          data: this.props.imageUploads,
          keyExtractor: function keyExtractor(item) {
            return item.id;
          },
          renderItem: this._renderItem
        }));
      }
    }]);

    return ImageUploadPreview;
  }(React__default.PureComponent), _defineProperty(_class$a, "themePath", 'messageInput.imageUploadPreview'), _defineProperty(_class$a, "propTypes", {
    /**
     * Its an object/map of id vs image objects which are set for upload. It has following structure:
     *
     * ```json
     *  {
     *    "randomly_generated_temp_id_1": {
     *        "id": "randomly_generated_temp_id_1",
     *        "file": // File object
     *        "status": "Uploading" // or "Finished"
     *      },
     *    "randomly_generated_temp_id_2": {
     *        "id": "randomly_generated_temp_id_2",
     *        "file": // File object
     *        "status": "Uploading" // or "Finished"
     *      },
     *  }
     * ```
     *
     * */
    imageUploads: PropTypes.array.isRequired,

    /**
     * @param id Index of image in `imageUploads` array in state of MessageInput.
     */
    removeImage: PropTypes.func,

    /**
     * @param id Index of image in `imageUploads` array in state of MessageInput.
     */
    retryUpload: PropTypes.func
  }), _temp$a));

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * KeyboardCompatibleView is HOC component similar to [KeyboardAvoidingView](https://facebook.github.io/react-native/docs/keyboardavoidingview),
 * designed to work with MessageInput and MessageList component.
 *
 * Main motivation of writing this our own component was to get rid of issues that come with KeyboardAvoidingView from react-native
 * when used with components of fixed height. [Channel](https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/ChannelInner.js) component
 * uses `KeyboardCompatibleView` internally, so you don't need to explicitely add it.
 *
 * ```json
 * <KeyboardCompatibleView>
 *  <MessageList />
 *  <MessageInput />
 * </KeyboardCompatibleView>
 * ```
 */

var KeyboardCompatibleView =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(KeyboardCompatibleView, _React$PureComponent);

    function KeyboardCompatibleView(props) {
      var _this;

      _classCallCheck(this, KeyboardCompatibleView);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(KeyboardCompatibleView).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "setupListeners", function () {
        if (!_this.props.enabled) return;

        if (reactNative.Platform.OS === 'ios') {
          _this.keyboardDidShowListener = reactNative.Keyboard.addListener('keyboardWillShow', _this.keyboardDidShow);
        } else {
          // Android doesn't support keyboardWillShow event.
          _this.keyboardDidShowListener = reactNative.Keyboard.addListener('keyboardDidShow', _this.keyboardDidShow);
        } // We dismiss the keyboard manually (along with keyboardWillHide function) when message is touched.
        // Following listener is just for a case when keyboard gets dismissed due to something besides message touch.


        _this.keyboardDidHideListener = reactNative.Keyboard.addListener('keyboardDidHide', _this.keyboardDidHide);
      });

      _defineProperty(_assertThisInitialized(_this), "keyboardDidShow", function (e) {
        if (!_this.props.enabled) return;
        var keyboardHidingInProgressBeforeMeasure = _this._hidingKeyboardInProgress;
        var keyboardHeight = e.endCoordinates.height;

        _this.rootChannelView.measureInWindow(function (x, y) {
          // In case if keyboard was closed in meanwhile while
          // this measure function was being executed, then we
          // should abort further execution and let the event callback
          // keyboardDidHide proceed.
          if (!keyboardHidingInProgressBeforeMeasure && _this._hidingKeyboardInProgress) {
            return;
          }

          var _Dimensions$get = reactNative.Dimensions.get('window'),
            windowHeight = _Dimensions$get.height;

          var finalHeight;

          if (reactNative.Platform.OS === 'android') {
            finalHeight = windowHeight - y - keyboardHeight - reactNative.StatusBar.currentHeight;
          } else {
            finalHeight = windowHeight - y - keyboardHeight;
          }

          reactNative.Animated.timing(_this.state.channelHeight, {
            toValue: finalHeight,
            duration: _this.props.keyboardOpenAnimationDuration
          }).start(function () {
            // Force the final value, in case animation halted in between.
            _this.state.channelHeight.setValue(finalHeight);

            _this.setState({
              key: _this.state.key + 1
            });
          });
        });

        _this._keyboardOpen = true;
      });

      _defineProperty(_assertThisInitialized(_this), "keyboardDidHide", function () {
        _this._hidingKeyboardInProgress = true;
        reactNative.Animated.timing(_this.state.channelHeight, {
          toValue: _this.initialHeight,
          duration: _this.props.keyboardDismissAnimationDuration
        }).start(function () {
          // Force the final value, in case animation halted in between.
          _this.state.channelHeight.setValue(_this.initialHeight);

          _this._hidingKeyboardInProgress = false;
          _this._keyboardOpen = false;

          _this.setState({
            key: _this.state.key + 1
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "keyboardWillDismiss", function () {
        return new Promise(function (resolve) {
          if (!_this._keyboardOpen) {
            resolve();
            return;
          }

          reactNative.Animated.timing(_this.state.channelHeight, {
            toValue: _this.initialHeight,
            duration: _this.props.keyboardDismissAnimationDuration
          }).start(function (response) {
            _this.state.channelHeight.setValue(_this.initialHeight);

            if (response && !response.finished) {
              // If by some chance animation didn't go smooth or had some issue,
              // then simply defer promise resolution until after 500 ms.
              // This is the time we perform animation for adjusting animation of Channel component height
              // during keyboard dismissal.
              setTimeout(function () {
                resolve();
              }, _this.props.keyboardDismissAnimationDuration);
              return;
            }

            resolve();
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setRootChannelView", function (o) {
        _this.rootChannelView = o;
      });

      _defineProperty(_assertThisInitialized(_this), "onLayout", function (_ref) {
        var height = _ref.nativeEvent.layout.height;

        // Not to set initial height again.
        if (!_this.initialHeight) {
          _this.initialHeight = height;

          _this.state.channelHeight.setValue(_this.initialHeight);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "dismissKeyboard",
        /*#__PURE__*/
        _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee() {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    reactNative.Keyboard.dismiss();

                    if (!_this.props.enabled) {
                      _context.next = 4;
                      break;
                    }

                    _context.next = 4;
                    return _this.keyboardWillDismiss();

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })));

      _defineProperty(_assertThisInitialized(_this), "getContext", function () {
        return {
          dismissKeyboard: _this.dismissKeyboard
        };
      });

      _this.state = {
        channelHeight: new reactNative.Animated.Value('100%'),
        // For some reason UI doesn't update sometimes, when state is updated using setValue.
        // So to force update the component, I am using following key, which will be increamented
        // for every keyboard slide up and down.
        key: 0
      };

      _this.setupListeners();

      _this._keyboardOpen = false; // Following variable takes care of race condition between keyboardDidHide and keyboardDidShow.

      _this._hidingKeyboardInProgress = false;
      _this.rootChannelView = false;
      _this.initialHeight = undefined;
      return _this;
    }

    _createClass(KeyboardCompatibleView, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      } // TODO: Better to extract following functions to different HOC.

    }, {
      key: "render",
      value: function render() {
        var height = this.initialHeight ? {
          height: this.state.channelHeight
        } : {};
        return React__default.createElement(reactNative.Animated.View, {
          style: _objectSpread$2({
            display: 'flex'
          }, height),
          onLayout: this.onLayout
        }, React__default.createElement(KeyboardContext.Provider, {
          value: this.getContext()
        }, React__default.createElement(reactNative.View, {
          ref: this.setRootChannelView,
          collapsable: false
        }, this.props.children)));
      }
    }]);

    return KeyboardCompatibleView;
  }(React__default.PureComponent);

_defineProperty(KeyboardCompatibleView, "propTypes", {
  keyboardDismissAnimationDuration: PropTypes.number,
  keyboardOpenAnimationDuration: PropTypes.number,
  enabled: PropTypes.bool
});

_defineProperty(KeyboardCompatibleView, "defaultProps", {
  keyboardDismissAnimationDuration: 500,
  keyboardOpenAnimationDuration: 500,
  enabled: true
});

var LoadingErrorIndicator = function LoadingErrorIndicator(_ref) {
  var listType = _ref.listType;
  var Loader;

  switch (listType) {
    case 'channel':
      Loader = React__default.createElement(reactNative.Text, null, "Error loading channel list ...");
      break;

    case 'message':
      Loader = React__default.createElement(reactNative.Text, null, "Error loading messages for this channel ...");
      break;

    default:
      Loader = React__default.createElement(reactNative.Text, null, "Error loading");
      break;
  }

  return Loader;
};
LoadingErrorIndicator.propTypes = {
  listType: PropTypes.oneOf(['channel', 'message', 'default'])
};

var _class$b, _temp$b;

function _templateObject$e() {
  var data = _taggedTemplateLiteral(["\n  height: 30px;\n  width: 30px;\n  margin: 5px;\n  border-width: 2px;\n  border-radius: 30px;\n  justify-content: center;\n  border-color: ", ";\n  border-right-color: transparent;\n  ", "\n"]);

  _templateObject$e = function _templateObject() {
    return data;
  };

  return data;
}
var AnimatedView = reactNative.Animated.createAnimatedComponent(reactNative.View);
var Circle = styled__default(AnimatedView)(_templateObject$e(), function (_ref) {
  var theme = _ref.theme;
  return theme.colors.primary;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.spinner.css;
});
/**
 * @example ./docs/Spinner.md
 * @extends PureComponent
 */

var Spinner = themed((_temp$b = _class$b =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(Spinner, _React$PureComponent);

    function Spinner() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Spinner);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Spinner)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "state", {
        rotateValue: new reactNative.Animated.Value(0)
      });

      _defineProperty(_assertThisInitialized(_this), "_start", function () {
        reactNative.Animated.loop(reactNative.Animated.timing(_this.state.rotateValue, {
          toValue: 1,
          duration: 800,
          easing: reactNative.Easing.linear,
          useNativeDriver: true
        })).start();
      });

      return _this;
    }

    _createClass(Spinner, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._start();
      }
    }, {
      key: "render",
      value: function render() {
        return React__default.createElement(Circle, {
          style: {
            transform: [{
              rotate: this.state.rotateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })
            }]
          }
        });
      }
    }]);

    return Spinner;
  }(React__default.PureComponent), _defineProperty(_class$b, "themePath", 'spinner'), _temp$b));

function _templateObject2$b() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 20px;\n  font-size: 14px;\n  font-weight: 600;\n  ", "\n"]);

  _templateObject2$b = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$f() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  ", "\n"]);

  _templateObject$f = function _templateObject() {
    return data;
  };

  return data;
}
var Container$9 = styled__default.View(_templateObject$f(), function (_ref) {
  var theme = _ref.theme;
  return theme.loadingIndicator.container.css;
});
var LoadingText = styled__default.Text(_templateObject2$b(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.loadingIndicator.loadingText.css;
});
var LoadingIndicator =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(LoadingIndicator, _React$PureComponent);

    function LoadingIndicator() {
      _classCallCheck(this, LoadingIndicator);

      return _possibleConstructorReturn(this, _getPrototypeOf(LoadingIndicator).apply(this, arguments));
    }

    _createClass(LoadingIndicator, [{
      key: "render",
      value: function render() {
        switch (this.props.listType) {
          case 'channel':
            return React__default.createElement(Container$9, null, React__default.createElement(Spinner, null), React__default.createElement(LoadingText, null, this.props.loadingText ? this.props.loadingText : 'Loading channels ...'));

          case 'message':
            return React__default.createElement(Container$9, null, React__default.createElement(Spinner, null), React__default.createElement(LoadingText, null, this.props.loadingText ? this.props.loadingText : 'Loading messages ...'));

          case 'default':
          default:
            return React__default.createElement(Container$9, null, React__default.createElement(Spinner, null), React__default.createElement(LoadingText, null, this.props.loadingText ? this.props.loadingText : 'Loading ...'));
        }
      }
    }]);

    return LoadingIndicator;
  }(React__default.PureComponent);

_defineProperty(LoadingIndicator, "propTypes", {
  listType: PropTypes.oneOf(['channel', 'message', 'default']),
  loadingText: PropTypes.string
});

_defineProperty(LoadingIndicator, "defaultProps", {
  listType: 'default'
});

function _templateObject2$c() {
  var data = _taggedTemplateLiteral(["\n  width: 32;\n  height: 28;\n  ", "\n"]);

  _templateObject2$c = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$g() {
  var data = _taggedTemplateLiteral(["\n  margin-right: ", ";\n  margin-left: ", ";\n  ", "\n"]);

  _templateObject$g = function _templateObject() {
    return data;
  };

  return data;
}
var Container$a = styled__default.View(_templateObject$g(), function (_ref) {
  var alignment = _ref.alignment;
  return alignment === 'left' ? 8 : 0;
}, function (_ref2) {
  var alignment = _ref2.alignment;
  return alignment === 'right' ? 8 : 0;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.message.avatarWrapper.container.css;
});
var Spacer = styled__default.View(_templateObject2$c(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.message.avatarWrapper.spacer.css;
});
var MessageAvatar = function MessageAvatar(_ref5) {
  var message = _ref5.message,
    isMyMessage = _ref5.isMyMessage,
    groupStyles = _ref5.groupStyles;
  var pos = isMyMessage(message) ? 'right' : 'left';
  var showAvatar = groupStyles[0] === 'single' || groupStyles[0] === 'bottom' ? true : false;
  return React__default.createElement(Container$a, {
    alignment: pos
  }, showAvatar ? React__default.createElement(Avatar, {
    image: message.user.image,
    name: message.user.name || message.user.id
  }) : React__default.createElement(Spacer, null));
};
MessageAvatar.propTypes = {
  /** Current [message object](https://getstream.io/chat/docs/#message_format) */
  message: PropTypes.object,

  /**
   * Returns true if message (param) belongs to current user, else false
   *
   * @param message
   * */
  isMyMessage: PropTypes.func,

  /**
   * Position of message in group - top, bottom, middle, single.
   *
   * Message group is a group of consecutive messages from same user. groupStyles can be used to style message as per their position in message group
   * e.g., user avatar (to which message belongs to) is only showed for last (bottom) message in group.
   */
  groupStyles: PropTypes.array
};

const img$8 = require('.//images/reactionlist/left-tail.png');

const img$9 = require('.//images/reactionlist/left-center.png');

const img$a = require('.//images/reactionlist/left-end.png');

const img$b = require('.//images/reactionlist/right-tail.png');

const img$c = require('.//images/reactionlist/right-center.png');

const img$d = require('.//images/reactionlist/right-end.png');

var _class$c, _temp$c;

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  flex-direction: row;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  width: 14px;\n  height: 33px;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  height: 33;\n  flex: 1;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  width: 25px;\n  height: 33px;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  width: 14px;\n  height: 33px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  height: 33;\n  flex: 1;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$2() {
  var data = _taggedTemplateLiteral(["\n  width: 25px;\n  height: 33px;\n"]);

  _templateObject5$2 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$6() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  top: -23px;\n  opacity: ", ";\n"]);

  _templateObject4$6 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$9() {
  var data = _taggedTemplateLiteral(["\n  color: white;\n  font-size: 12;\n  ", "\n  ", "\n"]);

  _templateObject3$9 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$d() {
  var data = _taggedTemplateLiteral(["\n  opacity: ", ";\n  z-index: 10;\n  height: 24px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding-left: 5px;\n  padding-right: 5px;\n  ", "\n"]);

  _templateObject2$d = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$h() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  ", "\n  height: 28px;\n  z-index: 10;\n"]);

  _templateObject$h = function _templateObject() {
    return data;
  };

  return data;
}
var TouchableWrapper = styled__default.TouchableOpacity(_templateObject$h(), function (props) {
  return props.position === 'left' ? 'left: -10px;' : 'right: -10px;';
});
var Container$b = styled__default.View(_templateObject2$d(), function (_ref) {
  var visible = _ref.visible;
  return visible ? 1 : 0;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.message.reactionList.container.css;
});
var ReactionCount = styled__default(function (_ref3) {
  var reactionCounts = _ref3.reactionCounts,
    rest = _objectWithoutProperties(_ref3, ["reactionCounts"]);

  return React__default.createElement(reactNative.Text, rest);
})(_templateObject3$9(), function (_ref4) {
  var reactionCounts = _ref4.reactionCounts;
  return reactionCounts < 10 ? null : 'min-width: 20px;';
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.message.reactionList.reactionCount.css;
});
var ImageWrapper = styled__default.View(_templateObject4$6(), function (_ref6) {
  var visible = _ref6.visible;
  return visible ? 1 : 0;
});
var LeftTail = styled__default.Image(_templateObject5$2());
var LeftCenter = styled__default.Image(_templateObject6());
var LeftEnd = styled__default.Image(_templateObject7());
var RightTail = styled__default.Image(_templateObject8());
var RightCenter = styled__default.Image(_templateObject9());
var RightEnd = styled__default.Image(_templateObject10());
var Reactions = styled__default.View(_templateObject11());
/**
 * @example ./docs/ReactionList.md
 * @extends PureComponent
 */

var ReactionList = themed((_temp$c = _class$c =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(ReactionList, _React$PureComponent);

    function ReactionList(props) {
      var _this;

      _classCallCheck(this, ReactionList);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactionList).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "_renderReactions", function (reactions) {
        var reactionsByType = {};
        reactions.map(function (item) {
          if (reactions[item.type] === undefined) {
            return reactionsByType[item.type] = [item];
          } else {
            return reactionsByType[item.type] = [].concat(_toConsumableArray(reactionsByType[item.type]), [item]);
          }
        });
        var emojiDataByType = {};
        emojiData.forEach(function (e) {
          return emojiDataByType[e.id] = e;
        });
        var reactionTypes = emojiData.map(function (e) {
          return e.id;
        });
        return Object.keys(reactionsByType).map(function (type) {
          return reactionTypes.indexOf(type) > -1 ? React__default.createElement(reactNative.Text, {
            key: type
          }, emojiDataByType[type].icon) : null;
        });
      });

      return _this;
    }

    _createClass(ReactionList, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          latestReactions = _this$props.latestReactions,
          openReactionSelector = _this$props.openReactionSelector,
          getTotalReactionCount = _this$props.getTotalReactionCount,
          visible = _this$props.visible,
          position = _this$props.position;
        return React__default.createElement(TouchableWrapper, {
          position: position,
          onPress: openReactionSelector,
          activeOpacity: 1
        }, React__default.createElement(Container$b, {
          visible: visible
        }, React__default.createElement(Reactions, null, this._renderReactions(latestReactions)), React__default.createElement(ReactionCount, {
          reactionCounts: getTotalReactionCount()
        }, getTotalReactionCount())), React__default.createElement(ImageWrapper, {
          visible: visible
        }, position === 'left' ? React__default.createElement(React__default.Fragment, null, React__default.createElement(LeftTail, {
          source: img$8
        }), React__default.createElement(LeftCenter, {
          source: img$9,
          resizeMode: "stretch"
        }), React__default.createElement(LeftEnd, {
          source: img$a
        })) : React__default.createElement(React__default.Fragment, null, React__default.createElement(RightEnd, {
          source: img$d
        }), React__default.createElement(RightCenter, {
          source: img$c,
          resizeMode: "stretch"
        }), React__default.createElement(RightTail, {
          source: img$b
        }))));
      }
    }]);

    return ReactionList;
  }(React__default.PureComponent), _defineProperty(_class$c, "themePath", 'message.reactionList'), _defineProperty(_class$c, "propTypes", {
    latestReactions: PropTypes.array,
    openReactionSelector: PropTypes.func,
    getTotalReactionCount: PropTypes.func,
    visible: PropTypes.bool,
    position: PropTypes.string
  }), _temp$c));

var _class$d, _temp$d;

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject5$3() {
  var data = _taggedTemplateLiteral(["\n  color: white;\n  font-size: 10;\n  font-weight: bold;\n  ", "\n"]);

  _templateObject5$3 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$7() {
  var data = _taggedTemplateLiteral(["\n  font-size: 20;\n  margin-bottom: 5;\n  margin-top: 5;\n  ", "\n"]);

  _templateObject4$7 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$a() {
  var data = _taggedTemplateLiteral(["\n  flex-direction: column;\n  align-items: center;\n  margin-top: -5;\n  ", "\n"]);

  _templateObject3$a = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$e() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  background-color: black;\n  padding-left: 20px;\n  height: 60;\n  padding-right: 20px;\n  border-radius: 30;\n  ", "\n"]);

  _templateObject2$e = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$i() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  align-items: ", ";\n  ", "\n"]);

  _templateObject$i = function _templateObject() {
    return data;
  };

  return data;
}
var Container$c = styled__default.TouchableOpacity(_templateObject$i(), function (_ref) {
  var leftAlign = _ref.leftAlign;
  return leftAlign ? 'flex-start' : 'flex-end';
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.message.reactionPicker.container.css;
});
var ContainerView = styled__default.View(_templateObject2$e(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.message.reactionPicker.containerView.css;
});
var Column = styled__default.View(_templateObject3$a(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.message.reactionPicker.column.css;
});
var Emoji = styled__default.Text(_templateObject4$7(), function (_ref5) {
  var theme = _ref5.theme;
  return theme.message.reactionPicker.emoji.css;
});
var ReactionCount$1 = styled__default.Text(_templateObject5$3(), function (_ref6) {
  var theme = _ref6.theme;
  return theme.message.reactionPicker.text.css;
});
var ReactionPicker = themed((_temp$d = _class$d =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(ReactionPicker, _React$PureComponent);

    function ReactionPicker(props) {
      var _this;

      _classCallCheck(this, ReactionPicker);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactionPicker).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "getUsersPerReaction", function (reactions, type) {
        var filtered = reactions && reactions.filter(function (item) {
          return item.type === type;
        });
        return filtered;
      });

      _defineProperty(_assertThisInitialized(_this), "getLatestUser", function (reactions, type) {
        var filtered = _this.getUsersPerReaction(reactions, type);

        if (filtered && filtered[0] && filtered[0].user) {
          return filtered[0].user;
        } else {
          return 'NotFound';
        }
      });

      return _this;
    }

    _createClass(ReactionPicker, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
          hideReactionOwners = _this$props.hideReactionOwners,
          reactionPickerVisible = _this$props.reactionPickerVisible,
          handleDismiss = _this$props.handleDismiss,
          handleReaction = _this$props.handleReaction,
          latestReactions = _this$props.latestReactions,
          reactionCounts = _this$props.reactionCounts,
          rpLeft = _this$props.rpLeft,
          rpTop = _this$props.rpTop,
          rpRight = _this$props.rpRight,
          emojiData = _this$props.emojiData;
        if (!reactionPickerVisible) return null;
        var position = {
          marginTop: rpTop
        };
        if (rpLeft) position.marginLeft = rpLeft;
        if (rpRight) position.marginRight = rpRight;
        return React__default.createElement(reactNative.Modal, {
          visible: reactionPickerVisible,
          transparent: true,
          animationType: "fade",
          onShow: function onShow() { },
          onRequestClose: handleDismiss
        }, reactionPickerVisible && React__default.createElement(Container$c, {
          onPress: handleDismiss,
          leftAlign: Boolean(rpLeft),
          activeOpacity: 1
        }, React__default.createElement(ContainerView, {
          style: _objectSpread$3({}, position)
        }, emojiData.map(function (_ref7) {
          var id = _ref7.id,
            icon = _ref7.icon;

          var latestUser = _this2.getLatestUser(latestReactions, id);

          var count = reactionCounts && reactionCounts[id];
          return React__default.createElement(Column, {
            key: id
          }, latestUser !== 'NotFound' && !hideReactionOwners ? React__default.createElement(Avatar, {
            image: latestUser.image,
            alt: latestUser.id,
            size: 18,
            style: {
              image: {
                borderColor: 'white',
                borderWidth: 1
              }
            },
            name: latestUser.name || latestUser.id
          }) : !hideReactionOwners && React__default.createElement(reactNative.View, {
            style: {
              height: 18,
              width: 18
            }
          }), React__default.createElement(Emoji, {
            onPress: function onPress() {
              handleReaction(id);
            }
          }, icon), React__default.createElement(ReactionCount$1, null, count > 0 ? count : ''));
        }))));
      }
    }]);

    return ReactionPicker;
  }(React__default.PureComponent), _defineProperty(_class$d, "themePath", 'message.reactionPicker'), _defineProperty(_class$d, "propTypes", {
    hideReactionOwners: PropTypes.bool,
    reactionPickerVisible: PropTypes.bool,
    handleDismiss: PropTypes.func,
    handleReaction: PropTypes.func,
    latestReactions: PropTypes.array,
    reactionCounts: PropTypes.object,
    rpLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rpTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rpRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    emojiData: PropTypes.array
  }), _temp$d));

function _templateObject$j() {
  var data = _taggedTemplateLiteral(["\n  border-bottom-left-radius: ", ";\n  border-bottom-right-radius: ", ";\n  border-top-left-radius: ", ";\n  border-top-right-radius: ", ";\n  margin-top: 2;\n  padding: 5px;\n  padding-left: 8;\n  padding-right: 8;\n  align-self: ", ";\n  border-width: ", ";\n  border-color: ", ";\n  background-color: ", ";\n  ", "\n"]);

  _templateObject$j = function _templateObject() {
    return data;
  };

  return data;
}
var TextContainer = styled__default.View(_templateObject$j(), function (_ref) {
  var theme = _ref.theme,
    groupStyle = _ref.groupStyle;
  return groupStyle.indexOf('left') !== -1 ? theme.message.content.textContainer.borderRadiusS : theme.message.content.textContainer.borderRadiusL;
}, function (_ref2) {
  var theme = _ref2.theme,
    groupStyle = _ref2.groupStyle;
  return groupStyle.indexOf('right') !== -1 ? theme.message.content.textContainer.borderRadiusS : theme.message.content.textContainer.borderRadiusL;
}, function (_ref3) {
  var theme = _ref3.theme,
    groupStyle = _ref3.groupStyle;
  return groupStyle === 'leftBottom' || groupStyle === 'leftMiddle' ? theme.message.content.textContainer.borderRadiusS : theme.message.content.textContainer.borderRadiusL;
}, function (_ref4) {
  var theme = _ref4.theme,
    groupStyle = _ref4.groupStyle;
  return groupStyle === 'rightBottom' || groupStyle === 'rightMiddle' ? theme.message.content.textContainer.borderRadiusS : theme.message.content.textContainer.borderRadiusL;
}, function (_ref5) {
  var alignment = _ref5.alignment;
  return alignment === 'left' ? 'flex-start' : 'flex-end';
}, function (_ref6) {
  var theme = _ref6.theme,
    alignment = _ref6.alignment;
  return alignment === 'left' ? theme.message.content.textContainer.leftBorderWidth : theme.message.content.textContainer.rightBorderWidth;
}, function (_ref7) {
  var theme = _ref7.theme,
    alignment = _ref7.alignment;
  return alignment === 'left' ? theme.message.content.textContainer.leftBorderColor : theme.message.content.textContainer.rightBorderColor;
}, function (_ref8) {
  var theme = _ref8.theme,
    alignment = _ref8.alignment,
    type = _ref8.type,
    status = _ref8.status;
  return alignment === 'left' || type === 'error' || status === 'failed' ? theme.colors.transparent : theme.colors.light;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.message.content.textContainer.css;
});
var MessageTextContainer = withTheme(function (props) {
  var message = props.message,
    _props$groupStyles = props.groupStyles,
    groupStyles = _props$groupStyles === void 0 ? ['bottom'] : _props$groupStyles,
    _props$isMyMessage = props.isMyMessage,
    isMyMessage = _props$isMyMessage === void 0 ? function () {
      return false;
    } : _props$isMyMessage,
    _props$MessageText = props.MessageText,
    MessageText = _props$MessageText === void 0 ? false : _props$MessageText;
  var pos = isMyMessage(message) ? 'right' : 'left';
  var hasAttachment = message.attachments.length > 0 ? true : false;
  var groupStyle = (isMyMessage(message) ? 'right' : 'left') + capitalize(hasAttachment ? 'bottom' : groupStyles[0]);
  if (!message.text) return false;
  var markdownStyles = props.theme ? props.theme.message.content.markdown : {};
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(TextContainer, {
    alignment: pos,
    groupStyle: groupStyle,
    status: message.status,
    type: message.type
  }, !MessageText ? renderText(message, markdownStyles) : React__default.createElement(MessageText, _extends({}, props, {
    renderText: renderText
  }))));
});
MessageTextContainer.propTypes = {
  /** Current [message object](https://getstream.io/chat/docs/#message_format) */
  message: PropTypes.object,

  /**
   * Position of message in group - top, bottom, middle, single.
   *
   * Message group is a group of consecutive messages from same user. groupStyles can be used to style message as per their position in message group
   * e.g., user avatar (to which message belongs to) is only showed for last (bottom) message in group.
   */
  groupStyles: PropTypes.array,

  /**
   * Returns true if message (param) belongs to current user, else false
   *
   * @param message
   * */
  isMyMessage: PropTypes.func,

  /** Custom UI component for message text */
  MessageText: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

  /** Complete theme object. Its a [defaultTheme](https://github.com/GetStream/stream-chat-react-native/blob/master/src/styles/theme.js#L22) merged with customized theme provided as prop to Chat component */
  theme: PropTypes.object
};

const img$e = require('.//images/icons/icon_path.png');

function _templateObject3$b() {
  var data = _taggedTemplateLiteral(["\n  transform: ", ";\n  ", "\n"]);

  _templateObject3$b = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$f() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  font-weight: 700;\n  font-size: 12;\n  ", "\n"]);

  _templateObject2$f = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$k() {
  var data = _taggedTemplateLiteral(["\n  padding: 5px;\n  flex-direction: row;\n  align-items: center;\n  ", "\n"]);

  _templateObject$k = function _templateObject() {
    return data;
  };

  return data;
}
var Container$d = styled__default.TouchableOpacity(_templateObject$k(), function (_ref) {
  var theme = _ref.theme;
  return theme.message.replies.container.css;
});
var MessageRepliesText = styled__default.Text(_templateObject2$f(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.primary;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.message.replies.messageRepliesText.css;
});
var MessageRepliesImage = styled__default.Image(_templateObject3$b(), function (_ref4) {
  var pos = _ref4.pos;
  return pos === 'left' ? 'rotateY(0deg)' : 'rotateY(180deg)';
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.message.replies.image.css;
});
var MessageReplies = function MessageReplies(_ref6) {
  var message = _ref6.message,
    isThreadList = _ref6.isThreadList,
    openThread = _ref6.openThread,
    pos = _ref6.pos;
  if (isThreadList || !message.reply_count) return null;
  return React__default.createElement(Container$d, {
    onPress: openThread
  }, pos === 'left' ? React__default.createElement(MessageRepliesImage, {
    source: img$e,
    pos: pos
  }) : null, React__default.createElement(MessageRepliesText, null, message.reply_count, " ", message.reply_count === 1 ? 'reply' : 'replies'), pos === 'right' ? React__default.createElement(MessageRepliesImage, {
    source: img$e,
    pos: pos
  }) : null);
};
MessageReplies.propTypes = {
  /** Current [message object](https://getstream.io/chat/docs/#message_format) */
  message: PropTypes.object,

  /** Boolean if current message is part of thread */
  isThreadList: PropTypes.bool,

  /** @see See [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
  openThread: PropTypes.func,

  /** right | left */
  pos: PropTypes.string
};

var _class$e, _temp$e;

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  font-size: 18;\n  color: red;\n  ", ";\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  height: 50;\n  width: 100%;\n  align-items: center;\n  justify-content: center;\n  ", ";\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11$1() {
  var data = _taggedTemplateLiteral(["\n  font-size: 18;\n  color: #388cea;\n  ", ";\n"]);

  _templateObject11$1 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10$1() {
  var data = _taggedTemplateLiteral(["\n  height: 50;\n  width: 100%;\n  align-items: center;\n  background-color: #fff;\n  justify-content: center;\n  ", ";\n"]);

  _templateObject10$1 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9$1() {
  var data = _taggedTemplateLiteral(["\n  color: #757575;\n  font-size: 14;\n  ", ";\n"]);

  _templateObject9$1 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$1() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  align-items: center;\n  justify-content: center;\n  ", ";\n"]);

  _templateObject8$1 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$1() {
  var data = _taggedTemplateLiteral(["\n  color: #a4a4a4;\n  margin-right: 5px;\n"]);

  _templateObject7$1 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$1() {
  var data = _taggedTemplateLiteral(["\n  font-size: 15;\n  line-height: 20;\n  color: #a4a4a4;\n  ", ";\n"]);

  _templateObject6$1 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  max-width: 250;\n  padding: 5px;\n  align-items: ", ";\n  justify-content: ", ";\n  ", ";\n"]);

  _templateObject5$4 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$8() {
  var data = _taggedTemplateLiteral(["\n  font-size: 11;\n  color: ", ";\n  text-align: ", ";\n  ", ";\n"]);

  _templateObject4$8 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$c() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 2;\n  ", ";\n"]);

  _templateObject3$c = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$g() {
  var data = _taggedTemplateLiteral(["\n  align-items: ", ";\n  ", "\n"]);

  _templateObject2$g = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$l() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  max-width: 250;\n  padding: ", "px;\n  align-items: ", ";\n  justify-content: ", ";\n  background-color: ", ";\n  border-bottom-left-radius: ", ";\n  border-bottom-right-radius: ", ";\n  border-top-left-radius: ", ";\n  border-top-right-radius: ", ";\n  ", ";\n"]);

  _templateObject$l = function _templateObject() {
    return data;
  };

  return data;
}
// Otherwise background is transperant, so border radius is not really visible.

var Container$e = styled__default.TouchableOpacity(_templateObject$l(), function (_ref) {
  var error = _ref.error;
  return error ? 5 : 0;
}, function (_ref2) {
  var alignment = _ref2.alignment;
  return alignment === 'left' ? 'flex-start' : 'flex-end';
}, function (_ref3) {
  var alignment = _ref3.alignment;
  return alignment === 'left' ? 'flex-start' : 'flex-end';
}, function (_ref4) {
  var error = _ref4.error,
    theme = _ref4.theme;
  return error ? theme.message.content.errorContainer.backgroundColor : theme.colors.transparent;
}, function (_ref5) {
  var alignment = _ref5.alignment,
    theme = _ref5.theme;
  return alignment === 'left' ? theme.message.content.container.borderRadiusS : theme.message.content.container.borderRadiusL;
}, function (_ref6) {
  var alignment = _ref6.alignment,
    theme = _ref6.theme;
  return alignment === 'left' ? theme.message.content.container.borderRadiusL : theme.message.content.container.borderRadiusS;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.message.content.container.borderRadiusL;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.message.content.container.borderRadiusL;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.message.content.container.css;
});
var ContainerInner = styled__default.View(_templateObject2$g(), function (_ref10) {
  var alignment = _ref10.alignment;
  return alignment === 'left' ? 'flex-start' : 'flex-end';
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.message.content.containerInner.css;
});
var MetaContainer = styled__default.View(_templateObject3$c(), function (_ref12) {
  var theme = _ref12.theme;
  return theme.message.content.metaContainer.css;
});
var MetaText = styled__default.Text(_templateObject4$8(), function (_ref13) {
  var theme = _ref13.theme;
  return theme.colors.textGrey;
}, function (_ref14) {
  var alignment = _ref14.alignment;
  return alignment === 'left' ? 'left' : 'right';
}, function (_ref15) {
  var theme = _ref15.theme;
  return theme.message.content.metaText.css;
});
var DeletedContainer = styled__default.View(_templateObject5$4(), function (_ref16) {
  var alignment = _ref16.alignment;
  return alignment === 'left' ? 'flex-start' : 'flex-end';
}, function (_ref17) {
  var alignment = _ref17.alignment;
  return alignment === 'left' ? 'flex-start' : 'flex-end';
}, function (_ref18) {
  var theme = _ref18.theme;
  return theme.message.content.deletedContainer.css;
});
var DeletedText = styled__default.Text(_templateObject6$1(), function (_ref19) {
  var theme = _ref19.theme;
  return theme.message.content.deletedText.css;
});
var FailedText = styled__default.Text(_templateObject7$1());
var ActionSheetTitleContainer = styled__default.View(_templateObject8$1(), function (_ref20) {
  var theme = _ref20.theme;
  return theme.message.actionSheet.titleContainer.css;
});
var ActionSheetTitleText = styled__default.Text(_templateObject9$1(), function (_ref21) {
  var theme = _ref21.theme;
  return theme.message.actionSheet.titleText.css;
});
var ActionSheetButtonContainer = styled__default.View(_templateObject10$1(), function (_ref22) {
  var theme = _ref22.theme;
  return theme.message.actionSheet.buttonContainer.css;
});
var ActionSheetButtonText = styled__default.Text(_templateObject11$1(), function (_ref23) {
  var theme = _ref23.theme;
  return theme.message.actionSheet.buttonText.css;
});
var ActionSheetCancelButtonContainer = styled__default.View(_templateObject12(), function (_ref24) {
  var theme = _ref24.theme;
  return theme.message.actionSheet.cancelButtonContainer.css;
});
var ActionSheetCancelButtonText = styled__default.Text(_templateObject13(), function (_ref25) {
  var theme = _ref25.theme;
  return theme.message.actionSheet.cancelButtonText.css;
});
var MessageContent = themed((_temp$e = _class$e =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(MessageContent, _React$PureComponent);

    function MessageContent(props) {
      var _this;

      _classCallCheck(this, MessageContent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageContent).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "openThread", function () {
        if (_this.props.onThreadSelect) _this.props.onThreadSelect(_this.props.message);
      });

      _defineProperty(_assertThisInitialized(_this), "showActionSheet", function () {
        _this.ActionSheet.show();
      });

      _defineProperty(_assertThisInitialized(_this), "handleDelete",
        /*#__PURE__*/
        _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee() {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _this.props.handleDelete();

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })));

      _defineProperty(_assertThisInitialized(_this), "handleEdit", function () {
        _this.props.handleEdit();
      });

      _defineProperty(_assertThisInitialized(_this), "_setReactionPickerPosition", function () {
        var _this$props = _this.props,
          isMyMessage = _this$props.isMyMessage,
          message = _this$props.message;
        var pos = isMyMessage(message) ? 'right' : 'left';

        _this.messageContainer.measureInWindow(function (x, y, width) {
          _this.setState({
            reactionPickerVisible: true,
            rpTop: y - 60,
            rpLeft: pos === 'left' ? x - 10 : null,
            rpRight: pos === 'right' ? Math.round(reactNative.Dimensions.get('window').width) - (x + width + 10) : null
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "openReactionSelector",
        /*#__PURE__*/
        _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee2() {
            var readOnly;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    readOnly = _this.props.readOnly;

                    if (!readOnly) {
                      _context2.next = 3;
                      break;
                    }

                    return _context2.abrupt("return");

                  case 3:
                    _context2.next = 5;
                    return _this.props.dismissKeyboard();

                  case 5:
                    _this._setReactionPickerPosition();

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          })));

      _defineProperty(_assertThisInitialized(_this), "onActionPress", function (action) {
        switch (action) {
          case MESSAGE_ACTIONS.edit:
            _this.handleEdit();

            break;

          case MESSAGE_ACTIONS["delete"]:
            _this.handleDelete();

            break;

          case MESSAGE_ACTIONS.reply:
            _this.openThread();

            break;

          case MESSAGE_ACTIONS.reactions:
            _this.openReactionSelector();

            break;

          default:
            break;
        }
      });

      _this.ActionSheet = false;
      _this.state = {
        reactionPickerVisible: false
      };
      return _this;
    }

    _createClass(MessageContent, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props2 = this.props,
          message = _this$props2.message,
          isMyMessage = _this$props2.isMyMessage,
          readOnly = _this$props2.readOnly,
          Message = _this$props2.Message,
          handleReaction = _this$props2.handleReaction,
          threadList = _this$props2.threadList,
          retrySendMessage = _this$props2.retrySendMessage,
          messageActions = _this$props2.messageActions,
          groupStyles = _this$props2.groupStyles,
          reactionsEnabled = _this$props2.reactionsEnabled,
          getTotalReactionCount = _this$props2.getTotalReactionCount,
          repliesEnabled = _this$props2.repliesEnabled,
          canEditMessage = _this$props2.canEditMessage,
          canDeleteMessage = _this$props2.canDeleteMessage,
          MessageFooter = _this$props2.MessageFooter;
        var Attachment$$1 = this.props.Attachment;
        var hasAttachment = Boolean(message && message.attachments && message.attachments.length);
        var pos = isMyMessage(message) ? 'right' : 'left';
        var showTime = groupStyles[0] === 'single' || groupStyles[0] === 'bottom' ? true : false;
        var hasReactions = reactionsEnabled && message.latest_reactions && message.latest_reactions.length > 0;
        var options = [{
          id: 'cancel',
          title: 'Cancel'
        }];
        var images = hasAttachment && message.attachments.filter(function (item) {
          return item.type === 'image' && !item.title_link && !item.og_scrape_url;
        });
        var files = hasAttachment && message.attachments.filter(function (item) {
          return item.type === 'file';
        });

        if (messageActions && reactionsEnabled && messageActions.indexOf(MESSAGE_ACTIONS.reactions) > -1) {
          options.splice(1, 0, {
            id: MESSAGE_ACTIONS.reactions,
            title: 'Add Reaction'
          });
        }

        if (messageActions && repliesEnabled && messageActions.indexOf(MESSAGE_ACTIONS.reply) > -1 && !threadList) {
          options.splice(1, 0, {
            id: MESSAGE_ACTIONS.reply,
            title: 'Reply'
          });
        }

        if (messageActions && messageActions.indexOf(MESSAGE_ACTIONS.edit) > -1 && canEditMessage()) options.splice(1, 0, {
          id: MESSAGE_ACTIONS.edit,
          title: 'Edit Message'
        });
        if (messageActions && messageActions.indexOf(MESSAGE_ACTIONS["delete"]) > -1 && canDeleteMessage()) options.splice(1, 0, {
          id: MESSAGE_ACTIONS["delete"],
          title: 'Delete Message'
        });
        if (message.deleted_at) return React__default.createElement(DeletedContainer, {
          alignment: pos
        }, React__default.createElement(DeletedText, null, "This message was deleted ..."));
        var onLongPress = this.props.onLongPress;
        var contentProps = {
          alignment: pos,
          status: message.status,
          onPress: this.props.onPress ? this.props.onPress.bind(this, this, message) : this.props.onMessageTouch,
          onLongPress: onLongPress ? onLongPress.bind(this, this, message) : options.length > 1 ? this.showActionSheet : null,
          activeOpacity: 0.7,
          disabled: readOnly,
          hasReactions: hasReactions
        };
        if (message.status === 'failed') contentProps.onPress = retrySendMessage.bind(this, Immutable(message));
        var context = {
          onLongPress: contentProps.onLongPress
        };
        return React__default.createElement(MessageContentContext.Provider, {
          value: context
        }, React__default.createElement(Container$e, _extends({}, contentProps, {
          error: message.type === 'error' || message.status === 'failed'
        }), message.type === 'error' ? React__default.createElement(FailedText, null, "ERROR \xB7 UNSENT") : null, message.status === 'failed' ? React__default.createElement(FailedText, null, "Message failed - try again") : null, reactionsEnabled && message.latest_reactions && message.latest_reactions.length > 0 && React__default.createElement(ReactionList, {
          position: pos,
          visible: !this.state.reactionPickerVisible,
          latestReactions: message.latest_reactions,
          getTotalReactionCount: getTotalReactionCount,
          openReactionSelector: this.openReactionSelector,
          reactionCounts: message.reaction_counts
        }), React__default.createElement(ContainerInner, {
          alignment: pos,
          ref: function ref(o) {
            return _this2.messageContainer = o;
          },
          collapsable: false
        }, hasAttachment && message.attachments.map(function (attachment, index) {
          // We handle files separately
          if (attachment.type === 'file') return null;
          if (attachment.type === 'image' && !attachment.title_link && !attachment.og_scrape_url) return null;
          return React__default.createElement(Attachment$$1, {
            key: "".concat(message.id, "-").concat(index),
            attachment: attachment,
            actionHandler: _this2.props.handleAction,
            alignment: _this2.props.alignment
          });
        }), files && files.length > 0 && React__default.createElement(FileAttachmentGroup, {
          messageId: message.id,
          files: files,
          handleAction: this.props.handleAction,
          alignment: this.props.alignment,
          AttachmentFileIcon: this.props.AttachmentFileIcon
        }), images && images.length > 0 && React__default.createElement(Gallery, {
          alignment: this.props.alignment,
          images: images
        }), React__default.createElement(MessageTextContainer, {
          message: message,
          groupStyles: hasReactions ? ['top'] : groupStyles,
          isMyMessage: isMyMessage,
          MessageText: this.props.MessageText,
          disabled: message.status === 'failed' || message.type === 'error',
          Message: Message,
          openThread: this.openThread,
          handleReaction: handleReaction
        })), repliesEnabled ? React__default.createElement(MessageReplies, {
          message: message,
          isThreadList: !!threadList,
          openThread: this.openThread,
          pos: pos
        }) : null, MessageFooter && React__default.createElement(MessageFooter, this.props), !MessageFooter && showTime ? React__default.createElement(MetaContainer, null, React__default.createElement(MetaText, {
          alignment: pos
        }, this.props.formatDate ? this.props.formatDate(message.created_at) : Moment(message.created_at).format('h:mmA'))) : null, reactionsEnabled ? React__default.createElement(ReactionPicker, {
          reactionPickerVisible: this.state.reactionPickerVisible,
          handleReaction: handleReaction,
          latestReactions: message.latest_reactions,
          reactionCounts: message.reaction_counts,
          handleDismiss: function handleDismiss() {
            _this2.setState({
              reactionPickerVisible: false
            });
          },
          rpLeft: this.state.rpLeft,
          rpRight: this.state.rpRight,
          rpTop: this.state.rpTop,
          emojiData: this.props.emojiData
        }) : null, React__default.createElement(reactNativeActionsheet.ActionSheetCustom, {
          ref: function ref(o) {
            _this2.ActionSheet = o;
          },
          title: React__default.createElement(ActionSheetTitleContainer, null, React__default.createElement(ActionSheetTitleText, null, "Choose an action")),
          options: _toConsumableArray(options.map(function (o, i) {
            if (i === 0) {
              return React__default.createElement(ActionSheetCancelButtonContainer, null, React__default.createElement(ActionSheetCancelButtonText, null, "Cancel"));
            }

            return React__default.createElement(ActionSheetButtonContainer, {
              key: o.title
            }, React__default.createElement(ActionSheetButtonText, null, o.title));
          })),
          cancelButtonIndex: 0,
          destructiveButtonIndex: 0,
          onPress: function onPress(index) {
            return _this2.onActionPress(options[index].id);
          },
          styles: this.props.actionSheetStyles
        })));
      }
    }]);

    return MessageContent;
  }(React__default.PureComponent), _defineProperty(_class$e, "themePath", 'message.content'), _defineProperty(_class$e, "propTypes", {
    /** @see See [channel context](#channelcontext) */
    Attachment: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** enabled reactions, this is usually set by the parent component based on channel configs */
    reactionsEnabled: PropTypes.bool.isRequired,

    /** enabled replies, this is usually set by the parent component based on channel configs */
    repliesEnabled: PropTypes.bool.isRequired,

    /**
     * Handler to open the thread on message. This is callback for touch event for replies button.
     *
     * @param message A message object to open the thread upon.
     * */
    onThreadSelect: PropTypes.func,

    /**
     * Callback for onPress event on Message component
     *
     * @param e       Event object for onPress event
     * @param message Message object which was pressed
     *
     * @deprecated Use onPress instead
     * */
    onMessageTouch: PropTypes.func,

    /**
     * Function that overrides default behaviour when message is pressed/touched
     * e.g. if you would like to open reaction picker on message press:
     *
     * ```
     * import { MessageSimple } from 'stream-chat-react-native' // or 'stream-chat-expo'
     * ...
     * const MessageUIComponent = (props) => {
     *  return (
     *    <MessageSimple
     *      {...props}
     *      onPress={(thisArg, message, e) => {
     *        thisArg.openReactionSelector();
     *      }}
     *  )
     * }
     * ```
     *
     * Similarly, you can also call other methods available on MessageContent
     * component such as handleEdit, handleDelete, showActionSheet etc.
     *
     * Source - [MessageContent](https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/MessageSimple/MessageContent.js)
     *
     * @param {Component} thisArg Reference to MessageContent component
     * @param message Message object which was pressed
     * @param e       Event object for onPress event
     * */
    onPress: PropTypes.func,

    /**
     * Function that overrides default behaviour when message is long pressed
     * e.g. if you would like to open reaction picker on message long press:
     *
     * ```
     * import { MessageSimple } from 'stream-chat-react-native' // or 'stream-chat-expo'
     * ...
     * const MessageUIComponent = (props) => {
     *  return (
     *    <MessageSimple
     *      {...props}
     *      onLongPress={(thisArg, message, e) => {
     *        thisArg.openReactionSelector();
     *      }}
     *  )
     * }
     *
     * Similarly, you can also call other methods available on MessageContent
     * component such as handleEdit, handleDelete, showActionSheet etc.
     *
     * Source - [MessageContent](https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/MessageSimple/MessageContent.js)
     *
     * By default we show action sheet with all the message actions on long press.
     * ```
     *
     * @param {Component} thisArg Reference to MessageContent component
     * @param message Message object which was long pressed
     * @param e       Event object for onLongPress event
     * */
    onLongPress: PropTypes.func,

    /**
     * Handler to delete a current message.
     */
    handleDelete: PropTypes.func,

    /**
     * Handler to edit a current message. This message simply sets current message as value of `editing` property of channel context.
     * `editing` prop is then used by MessageInput component to switch to edit mode.
     */
    handleEdit: PropTypes.func,

    /** @see See [keyboard context](https://getstream.io/chat/docs/#keyboardcontext) */
    dismissKeyboard: PropTypes.func,

    /** Handler for actions. Actions in combination with attachments can be used to build [commands](https://getstream.io/chat/docs/#channel_commands). */
    handleAction: PropTypes.func,

    /** Position of message. 'right' | 'left' */
    alignment: PropTypes.string,

    /**
     * Position of message in group - top, bottom, middle, single.
     *
     * Message group is a group of consecutive messages from same user. groupStyles can be used to style message as per their position in message group
     * e.g., user avatar (to which message belongs to) is only showed for last (bottom) message in group.
     */
    groupStyles: PropTypes.array,

    /**
     * Style object for actionsheet (used to message actions).
     * Supported styles: https://github.com/beefe/react-native-actionsheet/blob/master/lib/styles.js
     */
    actionSheetStyles: PropTypes.object,

    /**
     * Custom UI component for attachment icon for type 'file' attachment.
     * Defaults to: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/FileIcon.js
     */
    AttachmentFileIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
    formatDate: PropTypes.func
  }), _defineProperty(_class$e, "defaultProps", {
    Attachment: Attachment,
    reactionsEnabled: true,
    repliesEnabled: true,
    MessageText: false
  }), _temp$e));

const img$f = require('.//images/loading.gif');

const img$g = require('.//images/icons/delivered_unseen.png');

function _templateObject8$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  ", ";\n"]);

  _templateObject8$2 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$2() {
  var data = _taggedTemplateLiteral(["\n  height: 10;\n  width: 10;\n  ", ";\n"]);

  _templateObject7$2 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  ", ";\n"]);

  _templateObject6$2 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$5() {
  var data = _taggedTemplateLiteral(["\n  width: 8;\n  height: 6;\n  ", ";\n"]);

  _templateObject5$5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$9() {
  var data = _taggedTemplateLiteral(["\n  width: 16;\n  height: 16;\n  border-radius: 16;\n  background-color: ", ";\n  align-items: center;\n  justify-content: center;\n  padding: 6px;\n  ", ";\n"]);

  _templateObject4$9 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$d() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  height: 20;\n  ", ";\n"]);

  _templateObject3$d = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$h() {
  var data = _taggedTemplateLiteral(["\n  width: 20;\n  flex-direction: row;\n  justify-content: center;\n"]);

  _templateObject2$h = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$m() {
  var data = _taggedTemplateLiteral(["\n  height: 10;\n"]);

  _templateObject$m = function _templateObject() {
    return data;
  };

  return data;
}
var Spacer$1 = styled__default.View(_templateObject$m());
var StatusContainer = styled__default.View(_templateObject2$h());
var DeliveredContainer = styled__default.View(_templateObject3$d(), function (_ref) {
  var theme = _ref.theme;
  return theme.message.status.deliveredContainer.css;
});
var DeliveredCircle = styled__default.View(_templateObject4$9(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.primary;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.message.status.deliveredCircle.css;
});
var CheckMark = styled__default.Image(_templateObject5$5(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.message.status.checkMark.css;
});
var SendingContainer = styled__default.View(_templateObject6$2(), function (_ref5) {
  var theme = _ref5.theme;
  return theme.message.status.sendingContainer.css;
});
var SendingImage = styled__default.View(_templateObject7$2(), function (_ref6) {
  var theme = _ref6.theme;
  return theme.message.status.sendingImage.css;
});
var ReadByContainer = styled__default.View(_templateObject8$2(), function (_ref7) {
  var theme = _ref7.theme;
  return theme.message.status.readByContainer.css;
});
var MessageStatus = function MessageStatus(_ref8) {
  var client = _ref8.client,
    readBy = _ref8.readBy,
    message = _ref8.message,
    lastReceivedId = _ref8.lastReceivedId,
    threadList = _ref8.threadList;

  var renderStatus = function renderStatus() {
    var justReadByMe = readBy.length === 1 && readBy[0].id === client.user.id;

    if (message.status === 'sending') {
      return React__default.createElement(SendingContainer, null, React__default.createElement(SendingImage, {
        source: img$f
      }));
    } else if (readBy.length !== 0 && !threadList && message.id === lastReceivedId && !justReadByMe) {
      var lastReadUser = readBy.filter(function (item) {
        return item.id !== client.user.id;
      })[0];
      return React__default.createElement(ReadByContainer, null, React__default.createElement(Avatar, {
        name: lastReadUser.name || lastReadUser.id,
        image: lastReadUser.image,
        size: 16
      }));
    } else if (message.status === 'received' && message.type !== 'ephemeral' && message.id === lastReceivedId && !threadList) {
      return React__default.createElement(DeliveredContainer, null, React__default.createElement(DeliveredCircle, null, React__default.createElement(CheckMark, {
        source: img$g
      })));
    } else {
      return React__default.createElement(Spacer$1, null);
    }
  };

  return React__default.createElement(StatusContainer, null, renderStatus());
};
MessageStatus.propTypes = {
  /** @see See [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
  client: PropTypes.object,

  /** A list of users who have read the message */
  readBy: PropTypes.array,

  /** Current [message object](https://getstream.io/chat/docs/#message_format) */
  message: PropTypes.object,

  /** Latest message id on current channel */
  lastReceivedId: PropTypes.string,

  /** Boolean if current message is part of thread */
  isThreadList: PropTypes.bool
};

function _templateObject5$6() {
  var data = _taggedTemplateLiteral(["\n  text-align: center;\n  font-size: 10;\n  font-weight: bold;\n  color: rgba(0, 0, 0, 0.5);\n  ", "\n"]);

  _templateObject5$6 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$a() {
  var data = _taggedTemplateLiteral(["\n  text-align: center;\n  font-size: 10;\n  font-weight: bold;\n  color: rgba(0, 0, 0, 0.5);\n  ", "\n"]);

  _templateObject4$a = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$e() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 10;\n  flex: 3;\n  ", "\n"]);

  _templateObject3$e = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$i() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  height: 0.5;\n  background-color: ", ";\n  ", "\n"]);

  _templateObject2$i = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$n() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 10;\n  ", "\n"]);

  _templateObject$n = function _templateObject() {
    return data;
  };

  return data;
}
var Container$f = styled__default.View(_templateObject$n(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageList.messageSystem.container.css;
});
var Line$1 = styled__default.View(_templateObject2$i(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.colors.light;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.messageList.messageSystem.line.css;
});
var TextContainer$1 = styled__default.View(_templateObject3$e(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.messageList.messageSystem.textContainer.css;
});
var Text = styled__default.Text(_templateObject4$a(), function (_ref5) {
  var theme = _ref5.theme;
  return theme.messageList.messageSystem.text.css;
});
var DateText$1 = styled__default.Text(_templateObject5$6(), function (_ref6) {
  var theme = _ref6.theme;
  return theme.messageList.messageSystem.dateText.css;
});
/**
 * A component to display system message. e.g, when someone updates the channel,
 * they can attach a message with that update. That message will be available
 * in message list as (type) system message.
 */

var MessageSystem = function MessageSystem(_ref7) {
  var message = _ref7.message;
  return React__default.createElement(Container$f, null, React__default.createElement(Line$1, null), React__default.createElement(TextContainer$1, null, React__default.createElement(Text, null, message.text.toUpperCase()), React__default.createElement(DateText$1, null, Moment(message.created_at).format('dddd').toUpperCase(), ' ', "at", ' ', Moment(message.created_at).format('hh:mm A').toUpperCase())), React__default.createElement(Line$1, null));
};

var _class$f, _temp$f;

function _templateObject$o() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  align-items: flex-end;\n  justify-content: ", ";\n  margin-bottom: ", ";\n  ", "\n"]);

  _templateObject$o = function _templateObject() {
    return data;
  };

  return data;
}
var Container$g = styled__default.View(_templateObject$o(), function (_ref) {
  var alignment = _ref.alignment;
  return alignment === 'left' ? 'flex-start' : 'flex-end';
}, function (_ref2) {
  var hasMarginBottom = _ref2.hasMarginBottom,
    isVeryLastMessage = _ref2.isVeryLastMessage;
  return hasMarginBottom ? isVeryLastMessage ? 30 : 20 : 0;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.message.container.css;
});
/**
 *
 * Message UI component
 *
 * @example ../docs/MessageSimple.md
 * @extends Component
 */

var MessageSimple = themed((_temp$f = _class$f =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(MessageSimple, _React$PureComponent);

    function MessageSimple() {
      _classCallCheck(this, MessageSimple);

      return _possibleConstructorReturn(this, _getPrototypeOf(MessageSimple).apply(this, arguments));
    }

    _createClass(MessageSimple, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          message = _this$props.message,
          isMyMessage = _this$props.isMyMessage,
          groupStyles = _this$props.groupStyles,
          forceAlign = _this$props.forceAlign,
          showMessageStatus = _this$props.showMessageStatus,
          MessageAvatar$$1 = _this$props.MessageAvatar,
          MessageContent$$1 = _this$props.MessageContent,
          MessageStatus$$1 = _this$props.MessageStatus,
          MessageSystem$$1 = _this$props.MessageSystem;
        var pos;
        if (forceAlign && forceAlign === 'left' || forceAlign === 'right') pos = forceAlign; else pos = isMyMessage(message) ? 'right' : 'left';
        var lastMessage = this.props.channel.state.messages[this.props.channel.state.messages.length - 1];
        var isVeryLastMessage = lastMessage ? lastMessage.id === message.id : false;
        var hasMarginBottom = groupStyles[0] === 'single' || groupStyles[0] === 'bottom' ? true : false;

        if (message.type === 'system') {
          return React__default.createElement(MessageSystem$$1, {
            message: message
          });
        }

        return React__default.createElement(Container$g, {
          alignment: pos,
          hasMarginBottom: hasMarginBottom,
          isVeryLastMessage: isVeryLastMessage
        }, pos === 'right' ? React__default.createElement(React__default.Fragment, null, React__default.createElement(MessageContent$$1, _extends({}, this.props, {
          alignment: pos
        })), React__default.createElement(MessageAvatar$$1, this.props), showMessageStatus && React__default.createElement(MessageStatus$$1, this.props)) : React__default.createElement(React__default.Fragment, null, React__default.createElement(MessageAvatar$$1, this.props), React__default.createElement(MessageContent$$1, _extends({}, this.props, {
          alignment: pos
        }))));
      }
    }]);

    return MessageSimple;
  }(React__default.PureComponent), _defineProperty(_class$f, "propTypes", {
    /**
     * Custom UI component for the avatar next to a message
     * Defaults to: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/MessageSimple/MessageAvatar.js
     * */
    MessageAvatar: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Custom UI component for message content
     * Defaults to: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/MessageSimple/MessageContent.js
     * */
    MessageContent: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Custom UI component for message status (delivered/read)
     * Defaults to: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/MessageSimple/MessageStatus.js
     *
     * */
    MessageStatus: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Custom UI component for Messages of type "system"
     * Defaults to: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/MessageSystem.js
     * */
    MessageSystem: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** Custom UI component for message text */
    MessageText: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** enabled reactions, this is usually set by the parent component based on channel configs */
    reactionsEnabled: PropTypes.bool.isRequired,

    /** enabled replies, this is usually set by the parent component based on channel configs */
    repliesEnabled: PropTypes.bool.isRequired,

    /**
     * Handler to open the thread on message. This is callback for touch event for replies button.
     *
     * @param message A message object to open the thread upon.
     * */
    onThreadSelect: PropTypes.func,

    /**
     * Callback for onPress event on Message component
     *
     * @param e       Event object for onPress event
     * @param message Message object which was pressed
     *
     * @deprecated Use onPress instead
     * */
    onMessageTouch: PropTypes.func,

    /**
     * Function that overrides default behaviour when message is pressed/touched
     * e.g. if you would like to open reaction picker on message press:
     *
     * ```
     * import { MessageSimple } from 'stream-chat-react-native' // or 'stream-chat-expo'
     * ...
     * const MessageUIComponent = (props) => {
     *  return (
     *    <MessageSimple
     *      {...props}
     *      onPress={(thisArg, message, e) => {
     *        thisArg.openReactionSelector();
     *      }}
     *  )
     * }
     * ```
     *
     * Similarly, you can also call other methods available on MessageContent
     * component such as handleEdit, handleDelete, showActionSheet etc.
     *
     * Source - [MessageContent](https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/MessageSimple/MessageContent.js)
     *
     * @param {Component} thisArg Reference to MessageContent component
     * @param message Message object which was pressed
     * @param e       Event object for onPress event
     * */
    onPress: PropTypes.func,

    /**
     * Function that overrides default behaviour when message is long pressed
     * e.g. if you would like to open reaction picker on message long press:
     *
     * ```
     * import { MessageSimple } from 'stream-chat-react-native' // or 'stream-chat-expo'
     * ...
     * const MessageUIComponent = (props) => {
     *  return (
     *    <MessageSimple
     *      {...props}
     *      onLongPress={(thisArg, message, e) => {
     *        thisArg.openReactionSelector();
     *      }}
     *  )
     * }
     *
     * Similarly, you can also call other methods available on MessageContent
     * component such as handleEdit, handleDelete, showActionSheet etc.
     *
     * Source - [MessageContent](https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/MessageSimple/MessageContent.js)
     * ```
     *
     * By default we show action sheet with all the message actions on long press.
     *
     * @param {Component} thisArg Reference to MessageContent component
     * @param message Message object which was long pressed
     * @param e       Event object for onLongPress event
     * */
    onLongPress: PropTypes.func,

    /**
     * Handler to delete a current message.
     */
    handleDelete: PropTypes.func,

    /**
     * Handler to edit a current message. This message simply sets current message as value of `editing` property of channel context.
     * `editing` prop is then used by MessageInput component to switch to edit mode.
     */
    handleEdit: PropTypes.func,

    /** @see See [keyboard context](https://getstream.io/chat/docs/#keyboardcontext) */
    dismissKeyboard: PropTypes.func,

    /** Handler for actions. Actions in combination with attachments can be used to build [commands](https://getstream.io/chat/docs/#channel_commands). */
    handleAction: PropTypes.func,

    /** Handler resend the message. */
    handleRetry: PropTypes.func,

    /** Current [message object](https://getstream.io/chat/docs/#message_format) */
    message: PropTypes.object,

    /**
     * Returns true if message (param) belongs to current user, else false
     *
     * @param message
     * */
    isMyMessage: PropTypes.func,

    /**
     * Position of message in group - top, bottom, middle, single.
     *
     * Message group is a group of consecutive messages from same user. groupStyles can be used to style message as per their position in message group
     * e.g., user avatar (to which message belongs to) is only showed for last (bottom) message in group.
     */
    groupStyles: PropTypes.array,

    /** Boolean if current message is part of thread */
    isThreadList: PropTypes.bool,

    /** @see See [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    openThread: PropTypes.func,

    /** @see See [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    client: PropTypes.object,

    /** A list of users who have read the message */
    readBy: PropTypes.array,

    /**
     * Force alignment of message to left or right - 'left' | 'right'
     * By default, current user's messages will be aligned to right and other user's messages will be aligned to left.
     * */
    forceAlign: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    showMessageStatus: PropTypes.bool,

    /** Latest message id on current channel */
    lastReceivedId: PropTypes.string,

    /**
     * Style object for actionsheet (used to message actions).
     * Supported styles: https://github.com/beefe/react-native-actionsheet/blob/master/lib/styles.js
     */
    actionSheetStyles: PropTypes.object,

    /**
     * Custom UI component for attachment icon for type 'file' attachment.
     * Defaults to: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/FileIcon.js
     */
    AttachmentFileIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
    formatDate: PropTypes.func
  }), _defineProperty(_class$f, "defaultProps", {
    reactionsEnabled: true,
    repliesEnabled: true,
    forceAlign: false,
    showMessageStatus: true,
    MessageAvatar: MessageAvatar,
    MessageContent: MessageContent,
    MessageStatus: MessageStatus,
    MessageSystem: MessageSystem
  }), _defineProperty(_class$f, "themePath", 'message'), _temp$f));

var _class$g, _temp$g;
/**
 * Message - A high level component which implements all the logic required for a message.
 * The actual rendering of the message is delegated via the "Message" property
 *
 * @example ./docs/Message.md
 * @extends Component
 */

var Message = withKeyboardContext((_temp$g = _class$g =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Message, _React$Component);

    function Message(props) {
      var _this;

      _classCallCheck(this, Message);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Message).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "isMyMessage", function (message) {
        return _this.props.client.user.id === message.user.id;
      });

      _defineProperty(_assertThisInitialized(_this), "isAdmin", function () {
        return _this.props.client.user.role === 'admin';
      });

      _defineProperty(_assertThisInitialized(_this), "canEditMessage", function () {
        return _this.isMyMessage(_this.props.message) || _this.isAdmin();
      });

      _defineProperty(_assertThisInitialized(_this), "canDeleteMessage", function () {
        return _this.isMyMessage(_this.props.message) || _this.isAdmin();
      });

      _defineProperty(_assertThisInitialized(_this), "handleFlag",
        /*#__PURE__*/
        function () {
          var _ref = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee(event) {
              var message;
              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      event.preventDefault();
                      message = _this.props.message;
                      _context.next = 4;
                      return _this.props.client.flagMessage(message.id);

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "handleMute",
        /*#__PURE__*/
        function () {
          var _ref2 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee2(event) {
              var message;
              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      event.preventDefault();
                      message = _this.props.message;
                      _context2.next = 4;
                      return _this.props.client.flagMessage(message.user.id);

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "handleEdit", function () {
        _this.props.setEditingState(_this.props.message);
      });

      _defineProperty(_assertThisInitialized(_this), "handleDelete",
        /*#__PURE__*/
        _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee3() {
            var message, data;
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    message = _this.props.message;
                    _context3.next = 3;
                    return _this.props.client.deleteMessage(message.id);

                  case 3:
                    data = _context3.sent;

                    _this.props.updateMessage(data.message);

                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          })));

      _defineProperty(_assertThisInitialized(_this), "handleReaction",
        /*#__PURE__*/
        function () {
          var _ref4 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee4(reactionType, event) {
              var userExistingReaction, currentUser, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _reaction, originalMessage, reactionChangePromise, messageID, tmpReaction, reaction;

              return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (event !== undefined && event.preventDefault) {
                        event.preventDefault();
                      }

                      userExistingReaction = null;
                      currentUser = _this.props.client.userID;
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      _context4.prev = 6;

                      for (_iterator = _this.props.message.own_reactions[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        _reaction = _step.value;

                        // own user should only ever contain the current user id
                        // just in case we check to prevent bugs with message updates from breaking reactions
                        if (currentUser === _reaction.user.id && _reaction.type === reactionType) {
                          userExistingReaction = _reaction;
                        } else if (currentUser !== _reaction.user.id) {
                          console.warn("message.own_reactions contained reactions from a different user, this indicates a bug");
                        }
                      }

                      _context4.next = 14;
                      break;

                    case 10:
                      _context4.prev = 10;
                      _context4.t0 = _context4["catch"](6);
                      _didIteratorError = true;
                      _iteratorError = _context4.t0;

                    case 14:
                      _context4.prev = 14;
                      _context4.prev = 15;

                      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                      }

                    case 17:
                      _context4.prev = 17;

                      if (!_didIteratorError) {
                        _context4.next = 20;
                        break;
                      }

                      throw _iteratorError;

                    case 20:
                      return _context4.finish(17);

                    case 21:
                      return _context4.finish(14);

                    case 22:
                      originalMessage = _this.props.message;

                      /*
                      - Add the reaction to the local state
                      - Make the API call in the background
                      - If it fails, revert to the old message...
                      */
                      if (userExistingReaction) {
                        _this.props.channel.state.removeReaction(userExistingReaction);

                        reactionChangePromise = _this.props.channel.deleteReaction(_this.props.message.id, userExistingReaction.type);
                      } else {
                        // add the reaction
                        messageID = _this.props.message.id;
                        tmpReaction = {
                          message_id: messageID,
                          user: _this.props.client.user,
                          type: reactionType,
                          created_at: new Date()
                        };
                        reaction = {
                          type: reactionType
                        };

                        _this.props.channel.state.addReaction(tmpReaction);

                        reactionChangePromise = _this.props.channel.sendReaction(messageID, reaction);
                      }

                      _context4.prev = 24;
                      _context4.next = 27;
                      return reactionChangePromise;

                    case 27:
                      _context4.next = 32;
                      break;

                    case 29:
                      _context4.prev = 29;
                      _context4.t1 = _context4["catch"](24);

                      // revert to the original message if the API call fails
                      _this.props.updateMessage(originalMessage);

                    case 32:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, null, [[6, 10, 14, 22], [15, , 17, 21], [24, 29]]);
            }));

          return function (_x3, _x4) {
            return _ref4.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "handleAction",
        /*#__PURE__*/
        function () {
          var _ref5 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee5(name, value, event) {
              var messageID, formData, data;
              return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      event.preventDefault();
                      messageID = _this.props.message.id;
                      formData = {};
                      formData[name] = value;
                      _context5.next = 6;
                      return _this.props.channel.sendAction(messageID, formData);

                    case 6:
                      data = _context5.sent;

                      if (data && data.message) {
                        _this.props.updateMessage(data.message);
                      } else {
                        _this.props.removeMessage(_this.props.message);
                      }

                    case 8:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }));

          return function (_x5, _x6, _x7) {
            return _ref5.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "handleRetry",
        /*#__PURE__*/
        function () {
          var _ref6 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee6(message) {
              return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return _this.props.retrySendMessage(message);

                    case 2:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            }));

          return function (_x8) {
            return _ref6.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "onMessageTouch", function (e, message) {
        var _this$props = _this.props,
          onMessageTouch = _this$props.onMessageTouch,
          dismissKeyboardOnMessageTouch = _this$props.dismissKeyboardOnMessageTouch,
          dismissKeyboard = _this$props.dismissKeyboard;
        if (onMessageTouch) onMessageTouch(e, message);
        if (dismissKeyboardOnMessageTouch) dismissKeyboard();
      });

      _defineProperty(_assertThisInitialized(_this), "getTotalReactionCount", function () {
        var emojiData$$1 = _this.props.emojiData;
        var count = null;
        var reactionCounts = _this.props.message.reaction_counts;

        if (reactionCounts !== null && reactionCounts !== undefined && Object.keys(reactionCounts).length > 0) {
          count = 0;
          Object.keys(reactionCounts).map(function (key) {
            if (emojiData$$1.find(function (e) {
              return e.id === key;
            })) {
              count += reactionCounts[key];
            }

            return count;
          });
        }

        return count;
      });

      _this.state = {
        loading: false
      };
      return _this;
    }

    _createClass(Message, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        // since there are many messages its important to only rerender messages when needed.
        var shouldUpdate = nextProps.message !== this.props.message; // read state is the next most likely thing to change..

        if (!shouldUpdate && !deepequal(nextProps.readBy, this.props.readBy)) {
          shouldUpdate = true;
        } // group style often changes for the last 3 messages...


        if (!shouldUpdate && !deepequal(nextProps.groupStyles, this.props.groupStyles)) {
          shouldUpdate = true;
        } // if lastreceivedId changesm, message should update.


        if (!shouldUpdate && !deepequal(nextProps.lastReceivedId, this.props.lastReceivedId)) {
          shouldUpdate = true;
        } // editing is the last one which can trigger a change..


        if (!shouldUpdate && nextProps.editing !== this.props.editing) {
          shouldUpdate = true;
        }

        return shouldUpdate;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var message = this.props.message;
        var actionsEnabled = message.type === 'regular' && message.status === 'received';
        var Component = this.props.Message;
        var actionProps = {};

        if (this.props.channel && this.props.channel.getConfig()) {
          actionProps.reactionsEnabled = this.props.channel.getConfig().reactions;
          actionProps.repliesEnabled = this.props.channel.getConfig().reactions;
        }

        return React__default.createElement(reactNative.TouchableOpacity, {
          onPress: function onPress(e) {
            _this2.onMessageTouch(e, message);
          },
          activeOpacity: 1
        }, React__default.createElement(Component, _extends({}, this.props, actionProps, {
          client: this.props.client,
          channel: this.props.channel,
          actionsEnabled: actionsEnabled,
          Message: this,
          onMessageTouch: function onMessageTouch(e) {
            _this2.onMessageTouch(e, message);
          },
          handleReaction: this.handleReaction,
          getTotalReactionCount: this.getTotalReactionCount,
          handleFlag: this.handleFlag,
          handleMute: this.handleMute,
          handleAction: this.handleAction,
          handleRetry: this.handleRetry,
          isMyMessage: this.isMyMessage,
          isAdmin: this.isAdmin,
          canEditMessage: this.canEditMessage,
          canDeleteMessage: this.canDeleteMessage,
          handleEdit: this.handleEdit,
          handleDelete: this.handleDelete,
          openThread: this.props.openThread && this.props.openThread.bind(this, message)
        })));
      }
    }]);

    return Message;
  }(React__default.Component), _defineProperty(_class$g, "themePath", 'message'), _defineProperty(_class$g, "extraThemePaths", ['avatar']), _defineProperty(_class$g, "propTypes", {
    /** The message object */
    message: PropTypes.object.isRequired,

    /** The client connection object for connecting to Stream */
    client: PropTypes.object.isRequired,

    /** The current channel this message is displayed in */
    channel: PropTypes.object.isRequired,

    /** A list of users that have read this message **/
    readBy: PropTypes.array,

    /** groupStyles, a list of styles to apply to this message. ie. top, bottom, single etc */
    groupStyles: PropTypes.array,

    /** Editing, if the message is currently being edited */
    editing: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

    /**
     * Message UI component to display a message in message list.
     * Avaialble from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)
     * */
    Message: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Attachment UI component to display attachment in individual message.
     * Avaialble from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)
     * */
    Attachment: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Array of allowed actions on message. e.g. ['edit', 'delete', 'mute', 'flag']
     * If all the actions need to be disabled, empty array or false should be provided as value of prop.
     * */
    messageActions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),

    /** Latest message id on current channel */
    lastReceivedId: PropTypes.string,

    /** @see See [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    setEditingState: PropTypes.func,

    /** @see See [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    updateMessage: PropTypes.func,

    /** @see See [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    removeMessage: PropTypes.func,

    /** @see See [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    retrySendMessage: PropTypes.func,

    /** @see See [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    openThread: PropTypes.func,

    /** @see See [Keyboard Context](https://getstream.github.io/stream-chat-react-native/#keyboardcontext) */
    dismissKeyboard: PropTypes.func,

    /**
     * Callback for onPress event on Message component
     *
     * @param e       Event object for onPress event
     * @param message Message object which was pressed
     *
     * */
    onMessageTouch: PropTypes.func,

    /** Should keyboard be dismissed when messaged is touched */
    dismissKeyboardOnMessageTouch: PropTypes.bool
  }), _defineProperty(_class$g, "defaultProps", {
    Message: MessageSimple,
    messageActions: Object.keys(MESSAGE_ACTIONS),
    readBy: [],
    groupStyles: [],
    Attachment: Attachment,
    editing: false,
    dismissKeyboardOnMessageTouch: true
  }), _temp$g));

var _class$h, _temp$h;

function _templateObject2$j() {
  var data = _taggedTemplateLiteral(["\n  color: white;\n  font-size: 12px;\n  font-weight: 600;\n  ", "\n"]);

  _templateObject2$j = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$p() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 27px;\n  width: 112px;\n  z-index: 10;\n  margin-bottom: 0;\n  border-radius: 13px;\n  background-color: ", ";\n  transform: translateY(9px);\n  ", "\n"]);

  _templateObject$p = function _templateObject() {
    return data;
  };

  return data;
}
var Container$h = styled__default.TouchableOpacity(_templateObject$p(), function (_ref) {
  var theme = _ref.theme;
  return theme.colors.primary;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageList.messageNotification.container.css;
});
var MessageNotificationText = styled__default.Text(_templateObject2$j(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.messageList.messageNotification.text.css;
});
/**
 * @example ./docs/MessageNotification.md
 * @extends PureComponent
 */

var MessageNotification = themed((_temp$h = _class$h =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(MessageNotification, _PureComponent);

    function MessageNotification(props) {
      var _this;

      _classCallCheck(this, MessageNotification);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageNotification).call(this, props));
      _this.state = {
        notificationOpacity: new reactNative.Animated.Value(0)
      };
      return _this;
    }

    _createClass(MessageNotification, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        reactNative.Animated.timing(this.state.notificationOpacity, {
          toValue: this.props.showNotification ? 1 : 0,
          duration: 500
        }).start();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.showNotification !== this.props.showNotification) {
          reactNative.Animated.timing(this.state.notificationOpacity, {
            toValue: this.props.showNotification ? 1 : 0,
            duration: 500
          }).start();
        }
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.props.showNotification) {
          return null;
        } else {
          return React__default.createElement(reactNative.Animated.View, {
            style: {
              position: 'absolute',
              bottom: 0,
              opacity: this.state.notificationOpacity
            }
          }, React__default.createElement(Container$h, {
            onPress: this.props.onPress
          }, React__default.createElement(MessageNotificationText, null, "New Messages")));
        }
      }
    }]);

    return MessageNotification;
  }(React.PureComponent), _defineProperty(_class$h, "themePath", 'messageList.messageNotification'), _defineProperty(_class$h, "propTypes", {
    /** If we should show the notification or not */
    showNotification: PropTypes.bool,

    /** Onclick handler */
    onPress: PropTypes.func.isRequired
  }), _defineProperty(_class$h, "defaultProps", {
    showNotification: true
  }), _temp$h));

function _templateObject5$7() {
  var data = _taggedTemplateLiteral(["\n  justify-content: center;\n  height: ", ";\n  ", ";\n"]);

  _templateObject5$7 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$b() {
  var data = _taggedTemplateLiteral(["\n  height: 0;\n  ", ";\n"]);

  _templateObject4$b = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$f() {
  var data = _taggedTemplateLiteral(["\n  padding: 10px;\n  font-weight: bold;\n  height: ", ";\n  ", ";\n"]);

  _templateObject3$f = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$k() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 10;\n  background-color: white;\n  z-index: 100;\n  border-top-left-radius: 10;\n  border-top-right-radius: 10;\n  width: ", ";\n  margin-left: ", ";\n  shadow-color: #000;\n  shadow-opacity: 0.05;\n  shadow-offset: 0px -3px;\n  height: ", ";\n  ", ";\n"]);

  _templateObject2$k = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$q() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  z-index: 90;\n  height: ", ";\n  width: 100%;\n  ", "\n"]);

  _templateObject$q = function _templateObject() {
    return data;
  };

  return data;
}
var Wrapper = styled__default.TouchableOpacity(_templateObject$q(), function (_ref) {
  var height = _ref.height;
  return height;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageInput.suggestions.wrapper.css;
});
var Container$i = styled__default.View(_templateObject2$k(), function (_ref3) {
  var width = _ref3.width;
  return width;
}, function (_ref4) {
  var marginLeft = _ref4.marginLeft;
  return marginLeft;
}, function (_ref5) {
  var theme = _ref5.theme,
    length = _ref5.length;
  return Math.min(length * theme.messageInput.suggestions.container.itemHeight, theme.messageInput.suggestions.container.maxHeight);
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.messageInput.suggestions.container.css;
});
var Title$1 = styled__default.Text(_templateObject3$f(), function (_ref7) {
  var theme = _ref7.theme;
  return theme.messageInput.suggestions.container.itemHeight;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.messageInput.suggestions.title.css;
});
var Separator = styled__default.View(_templateObject4$b(), function (_ref9) {
  var theme = _ref9.theme;
  return theme.messageInput.suggestions.separator.css;
});
var SuggestionsItem = styled__default.TouchableOpacity(_templateObject5$7(), function (_ref10) {
  var theme = _ref10.theme;
  return theme.messageInput.suggestions.container.itemHeight;
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.messageInput.suggestions.item.css;
});
var SuggestionsProvider =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(SuggestionsProvider, _React$PureComponent);

    function SuggestionsProvider(props) {
      var _this;

      _classCallCheck(this, SuggestionsProvider);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(SuggestionsProvider).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "openSuggestions",
        /*#__PURE__*/
        function () {
          var _ref12 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee(title, component) {
              var _ref13, _ref14, inputBoxPosition, chatBoxPosition;

              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return Promise.all([_this.getInputBoxPosition(), _this.getChatBoxPosition()]);

                    case 2:
                      _ref13 = _context.sent;
                      _ref14 = _slicedToArray(_ref13, 2);
                      inputBoxPosition = _ref14[0];
                      chatBoxPosition = _ref14[1];

                      _this.setState({
                        suggestionsBottomMargin: chatBoxPosition.height - inputBoxPosition.y,
                        suggestionsLeftMargin: inputBoxPosition.x,
                        suggestionsWidth: inputBoxPosition.width,
                        suggestionsViewActive: true,
                        suggestionsBackdropHeight: inputBoxPosition.y,
                        suggestionsTitle: title,
                        component: component
                      });

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

          return function (_x, _x2) {
            return _ref12.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "updateSuggestions", function (suggestions) {
        _this.setState({
          suggestions: suggestions
        });
      });

      _defineProperty(_assertThisInitialized(_this), "closeSuggestions", function () {
        _this.setState({
          suggestionsViewActive: false,
          suggestionsTitle: '',
          component: null
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setInputBoxContainerRef", function (o) {
        _this.messageInputBox = o;
      });

      _defineProperty(_assertThisInitialized(_this), "getInputBoxPosition", function () {
        return new Promise(function (resolve) {
          var nodeHandleRoot = reactNative.findNodeHandle(_this.rootView);

          _this.messageInputBox.measureLayout(nodeHandleRoot, function (x, y, width, height) {
            resolve({
              x: x,
              y: y,
              height: height,
              width: width
            });
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "getChatBoxPosition", function () {
        return new Promise(function (resolve) {
          var nodeHandleRoot = reactNative.findNodeHandle(_this.rootView);

          _this.rootView.measureLayout(nodeHandleRoot, function (x, y, width, height) {
            resolve({
              x: x,
              y: y,
              height: height,
              width: width
            });
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setRootView", function (o) {
        _this.rootView = o;
      });

      _defineProperty(_assertThisInitialized(_this), "getContext", function () {
        return {
          setInputBoxContainerRef: _this.setInputBoxContainerRef,
          openSuggestions: _this.openSuggestions,
          closeSuggestions: _this.closeSuggestions,
          updateSuggestions: _this.updateSuggestions
        };
      });

      _this.state = {
        suggestionsViewActive: false,
        suggestionsBottomMargin: 0,
        suggestionsLeftMargin: 0,
        suggestions: {},
        suggestionsWidth: 0,
        suggestionsBackdropHeight: 0,
        suggestionsTitle: '',
        component: null
      };
      return _this;
    }

    _createClass(SuggestionsProvider, [{
      key: "render",
      value: function render() {
        return React__default.createElement(SuggestionsContext.Provider, {
          value: this.getContext()
        }, React__default.createElement(SuggestionsView, {
          component: this.state.component,
          suggestions: this.state.suggestions,
          active: this.state.suggestionsViewActive,
          marginBottom: this.state.suggestionsBottomMargin,
          marginLeft: this.state.suggestionsLeftMargin,
          width: this.state.suggestionsWidth,
          backdropHeight: this.state.suggestionsBackdropHeight,
          handleDismiss: this.closeSuggestions,
          suggestionsTitle: this.state.suggestionsTitle
        }), React__default.createElement(reactNative.View, {
          ref: this.setRootView,
          collapsable: false,
          style: {
            height: '100%'
          }
        }, this.props.children));
      }
    }]);

    return SuggestionsProvider;
  }(React__default.PureComponent);

var SuggestionsView =
  /*#__PURE__*/
  function (_React$PureComponent2) {
    _inherits(SuggestionsView, _React$PureComponent2);

    function SuggestionsView(props) {
      var _this2;

      _classCallCheck(this, SuggestionsView);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SuggestionsView).call(this, props));

      _defineProperty(_assertThisInitialized(_this2), "renderHeader", function () {
        return React__default.createElement(SuggestionsHeader, null);
      });

      _defineProperty(_assertThisInitialized(_this2), "renderItem", function (_ref15) {
        var item = _ref15.item;
        var _this2$props = _this2.props,
          onSelect = _this2$props.suggestions.onSelect,
          Component = _this2$props.component;
        return React__default.createElement(SuggestionsItem, {
          onPress: function onPress() {
            onSelect(item);
          }
        }, React__default.createElement(Component, {
          item: item
        }));
      });

      return _this2;
    }

    _createClass(SuggestionsView, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          active = _this$props.active,
          marginLeft = _this$props.marginLeft,
          width = _this$props.width,
          data = _this$props.suggestions.data,
          backdropHeight = _this$props.backdropHeight,
          handleDismiss = _this$props.handleDismiss,
          suggestionsTitle = _this$props.suggestionsTitle;
        if (!active) return null;
        if (!data || data.length === 0) return null;
        return React__default.createElement(Wrapper, {
          height: backdropHeight,
          onPress: handleDismiss
        }, React__default.createElement(Container$i, {
          width: width,
          length: data.length + 1,
          marginLeft: marginLeft
        }, React__default.createElement(reactNative.FlatList, {
          ListHeaderComponent: React__default.createElement(SuggestionsHeader, {
            title: suggestionsTitle
          }),
          ItemSeparatorComponent: SuggestionsSeparator,
          data: data,
          keyboardShouldPersistTaps: "always",
          renderItem: this.renderItem,
          keyExtractor: function keyExtractor(item, index) {
            return (item.name || item.id) + index;
          }
        })));
      }
    }]);

    return SuggestionsView;
  }(React__default.PureComponent);

_defineProperty(SuggestionsView, "propTypes", {
  active: PropTypes.bool,
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  suggestions: PropTypes.object,
  backdropHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleDismiss: PropTypes.func,
  suggestionsTitle: PropTypes.string
});

var SuggestionsHeader = function SuggestionsHeader(_ref16) {
  var title = _ref16.title;
  return React__default.createElement(Title$1, null, title);
};

var SuggestionsSeparator = function SuggestionsSeparator() {
  return React__default.createElement(Separator, null);
};

var fail = function fail() {
  throw Error('Native handler was not registered, you should import stream-chat-expo or stream-chat-react-native');
};

exports.NetInfo = {
  fetch: fail,
  addEventListener: fail
};
var pickImage = fail;
var pickDocument = fail;
var registerNativeHandlers = function registerNativeHandlers(handlers) {
  if (handlers.NetInfo) {
    exports.NetInfo = handlers.NetInfo;
  }

  if (handlers.pickImage) {
    pickImage = handlers.pickImage;
  }

  if (handlers.pickDocument) {
    pickDocument = handlers.pickDocument;
  }
};

var _class$i, _temp$i;
/**
 * Chat - Wrapper component for Chat. The needs to be placed around any other chat components.
 * This Chat component provides the ChatContext to all other components.
 *
 * The ChatContext provides the following props:
 *
 * - client (the client connection)
 * - channels (the list of channels)
 * - setActiveChannel (a function to set the currently active channel)
 * - channel (the currently active channel)
 *
 * It also exposes the withChatContext HOC which you can use to consume the ChatContext
 *
 * @example ./docs/Chat.md
 * @extends PureComponent
 */

var Chat = themed((_temp$i = _class$i =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(Chat, _PureComponent);

    function Chat(props) {
      var _this;

      _classCallCheck(this, Chat);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Chat).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "notifyChatClient", function (isConnected) {
        if (_this.props.client != null && _this.props.client.wsConnection != null) {
          if (isConnected) {
            _this.props.client.wsConnection.onlineStatusChanged({
              type: 'online'
            });
          } else {
            _this.props.client.wsConnection.onlineStatusChanged({
              type: 'offline'
            });
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "setConnectionListener", function () {
        exports.NetInfo.fetch().then(function (isConnected) {
          _this.notifyChatClient(isConnected);
        });
        _this.unsubscribeNetInfo = exports.NetInfo.addEventListener(function (isConnected) {
          _this.notifyChatClient(isConnected);
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setActiveChannel", function (channel) {
        _this.props.logger('Chat component', 'setActiveChannel', {
          tags: ['chat'],
          props: _this.props,
          state: _this.state
        });

        if (_this._unmounted) return;

        _this.setState(function () {
          return {
            channel: channel
          };
        });
      });

      _defineProperty(_assertThisInitialized(_this), "getContext", function () {
        return {
          client: _this.props.client,
          channel: _this.state.channel,
          setActiveChannel: _this.setActiveChannel,
          isOnline: _this.state.isOnline,
          connectionRecovering: _this.state.connectionRecovering,
          logger: _this.props.logger
        };
      });

      _this.state = {
        // currently active channel
        channel: {},
        isOnline: true,
        connectionRecovering: false
      };
      _this.unsubscribeNetInfo = null;

      _this.setConnectionListener();

      _this.props.client.on('connection.changed', function (event) {
        if (_this._unmounted) return;

        _this.setState({
          isOnline: event.online,
          connectionRecovering: !event.online
        });
      });

      _this.props.client.on('connection.recovered', function () {
        if (_this._unmounted) return;

        _this.setState({
          connectionRecovering: false
        });
      });

      _this._unmounted = false;
      return _this;
    }

    _createClass(Chat, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.logger('Chat component', 'componentDidMount', {
          tags: ['lifecycle', 'chat'],
          props: this.props,
          state: this.state
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.props.logger('Chat component', 'componentDidUpdate', {
          tags: ['lifecycle', 'chat'],
          props: this.props,
          state: this.state
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.logger('Chat component', 'componentWillUnmount', {
          tags: ['lifecycle', 'chat'],
          props: this.props,
          state: this.state
        });
        this._unmounted = true;
        this.props.client.off('connection.recovered');
        this.props.client.off('connection.changed');
        this.props.client.off(this.handleEvent);
        this.unsubscribeNetInfo && this.unsubscribeNetInfo();
      }
    }, {
      key: "render",
      value: function render() {
        this.props.logger('Chat component', 'Rerendering', {
          props: this.props,
          state: this.state
        });
        return React__default.createElement(ChatContext.Provider, {
          value: this.getContext()
        }, this.props.children);
      }
    }]);

    return Chat;
  }(React.PureComponent), _defineProperty(_class$i, "themePath", ''), _defineProperty(_class$i, "propTypes", {
    /** The StreamChat client object */
    client: PropTypes.object.isRequired,

    /**
     * Theme object
     *
     * @ref https://getstream.io/chat/react-native-chat/tutorial/#custom-styles
     * */
    style: PropTypes.object,
    logger: PropTypes.func
  }), _defineProperty(_class$i, "defaultProps", {
    logger: function logger() { }
  }), _temp$i));

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * This component is not really exposed externally, and is only supposed to be used with
 * 'Channel' component (which is actually exposed to customers).
 */

var ChannelInner =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(ChannelInner, _PureComponent);

    function ChannelInner(props) {
      var _this;

      _classCallCheck(this, ChannelInner);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChannelInner).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "markRead", function () {
        if (!_this.props.channel.getConfig().read_events) {
          return;
        }

        streamChat.logChatPromiseExecution(_this.props.channel.markRead(), 'mark read');
      });

      _defineProperty(_assertThisInitialized(_this), "openThread", function (message) {
        var channel = _this.props.channel;
        var threadMessages = channel.state.threads[message.id] || [];
        if (_this._unmounted) return;

        _this.setState({
          thread: message,
          threadMessages: threadMessages
        });
      });

      _defineProperty(_assertThisInitialized(_this), "loadMoreThread",
        /*#__PURE__*/
        _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee() {
            var channel, parentID, oldMessages, oldestMessageID, limit, queryResponse, hasMore, threadMessages;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!_this.state.threadLoadingMore) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return");

                  case 2:
                    if (!_this._unmounted) {
                      _context.next = 4;
                      break;
                    }

                    return _context.abrupt("return");

                  case 4:
                    _this.setState({
                      threadLoadingMore: true
                    });

                    channel = _this.props.channel;
                    parentID = _this.state.thread.id;
                    oldMessages = channel.state.threads[parentID] || [];
                    oldestMessageID = oldMessages[0] ? oldMessages[0].id : null;
                    limit = 50;
                    _context.next = 12;
                    return channel.getReplies(parentID, {
                      limit: limit,
                      id_lt: oldestMessageID
                    });

                  case 12:
                    queryResponse = _context.sent;
                    hasMore = queryResponse.messages.length === limit;
                    threadMessages = channel.state.threads[parentID] || []; // next set loadingMore to false so we can start asking for more data...

                    _this._loadMoreThreadFinishedDebounced(hasMore, threadMessages);

                  case 16:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })));

      _defineProperty(_assertThisInitialized(_this), "loadMoreThreadFinished", function (threadHasMore, threadMessages) {
        if (_this._unmounted) return;

        _this.setState({
          threadLoadingMore: false,
          threadHasMore: threadHasMore,
          threadMessages: threadMessages
        });
      });

      _defineProperty(_assertThisInitialized(_this), "closeThread", function () {
        if (_this._unmounted) return;

        _this.setState({
          thread: null,
          threadMessages: []
        });
      });

      _defineProperty(_assertThisInitialized(_this), "setEditingState", function (message) {
        if (_this._unmounted) return;

        _this.setState({
          editing: message
        });
      });

      _defineProperty(_assertThisInitialized(_this), "updateMessage", function (updatedMessage, extraState) {
        var channel = _this.props.channel;
        extraState = extraState || {}; // adds the message to the local channel state..
        // this adds to both the main channel state as well as any reply threads

        channel.state.addMessageSorted(updatedMessage); // update the Channel component state

        if (_this.state.thread && updatedMessage.parent_id) {
          extraState.threadMessages = channel.state.threads[updatedMessage.parent_id] || [];
        }

        if (_this._unmounted) return;

        _this.setState(_objectSpread$4({
          messages: channel.state.messages
        }, extraState));
      });

      _defineProperty(_assertThisInitialized(_this), "clearEditingState", function () {
        if (_this._unmounted) return;

        _this.setState({
          editing: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "removeMessage", function (message) {
        var channel = _this.props.channel;
        channel.state.removeMessage(message);
        if (_this._unmounted) return;

        _this.setState({
          messages: channel.state.messages
        });
      });

      _defineProperty(_assertThisInitialized(_this), "createMessagePreview", function (text, attachments, parent, mentioned_users, extraFields) {
        // create a preview of the message
        var clientSideID = "".concat(_this.props.client.userID, "-") + uuidv4();

        var message = _objectSpread$4({
          text: text,
          html: text,
          __html: text,
          //id: tmpID,
          id: clientSideID,
          type: 'regular',
          status: 'sending',
          user: _objectSpread$4({
            id: _this.props.client.userID
          }, _this.props.client.user),
          created_at: new Date(),
          attachments: attachments,
          mentioned_users: mentioned_users,
          reactions: []
        }, extraFields);

        if (parent && parent.id) {
          message.parent_id = parent.id;
        }

        return message;
      });

      _defineProperty(_assertThisInitialized(_this), "editMessage",
        /*#__PURE__*/
        function () {
          var _ref2 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee2(updatedMessage) {
              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!_this.props.doUpdateMessageRequest) {
                        _context2.next = 2;
                        break;
                      }

                      return _context2.abrupt("return", Promise.resolve(_this.props.doUpdateMessageRequest(_this.props.channel.cid, updatedMessage)));

                    case 2:
                      return _context2.abrupt("return", _this.props.client.updateMessage(updatedMessage));

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "_sendMessage",
        /*#__PURE__*/
        function () {
          var _ref3 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee3(message) {
              var text, attachments, id, parent_id, mentioned_users, html, __html, type, status, user, created_at, reactions, extraFields, messageData, messageResponse;

              return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      // Scrape the reserved fields if present.
                      text = message.text, attachments = message.attachments, id = message.id, parent_id = message.parent_id, mentioned_users = message.mentioned_users, html = message.html, __html = message.__html, type = message.type, status = message.status, user = message.user, created_at = message.created_at, reactions = message.reactions, extraFields = _objectWithoutProperties(message, ["text", "attachments", "id", "parent_id", "mentioned_users", "html", "__html", "type", "status", "user", "created_at", "reactions"]);
                      messageData = _objectSpread$4({
                        text: text,
                        attachments: attachments,
                        id: id,
                        parent_id: parent_id,
                        mentioned_users: mentioned_users
                      }, extraFields);
                      _context3.prev = 2;

                      if (!_this.props.doSendMessageRequest) {
                        _context3.next = 9;
                        break;
                      }

                      _context3.next = 6;
                      return _this.props.doSendMessageRequest(_this.props.channel.cid, messageData);

                    case 6:
                      messageResponse = _context3.sent;
                      _context3.next = 12;
                      break;

                    case 9:
                      _context3.next = 11;
                      return _this.props.channel.sendMessage(messageData);

                    case 11:
                      messageResponse = _context3.sent;

                    case 12:
                      // replace it after send is completed
                      if (messageResponse.message) {
                        messageResponse.message.status = 'received';

                        _this.updateMessage(messageResponse.message);
                      }

                      _context3.next = 20;
                      break;

                    case 15:
                      _context3.prev = 15;
                      _context3.t0 = _context3["catch"](2);
                      console.log(_context3.t0); // set the message to failed..

                      message.status = 'failed';

                      _this.updateMessage(message);

                    case 20:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, null, [[2, 15]]);
            }));

          return function (_x2) {
            return _ref3.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "sendMessage",
        /*#__PURE__*/
        function () {
          var _ref5 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee4(_ref4) {
              var text, _ref4$attachments, attachments, parent, mentioned_users, extraFields, messagePreview;

              return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      text = _ref4.text, _ref4$attachments = _ref4.attachments, attachments = _ref4$attachments === void 0 ? [] : _ref4$attachments, parent = _ref4.parent, mentioned_users = _ref4.mentioned_users, extraFields = _objectWithoutProperties(_ref4, ["text", "attachments", "parent", "mentioned_users"]);

                      // remove error messages upon submit
                      _this.props.channel.state.filterErrorMessages(); // create a local preview message to show in the UI


                      messagePreview = _this.createMessagePreview(text, attachments, parent, mentioned_users, extraFields); // first we add the message to the UI

                      _this.updateMessage(messagePreview, {
                        messageInput: '',
                        commands: [],
                        userAutocomplete: []
                      });

                      _context4.next = 6;
                      return _this._sendMessage(messagePreview);

                    case 6:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }));

          return function (_x3) {
            return _ref5.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "retrySendMessage",
        /*#__PURE__*/
        function () {
          var _ref6 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee5(message) {
              return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      // set the message status to sending
                      message = message.asMutable();
                      message.status = 'sending';

                      _this.updateMessage(message); // actually try to send the message...


                      _context5.next = 5;
                      return _this._sendMessage(message);

                    case 5:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }));

          return function (_x4) {
            return _ref6.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "handleEvent", function (e) {
        var channel = _this.props.channel;
        var threadMessages = [];
        var threadState = {};

        if (_this.state.thread) {
          threadMessages = channel.state.threads[_this.state.thread.id] || [];
          threadState['threadMessages'] = threadMessages;
        }

        if (_this.state.thread && e.message && e.message.id === _this.state.thread.id) {
          threadState['thread'] = channel.state.messageToImmutable(e.message);
        }

        if (Object.keys(threadState).length > 0) {
          // TODO: in theory we should do 1 setState call not 2,
          // However the setStateThrottled doesn't support this
          if (_this._unmounted) return;

          _this.setState(threadState);
        }

        if (e.type === 'member.added') {
          _this.addToEventHistory(e);
        }

        if (e.type === 'member.removed') {
          _this.addToEventHistory(e);
        }

        _this._setStateThrottled({
          messages: channel.state.messages,
          watchers: channel.state.watchers,
          read: channel.state.read,
          typing: channel.state.typing,
          watcher_count: channel.state.watcher_count
        });
      });

      _defineProperty(_assertThisInitialized(_this), "addToEventHistory", function (e) {
        _this.setState(function (prevState) {
          var lastMessageId = prevState.messages.length > 0 ? prevState.messages[prevState.messages.length - 1].id : 'none';
          if (!prevState.eventHistory[lastMessageId]) return _objectSpread$4({}, prevState, {
            eventHistory: _objectSpread$4({}, prevState.eventHistory, _defineProperty({}, lastMessageId, [e]))
          });
          return _objectSpread$4({}, prevState, {
            eventHistory: _objectSpread$4({}, prevState.eventHistory, _defineProperty({}, lastMessageId, [].concat(_toConsumableArray(prevState.eventHistory[lastMessageId]), [e])))
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "loadMore",
        /*#__PURE__*/
        _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee6() {
            var oldestMessage, oldestID, perPage, queryResponse, hasMore;
            return _regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!(_this.state.loadingMore || !_this.state.hasMore)) {
                      _context6.next = 2;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 2:
                    if (!_this._unmounted) {
                      _context6.next = 4;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 4:
                    _this.setState({
                      loadingMore: true
                    });

                    if (!(!_this.state.messages.length === 0)) {
                      _context6.next = 8;
                      break;
                    }

                    _this.setState({
                      loadingMore: false
                    });

                    return _context6.abrupt("return");

                  case 8:
                    oldestMessage = _this.state.messages[0] ? _this.state.messages[0] : null;

                    if (!(oldestMessage && oldestMessage.status !== 'received')) {
                      _context6.next = 12;
                      break;
                    }

                    _this.setState({
                      loadingMore: false
                    });

                    return _context6.abrupt("return");

                  case 12:
                    oldestID = oldestMessage ? oldestMessage.id : null;
                    perPage = 100;

                    _this.props.logger('Channel Component', 'Requerying the messages', {
                      props: _this.props,
                      state: _this.state,
                      limit: perPage,
                      id_lt: oldestID
                    });

                    _context6.prev = 15;
                    _context6.next = 18;
                    return _this.props.channel.query({
                      messages: {
                        limit: perPage,
                        id_lt: oldestID
                      }
                    });

                  case 18:
                    queryResponse = _context6.sent;
                    _context6.next = 28;
                    break;

                  case 21:
                    _context6.prev = 21;
                    _context6.t0 = _context6["catch"](15);
                    console.warn('message pagination request failed with error', _context6.t0);

                    if (!_this._unmounted) {
                      _context6.next = 26;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 26:
                    _this.setState({
                      loadingMore: false
                    });

                    return _context6.abrupt("return");

                  case 28:
                    hasMore = queryResponse.messages.length === perPage;

                    _this._loadMoreFinishedDebounced(hasMore, _this.props.channel.state.messages);

                  case 30:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, null, [[15, 21]]);
          })));

      _defineProperty(_assertThisInitialized(_this), "loadMoreFinished", function (hasMore, messages) {
        if (_this._unmounted) return;

        _this.setState({
          loadingMore: false,
          hasMore: hasMore,
          messages: messages
        });
      });

      _defineProperty(_assertThisInitialized(_this), "getContext", function () {
        return _objectSpread$4({}, _this.state, {
          client: _this.props.client,
          channel: _this.props.channel,
          Message: _this.props.Message,
          Attachment: _this.props.Attachment,
          updateMessage: _this.updateMessage,
          removeMessage: _this.removeMessage,
          sendMessage: _this.sendMessage,
          editMessage: _this.editMessage,
          retrySendMessage: _this.retrySendMessage,
          setEditingState: _this.setEditingState,
          clearEditingState: _this.clearEditingState,
          EmptyStateIndicator: _this.props.EmptyStateIndicator,
          markRead: _this._markReadThrottled,
          loadMore: _this._loadMoreThrottled,
          // thread related
          openThread: _this.openThread,
          closeThread: _this.closeThread,
          loadMoreThread: _this.loadMoreThread,
          emojiData: _this.props.emojiData
        });
      });

      _defineProperty(_assertThisInitialized(_this), "renderComponent", function () {
        return _this.props.children;
      });

      _defineProperty(_assertThisInitialized(_this), "renderLoading", function () {
        var Indicator = _this.props.LoadingIndicator;
        return React__default.createElement(Indicator, {
          listType: "message"
        });
      });

      _defineProperty(_assertThisInitialized(_this), "renderLoadingError", function () {
        var Indicator = _this.props.LoadingErrorIndicator;
        return React__default.createElement(Indicator, {
          error: _this.state.error,
          listType: "message"
        });
      });

      _this.state = {
        error: false,
        // Loading the intial content of the channel
        loading: true,
        // Loading more messages
        loadingMore: false,
        hasMore: true,
        messages: Immutable([]),
        online: props.isOnline,
        typing: Immutable({}),
        watchers: Immutable({}),
        members: Immutable({}),
        read: Immutable({}),
        thread: props.thread,
        threadMessages: [],
        threadLoadingMore: false,
        threadHasMore: true,
        kavEnabled: true,

        /** We save the events in state so that we can display event message
         * next to the message after which it was received, in MessageList.
         *
         * e.g., eventHistory = {
         *   message_id_1: [
         *     { ...event_obj_received_after_message_id_1__1 },
         *     { ...event_obj_received_after_message_id_1__2 },
         *     { ...event_obj_received_after_message_id_1__3 },
         *   ],
         *   message_id_2: [
         *     { ...event_obj_received_after_message_id_2__1 },
         *     { ...event_obj_received_after_message_id_2__2 },
         *     { ...event_obj_received_after_message_id_2__3 },
         *   ]
         * }
         */
        eventHistory: {}
      }; // hard limit to prevent you from scrolling faster than 1 page per 2 seconds

      _this._loadMoreFinishedDebounced = debounce(_this.loadMoreFinished, 2000, {
        leading: true,
        trailing: true
      });
      _this._loadMoreThrottled = throttle(_this.loadMore, 2000, {
        leading: true,
        trailing: true
      }); // hard limit to prevent you from scrolling faster than 1 page per 2 seconds

      _this._loadMoreThreadFinishedDebounced = debounce(_this.loadMoreThreadFinished, 2000, {
        leading: true,
        trailing: true
      });
      _this._setStateThrottled = throttle(_this.setState, 500, {
        leading: true,
        trailing: true
      });
      _this._markReadThrottled = throttle(_this.markRead, 500, {
        leading: true,
        trailing: true
      });
      _this.messageInputBox = false;

      _this.props.logger('Channel component', 'Constructor', {
        props: _this.props,
        state: _this.state
      });

      return _this;
    }

    _createClass(ChannelInner, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        this.props.logger('Channel component', 'componentDidUpdate', {
          tags: ['lifecycle', 'channel'],
          props: this.props,
          state: this.state
        });

        if (this.props.isOnline !== prevProps.isOnline) {
          if (this._unmounted) return;
          this.setState({
            online: this.props.isOnline
          });
        }
      }
    }, {
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee7() {
            var channel, errored;
            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    this.props.logger('Channel component', 'componentDidMount', {
                      tags: ['lifecycle', 'channel'],
                      props: this.props,
                      state: this.state
                    });
                    channel = this.props.channel;
                    errored = false;

                    if (channel.initialized) {
                      _context7.next = 15;
                      break;
                    }

                    _context7.prev = 4;
                    _context7.next = 7;
                    return channel.watch();

                  case 7:
                    _context7.next = 15;
                    break;

                  case 9:
                    _context7.prev = 9;
                    _context7.t0 = _context7["catch"](4);

                    if (!this._unmounted) {
                      _context7.next = 13;
                      break;
                    }

                    return _context7.abrupt("return");

                  case 13:
                    this.setState({
                      error: _context7.t0
                    });
                    errored = true;

                  case 15:
                    this.lastRead = new Date();

                    if (!errored) {
                      this.copyChannelState();
                      this.listenToChanges();
                    }

                  case 17:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this, [[4, 9]]);
          }));

        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }

        return componentDidMount;
      }()
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.logger('Channel component', 'componentWillUnmount', {
          tags: ['lifecycle', 'channel'],
          props: this.props,
          state: this.state
        });
        this.props.channel.off(this.handleEvent);
        this.props.client.off('connection.recovered', this.handleEvent);

        this._loadMoreFinishedDebounced.cancel();

        this._loadMoreThreadFinishedDebounced.cancel();

        this._setStateThrottled.cancel();

        this._unmounted = true;
      }
    }, {
      key: "copyChannelState",
      value: function copyChannelState() {
        var channel = this.props.channel;
        if (this._unmounted) return;
        this.setState({
          messages: channel.state.messages,
          read: channel.state.read,
          watchers: channel.state.watchers,
          members: channel.state.members,
          watcher_count: channel.state.watcher_count,
          loading: false,
          typing: Immutable({})
        });
        if (channel.countUnread() > 0) this.markRead();
      }
    }, {
      key: "listenToChanges",
      value: function listenToChanges() {
        // The more complex sync logic is done in chat.js
        // listen to client.connection.recovered and all channel events
        this.props.client.on('connection.recovered', this.handleEvent);
        var channel = this.props.channel;
        channel.on(this.handleEvent);
      }
    }, {
      key: "removeEphemeralMessages",
      value: function removeEphemeralMessages() {
        var c = this.props.channel;
        c.state.selectRegularMessages();
        if (this._unmounted) return;
        this.setState({
          messages: c.state.messages
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var core;
        var KeyboardCompatibleView = this.props.KeyboardCompatibleView;

        if (this.state.error) {
          this.props.logger('Channel component', 'Error loading channel - rendering error indicator', {
            tags: ['error', 'channelComponent'],
            props: this.props,
            state: this.state,
            error: this.state.error
          });
          core = this.renderLoadingError();
        } else if (this.state.loading) {
          core = this.renderLoading();
        } else if (!this.props.channel || !this.props.channel.watch) {
          core = React__default.createElement(reactNative.View, null, React__default.createElement(reactNative.Text, null, "Channel Missing"));
        } else {
          core = React__default.createElement(KeyboardCompatibleView, {
            enabled: !this.props.disableKeyboardCompatibleView
          }, React__default.createElement(ChannelContext.Provider, {
            value: this.getContext()
          }, React__default.createElement(SuggestionsProvider, {
            handleKeyboardAvoidingViewEnabled: function handleKeyboardAvoidingViewEnabled(trueOrFalse) {
              if (_this2._unmounted) return;

              _this2.setState({
                kavEnabled: trueOrFalse
              });
            }
          }, this.renderComponent())));
        }

        return React__default.createElement(reactNative.View, null, core);
      }
    }]);

    return ChannelInner;
  }(React.PureComponent);

_defineProperty(ChannelInner, "propTypes", {
  /** Which channel to connect to */
  channel: PropTypes.shape({
    watch: PropTypes.func
  }).isRequired,

  /** Client is passed via the Chat Context */
  client: PropTypes.object.isRequired,

  /** The loading indicator to use */
  LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

  /** The indicator to use when there is error  */
  LoadingErrorIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

  /** The indicator to use when message list is empty */
  EmptyStateIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
  isOnline: PropTypes.bool,
  Message: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
  Attachment: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

  /** Override send message request (Advanced usage only) */
  doSendMessageRequest: PropTypes.func,

  /** Override update message request (Advanced usage only) */
  doUpdateMessageRequest: PropTypes.func
});

_defineProperty(ChannelInner, "defaultProps", {
  LoadingIndicator: LoadingIndicator,
  LoadingErrorIndicator: LoadingErrorIndicator,
  EmptyStateIndicator: EmptyStateIndicator,
  emojiData: emojiData,
  logger: function logger() { }
});

var _class$j, _temp$j;
/**
 * Channel - Wrapper component for a channel. It needs to be place inside of the Chat component.
 * ChannelHeader, MessageList, Thread and MessageInput should be used as children of the Channel component.
 *
 * @example ./docs/Channel.md
 * @extends PureComponent
 */

var Channel = withChatContext((_temp$j = _class$j =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(Channel, _PureComponent);

    function Channel(props) {
      var _this;

      _classCallCheck(this, Channel);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Channel).call(this, props));
      _this.state = {
        error: false
      };
      return _this;
    }

    _createClass(Channel, [{
      key: "render",
      value: function render() {
        if (!this.props.channel.cid) {
          return React__default.createElement(reactNative.Text, null, "Please select a channel first");
        }

        return React__default.createElement(ChannelInner, this.props);
      }
    }]);

    return Channel;
  }(React.PureComponent), _defineProperty(_class$j, "propTypes", {
    /** Which channel to connect to */
    channel: PropTypes.shape({
      watch: PropTypes.func
    }).isRequired,

    /** Client is passed via the Chat Context */
    client: PropTypes.object.isRequired,
    isOnline: PropTypes.bool,

    /**
     * Loading indicator UI component. This will be shown on the screen until the messages are
     * being queried from channel. Once the messages are loaded, loading indicator is removed from the screen
     * and replaced with children of the Channel component.
     *
     * Defaults to and accepts same props as: [LoadingIndicator](https://getstream.github.io/stream-chat-react-native/#loadingindicator)
     */
    LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Error indicator UI component. This will be shown on the screen if channel query fails.
     *
     * Defaults to and accepts same props as: [LoadingErrorIndicator](https://getstream.github.io/stream-chat-react-native/#loadingerrorindicator)
     *
     * */
    LoadingErrorIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Empty state indicator UI component. This will be shown on the screen if channel has no messages.
     *
     * Defaults to and accepts same props as: [EmptyStateIndicator](https://getstream.github.io/stream-chat-react-native/#emptystateindicator)
     *
     * */
    EmptyStateIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Message UI component to display a message in message list.
     *
     * Available built-in component (also accepts the same props as): [MessageSimple](https://getstream.github.io/stream-chat-react-native/#messagesimple)
     *
     * */
    Message: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Attachment UI component to display attachment in individual message.
     *
     * Available built-in component (also accepts the same props as): [Attachment](https://getstream.github.io/stream-chat-react-native/#attachment)
     * */
    Attachment: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Override send message request (Advanced usage only)
     * */
    doSendMessageRequest: PropTypes.func,

    /**
     * Override update message request (Advanced usage only)
     * */
    doUpdateMessageRequest: PropTypes.func,

    /**
     * If true, KeyboardCompatibleView wrapper is disabled.
     *
     * Channel component internally uses [KeyboardCompatibleView](https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/KeyboardCompatibleView.js) component
     * internally to adjust the height of Channel component when keyboard is opened or dismissed. This prop gives you ability to disable this functionality, in case if you
     * want to use [KeyboardAvoidingView](https://facebook.github.io/react-native/docs/keyboardavoidingview) or you want to handle keyboard dismissal yourself.
     * KeyboardAvoidingView works well when your component occupies 100% of screen height, otherwise it may raise some issues.
     * */
    disableKeyboardCompatibleView: PropTypes.bool,

    /**
     * Custom wrapper component that handles height adjustment of Channel component when keyboard is opened or dismissed.
     * Defaults to [KeyboardCompatibleView](https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/KeyboardCompatibleView.js)
     *
     * This prop can be used to configure default KeyboardCompatibleView component.
     * e.g.,
     * <Channel
     *  channel={channel}
     *  ...
     *  KeyboardCompatibleView={(props) => {
     *    return (
     *      <KeyboardCompatibleView keyboardDismissAnimationDuration={200} keyboardOpenAnimationDuration={200}>
     *        {props.children}
     *      </KeyboardCompatibleView>
     *    )
     *  }}
     * />
     */
    KeyboardCompatibleView: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType])
  }), _defineProperty(_class$j, "defaultProps", {
    disableKeyboardCompatibleView: false,
    KeyboardCompatibleView: KeyboardCompatibleView
  }), _temp$j));

var _class$k, _temp$k;

function _templateObject2$l() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n"]);

  _templateObject2$l = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$r() {
  var data = _taggedTemplateLiteral(["\n  margin-left: 10px;\n  font-size: ", "px;\n  color: ", ";\n  ", ";\n"]);

  _templateObject$r = function _templateObject() {
    return data;
  };

  return data;
}
var TypingText = styled__default.Text(_templateObject$r(), function (_ref) {
  var theme = _ref.theme;
  return theme.typingIndicator.text.fontSize;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.typingIndicator.text.color;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.typingIndicator.text.css;
});
var Container$j = styled__default.View(_templateObject2$l());
var TypingIndicator = themed((_temp$k = _class$k =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(TypingIndicator, _React$PureComponent);

    function TypingIndicator() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, TypingIndicator);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TypingIndicator)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "constructTypingString", function (dict) {
        var arr2 = Object.keys(dict);
        var arr3 = [];
        arr2.forEach(function (item, i) {
          if (_this.props.client.user.id === dict[arr2[i]].user.id) {
            return;
          }

          arr3.push(dict[arr2[i]].user.name || dict[arr2[i]].user.id);
        });
        var outStr = '';

        if (arr3.length === 1) {
          outStr = arr3[0] + ' is typing...';
        } else if (arr3.length === 2) {
          //joins all with "and" but =no commas
          //example: "bob and sam"
          outStr = arr3.join(' and ') + ' are typing...';
        } else if (arr3.length > 2) {
          //joins all with commas, but last one gets ", and" (oxford comma!)
          //example: "bob, joe, and sam"
          outStr = arr3.slice(0, -1).join(', ') + ', and ' + arr3.slice(-1) + ' are typing...';
        }

        return outStr;
      });

      return _this;
    }

    _createClass(TypingIndicator, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var typing = Object.values(this.props.typing);
        return React__default.createElement(Container$j, null, typing.filter(function (_ref4) {
          var user = _ref4.user;
          return user.id !== _this2.props.client.user.id;
        }).map(function (_ref5, idx) {
          var user = _ref5.user;
          return React__default.createElement(Avatar, {
            image: user.image,
            size: 24,
            name: user.name || user.id,
            key: user.id + idx
          });
        }), React__default.createElement(TypingText, null, this.constructTypingString(this.props.typing)));
      }
    }]);

    return TypingIndicator;
  }(React__default.PureComponent), _defineProperty(_class$k, "themePath", 'typingIndicator'), _temp$k));

var _class$l, _temp$l;

function _templateObject4$c() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 0;\n  height: 30px;\n  width: 100%;\n  padding-left: 16px;\n  padding-top: 3px;\n  padding-bottom: 3px;\n  ", "\n"]);

  _templateObject4$c = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$g() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 10;\n  margin-bottom: 0;\n  padding: 5px;\n  color: red;\n  background-color: #fae6e8;\n  ", "\n"]);

  _templateObject3$g = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$m() {
  var data = _taggedTemplateLiteral(["\n  color: red;\n  background-color: #fae6e8;\n  ", "\n"]);

  _templateObject2$m = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$s() {
  var data = _taggedTemplateLiteral(["\n  flex: 1;\n  width: 100%;\n  padding-left: 10px;\n  padding-right: 10px;\n  ", "\n"]);

  _templateObject$s = function _templateObject() {
    return data;
  };

  return data;
}
var ListContainer = styled__default.FlatList(_templateObject$s(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageList.listContainer.css;
});
var ErrorNotificationText = styled__default.Text(_templateObject2$m(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageList.errorNotificationText.css;
});
var ErrorNotification = styled__default.View(_templateObject3$g(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.messageList.errorNotification.css;
});
var TypingIndicatorContainer = styled__default.View(_templateObject4$c(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.messageList.typingIndicatorContainer.css;
});
/**
 * MessageList - The message list component renders a list of messages.
 * Its a consumer of [Channel Context](https://getstream.github.io/stream-chat-react-native/#channel)
 *
 * @example ./docs/MessageList.md
 * @extends PureComponent
 */

var MessageList = withChannelContext((_temp$l = _class$l =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(MessageList, _PureComponent);

    function MessageList(props) {
      var _this;

      _classCallCheck(this, MessageList);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageList).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "insertDates", function (messages) {
        var newMessages = [];

        if (messages.length === 0) {
          _this.props.eventHistory && _this.props.eventHistory.none && _this.props.eventHistory.none.forEach(function (e) {
            newMessages.push({
              type: 'channel.event',
              event: e
            });
          });
          return newMessages;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = messages.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
              i = _step$value[0],
              message = _step$value[1];

            if (message.type === 'message.read' || message.deleted_at) {
              newMessages.push(message);
              continue;
            }

            var messageDate = message.created_at.getDay();
            var prevMessageDate = messageDate;

            if (i < messages.length - 1) {
              prevMessageDate = messages[i + 1].created_at.getDay();
            }

            if (i === 0) {
              newMessages.push({
                type: 'message.date',
                date: message.created_at
              }, message);
            } else if (messageDate !== prevMessageDate) {
              newMessages.push(message, {
                type: 'message.date',
                date: messages[i + 1].created_at
              });
            } else {
              newMessages.push(message);
            }

            var eventsNextToMessage = _this.props.eventHistory[message.id];

            if (eventsNextToMessage && eventsNextToMessage.length > 0) {
              eventsNextToMessage.forEach(function (e) {
                newMessages.push({
                  type: 'channel.event',
                  event: e
                });
              });
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return newMessages;
      });

      _defineProperty(_assertThisInitialized(_this), "getGroupStyles", function (m) {
        var l = m.length;
        var messageGroupStyles = {};

        var messages = _toConsumableArray(m);

        for (var i = 0; i < l; i++) {
          var previousMessage = messages[i - 1];
          var message = messages[i];
          var nextMessage = messages[i + 1];
          var groupStyles = [];

          if (message.type === 'channel.event') {
            continue;
          }

          if (message.type === 'message.date') {
            continue;
          }

          var userId = message.user ? message.user.id : null;
          var isTopMessage = !previousMessage || previousMessage.type === 'message.date' || previousMessage.type === 'system' || previousMessage.type === 'channel.event' || previousMessage.attachments && previousMessage.attachments.length !== 0 || userId !== previousMessage.user.id || previousMessage.type === 'error' || previousMessage.deleted_at;
          var isBottomMessage = !nextMessage || nextMessage.type === 'message.date' || nextMessage.type === 'system' || nextMessage.type === 'channel.event' || nextMessage.attachments && nextMessage.attachments.length !== 0 || userId !== nextMessage.user.id || nextMessage.type === 'error' || nextMessage.deleted_at;

          if (isTopMessage) {
            groupStyles.push('top');
          }

          if (isBottomMessage) {
            if (isTopMessage || message.deleted_at || message.type === 'error') {
              groupStyles.splice(0, groupStyles.length);
              groupStyles.push('single');
            } else {
              groupStyles.push('bottom');
            }
          }

          if (!isTopMessage && !isBottomMessage) {
            if (message.deleted_at || message.type === 'error') {
              groupStyles.splice(0, groupStyles.length);
              groupStyles.push('single');
            } else {
              groupStyles.splice(0, groupStyles.length);
              groupStyles.push('middle');
            }
          }

          if (message.attachments.length !== 0) {
            groupStyles.splice(0, groupStyles.length);
            groupStyles.push('single');
          }

          if (_this.props.noGroupByUser) {
            groupStyles.splice(0, groupStyles.length);
            groupStyles.push('single');
          }

          messageGroupStyles[message.id] = groupStyles;
        }

        return messageGroupStyles;
      });

      _defineProperty(_assertThisInitialized(_this), "goToNewMessages", function () {
        _this.setState({
          newMessagesNotification: false
        });

        _this.flatList.scrollToIndex({
          index: 0
        });

        if (!_this.props.threadList) _this.props.markRead();
      });

      _defineProperty(_assertThisInitialized(_this), "getLastReceived", function (messages) {
        var l = messages.length;
        var lastReceivedId = null;

        for (var i = l; i > 0; i--) {
          if (messages[i] !== undefined && messages[i].status !== undefined && messages[i].status === 'received') {
            lastReceivedId = messages[i].id;
            break;
          }
        }

        if (_this.state.lastReceivedId !== lastReceivedId) {
          _this.setState({
            lastReceivedId: lastReceivedId
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "getReadStates", function (messages) {
        // create object with empty array for each message id
        var readData = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = messages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var message = _step2.value;
            readData[message.id] = [];
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        for (var _i = 0, _Object$values = Object.values(_this.props.read); _i < _Object$values.length; _i++) {
          var readState = _Object$values[_i];

          if (readState.last_read == null) {
            break;
          }

          var userLastReadMsgId = void 0;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = messages[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var msg = _step3.value;

              if (msg.updated_at < readState.last_read) {
                userLastReadMsgId = msg.id;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          if (userLastReadMsgId != null) {
            readData[userLastReadMsgId] = [].concat(_toConsumableArray(readData[userLastReadMsgId]), [readState.user]);
          }
        }

        return readData;
      });

      _defineProperty(_assertThisInitialized(_this), "renderItem", function (message, groupStyles) {
        if (message.type === 'message.date') {
          var _DateSeparator = _this.props.dateSeparator || _this.props.DateSeparator;

          return React__default.createElement(_DateSeparator, {
            message: message
          });
        } else if (message.type === 'channel.event') {
          var _EventIndicator = _this.props.eventIndicator || _this.props.EventIndicator;

          return React__default.createElement(_EventIndicator, {
            event: message.event
          });
        } else if (message.type !== 'message.read') {
          var readBy = _this.readData[message.id] || [];
          return React__default.createElement(Message, {
            client: _this.props.client,
            channel: _this.props.channel,
            onThreadSelect: _this.props.onThreadSelect,
            message: message,
            groupStyles: groupStyles,
            Message: _this.props.Message,
            Attachment: _this.props.Attachment,
            readBy: readBy,
            lastReceivedId: _this.state.lastReceivedId === message.id ? _this.state.lastReceivedId : null,
            onMessageTouch: _this.props.onMessageTouch,
            dismissKeyboardOnMessageTouch: _this.props.dismissKeyboardOnMessageTouch,
            setEditingState: _this.props.setEditingState,
            editing: _this.props.editing,
            threadList: _this.props.threadList,
            messageActions: _this.props.messageActions,
            updateMessage: _this.props.updateMessage,
            removeMessage: _this.props.removeMessage,
            retrySendMessage: _this.props.retrySendMessage,
            openThread: _this.props.openThread,
            emojiData: _this.props.emojiData,
            actionSheetStyles: _this.props.actionSheetStyles,
            AttachmentFileIcon: _this.props.AttachmentFileIcon
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "handleScroll", function (event) {
        var yOffset = event.nativeEvent.contentOffset.y;
        var removeNewMessageNotification = yOffset <= 0;
        if (!_this.props.threadList && removeNewMessageNotification && _this.props.channel.countUnread() > 0) _this.props.markRead();
        _this.yOffset = yOffset;

        _this.setState(function (prevState) {
          return {
            newMessagesNotification: removeNewMessageNotification ? false : prevState.newMessagesNotification
          };
        });
      });

      _defineProperty(_assertThisInitialized(_this), "renderEmptyState", function () {
        var Indicator = _this.props.EmptyStateIndicator;
        return React__default.createElement(Indicator, {
          listType: "message"
        });
      });

      _this.state = {
        newMessagesNotification: false,
        online: props.online
      };
      _this.yOffset = 0;
      return _this;
    }

    _createClass(MessageList, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.props.online !== prevProps.online) {
          this.setState({
            online: this.props.online
          });
        } // handle new messages being sent/received


        var currentLastMessage = this.props.messages[this.props.messages.length - 1];
        var previousLastMessage = prevProps.messages[prevProps.messages.length - 1];

        if (!previousLastMessage || !currentLastMessage) {
          return;
        }

        var hasNewMessage = currentLastMessage.id !== previousLastMessage.id;
        var userScrolledUp = this.yOffset > 0;
        var isOwner = currentLastMessage.user.id === this.props.client.userID;
        var scrollToBottom = false; // always scroll down when it's your own message that you added...

        if (hasNewMessage && isOwner) {
          scrollToBottom = true;
        } else if (hasNewMessage && !userScrolledUp) {
          scrollToBottom = true;
        } // Check the scroll position... if you're scrolled up show a little notification


        if (!scrollToBottom && hasNewMessage && !this.state.newMessagesNotification) {
          this.setState({
            newMessagesNotification: true
          });
        }

        if (scrollToBottom) {
          this.flatList.scrollToIndex({
            index: 0
          });
        } // remove the scroll notification if we already scrolled down...


        if (scrollToBottom && this.state.newMessagesNotification) {
          this.setState({
            newMessagesNotification: false
          });
        }

        this.getLastReceived(this.props.messages);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var hasEventHistory = this.props.eventHistory && Object.keys(this.props.eventHistory).length > 0; // We can't provide ListEmptyComponent to FlatList when inverted flag is set.
        // https://github.com/facebook/react-native/issues/21196

        if (this.props.messages && this.props.messages.length === 0 && !hasEventHistory && !this.props.threadList) {
          return React__default.createElement(reactNative.View, {
            style: {
              flex: 1
            }
          }, this.renderEmptyState());
        }

        var TypingIndicator$$1 = this.props.TypingIndicator;
        var HeaderComponent = this.props.headerComponent || this.props.HeaderComponent;
        var messagesWithDates = this.insertDates(this.props.messages);
        var messageGroupStyles = this.getGroupStyles(messagesWithDates);
        this.readData = this.getReadStates(messagesWithDates);
        messagesWithDates.reverse();
        var typing = Object.values(this.props.typing);
        var showTypingIndicator;

        if (typing.length === 0 || typing.length === 1 && typing[0].user.id === this.props.client.user.id) {
          showTypingIndicator = false;
        } else {
          showTypingIndicator = true;
        }

        return React__default.createElement(React__default.Fragment, null, // Mask for edit state
          this.props.editing && this.props.disableWhileEditing && React__default.createElement(reactNative.TouchableOpacity, {
            style: {
              position: 'absolute',
              backgroundColor: 'black',
              opacity: 0.4,
              height: '100%',
              width: '100%',
              zIndex: 100
            },
            collapsable: false,
            onPress: this.props.clearEditingState
          }), React__default.createElement(reactNative.View, {
            collapsable: false,
            style: {
              flex: 1,
              alignItems: 'center',
              width: '100%'
            }
          }, React__default.createElement(ListContainer, _extends({
            ref: function ref(fl) {
              return _this2.flatList = fl;
            },
            data: messagesWithDates,
            onScroll: this.handleScroll,
            ListFooterComponent: HeaderComponent,
            onEndReached: this.props.loadMore,
            inverted: true,
            keyboardShouldPersistTaps: "always",
            keyExtractor: function keyExtractor(item) {
              return item.id || item.created_at || (item.date ? item.date.toISOString() : false) || uuidv4();
            },
            renderItem: function renderItem(_ref5) {
              var message = _ref5.item;
              return _this2.renderItem(message, messageGroupStyles[message.id]);
            },
            maintainVisibleContentPosition: {
              minIndexForVisible: 1,
              autoscrollToTopThreshold: 10
            }
          }, this.props.additionalFlatListProps)), this.props.TypingIndicator && showTypingIndicator && React__default.createElement(TypingIndicatorContainer, null, React__default.createElement(TypingIndicator$$1, {
            typing: this.props.typing,
            client: this.props.client
          })), this.state.newMessagesNotification && React__default.createElement(MessageNotification, {
            showNotification: this.state.newMessagesNotification,
            onPress: this.goToNewMessages
          }), !this.state.online && React__default.createElement(ErrorNotification, null, React__default.createElement(ErrorNotificationText, null, "Connection failure, reconnecting now ..."))));
      }
    }]);

    return MessageList;
  }(React.PureComponent), _defineProperty(_class$l, "propTypes", {
    /** Turn off grouping of messages by user */
    noGroupByUser: PropTypes.bool,

    /**
     * Array of allowed actions on message. e.g. ['edit', 'delete', 'mute', 'flag']
     * If all the actions need to be disabled, empty array or false should be provided as value of prop.
     * */
    messageActions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),

    /**
     * Boolean weather current message list is a thread.
     */
    threadList: PropTypes.bool,

    /** **Available from [chat context](https://getstream.github.io/stream-chat-react-native/#chatcontext)** */
    client: PropTypes.object,

    /** **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)** */
    Attachment: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Custom UI component for attachment icon for type 'file' attachment.
     * Defaults to: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/FileIcon.js
     */
    AttachmentFileIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)** */
    Message: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)** */
    messages: PropTypes.array.isRequired,

    /** **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)** */
    read: PropTypes.object,

    /** **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)** */
    typing: PropTypes.object,

    /** Network status */
    online: PropTypes.bool,
    disableWhileEditing: PropTypes.bool,

    /**
     * For flatlist
     * @see See loeadMoreThreshold [doc](https://facebook.github.io/react-native/docs/flatlist#onendreachedthreshold)
     * */
    loadMoreThreshold: PropTypes.number,

    /**
     * Callback for onPress event on Message component
     *
     * @param e       Event object for onPress event
     * @param message Message object which was pressed
     *
     * */
    onMessageTouch: PropTypes.func,

    /** Should keyboard be dismissed when messaged is touched */
    dismissKeyboardOnMessageTouch: PropTypes.bool,
    eventHistory: PropTypes.object,

    /** Helper function to mark current channel as read. */
    markRead: PropTypes.func,

    /**
     * Handler to open the thread on message. This is callback for touch event for replies button.
     *
     * @param message A message object to open the thread upon.
     * */
    onThreadSelect: PropTypes.func,

    /**
     *  This method gets called when user selects edit action on some message. On code level it just sets `editing` property in state to message being edited
     *
     * @param message A [message object](https://getstream.io/chat/docs/#message_format) which is being edited
     */
    setEditingState: PropTypes.func,

    /** Function to clear the editing state. */
    clearEditingState: PropTypes.func,

    /**
     * A message object which is currently in edit state.
     */
    editing: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    loadMore: PropTypes.func,

    /**
     * Typing indicator UI component to render
     *
     * Defaults to and accepts same props as: [TypingIndicator](https://getstream.github.io/stream-chat-react-native/#typingindicator)
     * */
    TypingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * @deprecated User DateSeperator instead.
     * Date separator UI component to render
     *
     * Defaults to and accepts same props as: [DateSeparator](https://getstream.github.io/stream-chat-react-native/#dateseparator)
     * */
    dateSeparator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Date separator UI component to render
     *
     * Defaults to and accepts same props as: [DateSeparator](https://getstream.github.io/stream-chat-react-native/#dateseparator)
     * */
    DateSeparator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * @deprecated User EventIndicator instead.
     *
     * UI Component to display following events in messagelist
     *
     * 1. member.added
     * 2. member.removed
     *
     * Defaults to and accepts same props as: [EventIndicator](https://getstream.github.io/stream-chat-react-native/#eventindicator)
     * */
    eventIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * UI Component to display following events in messagelist
     *
     * 1. member.added
     * 2. member.removed
     *
     * Defaults to and accepts same props as: [EventIndicator](https://getstream.github.io/stream-chat-react-native/#eventindicator)
     * */
    EventIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** UI component for empty message list */
    EmptyStateIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * @deprecated Use HeaderComponent instead.
     *
     * UI component for header of message list.
     */
    headerComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * UI component for header of message list. By default message list doesn't have any header.
     * This is basically a [ListFooterComponent](https://facebook.github.io/react-native/docs/flatlist#listheadercomponent) of FlatList
     * used in MessageList. Its footer instead of header, since message list is inverted.
     *
     */
    HeaderComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Style object for actionsheet (used to message actions).
     * Supported styles: https://github.com/beefe/react-native-actionsheet/blob/master/lib/styles.js
     */
    actionSheetStyles: PropTypes.object,

    /**
     * Besides existing (default) UX behaviour of underlying flatlist of MessageList component, if you want
     * to attach some additional props to un derlying flatlist, you can add it to following prop.
     *
     * You can find list of all the available FlatList props here - https://facebook.github.io/react-native/docs/flatlist#props
     *
     * e.g.
     * ```
     * <MessageList
     *  additionalFlatListProps={{ bounces: true, keyboardDismissMode: true }} />
     * ```
     */
    additionalFlatListProps: PropTypes.object
  }), _defineProperty(_class$l, "defaultProps", {
    DateSeparator: DateSeparator,
    EventIndicator: EventIndicator,
    disableWhileEditing: true,
    // https://github.com/facebook/react-native/blob/a7a7970e543959e9db5281914d5f132beb01db8d/Libraries/Lists/VirtualizedList.js#L466
    loadMoreThreshold: 2,
    messageGrouping: true,
    additionalFlatListProps: {},
    dismissKeyboardOnMessageTouch: true,
    TypingIndicator: TypingIndicator
  }), _temp$l));

const img$h = require('.//images/icons/icon_edit.png');

const img$i = require('.//images/icons/icon_new_message.png');

var _class$m, _temp$m;

function _templateObject2$n() {
  var data = _taggedTemplateLiteral(["\n  width: 15;\n  height: 15;\n  ", "\n"]);

  _templateObject2$n = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$t() {
  var data = _taggedTemplateLiteral(["\n  margin-left: 8;\n  ", "\n"]);

  _templateObject$t = function _templateObject() {
    return data;
  };

  return data;
}
var Container$k = styled__default.TouchableOpacity(_templateObject$t(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageInput.sendButton.css;
});
var SendButtonIcon = styled__default.Image(_templateObject2$n(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageInput.sendButtonIcon.css;
});
/**
 * UI Component for send button in MessageInput component.
 *
 * @extends PureComponent
 * @example ./docs/SendButton.md
 */

var SendButton = themed((_temp$m = _class$m =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(SendButton, _React$PureComponent);

    function SendButton() {
      _classCallCheck(this, SendButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(SendButton).apply(this, arguments));
    }

    _createClass(SendButton, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          sendMessage = _this$props.sendMessage,
          editing = _this$props.editing,
          title = _this$props.title;
        return React__default.createElement(Container$k, {
          title: title,
          onPress: sendMessage
        }, editing ? React__default.createElement(SendButtonIcon, {
          source: img$h
        }) : React__default.createElement(SendButtonIcon, {
          source: img$i
        }));
      }
    }]);

    return SendButton;
  }(React__default.PureComponent), _defineProperty(_class$m, "themePath", 'messageInput'), _defineProperty(_class$m, "propTypes", {
    title: PropTypes.string,

    /** @see See [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    editing: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

    /** Function that sends message */
    sendMessage: PropTypes.func.isRequired
  }), _temp$m));

const img$j = require('.//images/icons/plus-outline.png');

var _class$n, _temp$n;

function _templateObject2$o() {
  var data = _taggedTemplateLiteral(["\n  width: 15;\n  height: 15;\n  ", "\n"]);

  _templateObject2$o = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$u() {
  var data = _taggedTemplateLiteral(["\n  margin-right: 8;\n  ", "\n"]);

  _templateObject$u = function _templateObject() {
    return data;
  };

  return data;
}
var Container$l = styled__default.TouchableOpacity(_templateObject$u(), function (_ref) {
  var theme = _ref.theme;
  return theme.messageInput.attachButton.css;
});
var AttachButtonIcon = styled__default.Image(_templateObject2$o(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.messageInput.attachButtonIcon.css;
});
/**
 * UI Component for attach button in MessageInput component.
 *
 * @extends PureComponent
 * @example ./docs/AttachButton.md
 */

var AttachButton = themed((_temp$n = _class$n =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(AttachButton, _React$PureComponent);

    function AttachButton() {
      _classCallCheck(this, AttachButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(AttachButton).apply(this, arguments));
    }

    _createClass(AttachButton, [{
      key: "render",
      value: function render() {
        var handleOnPress = this.props.handleOnPress;
        return React__default.createElement(Container$l, {
          onPress: handleOnPress
        }, React__default.createElement(AttachButtonIcon, {
          source: img$j
        }));
      }
    }]);

    return AttachButton;
  }(React__default.PureComponent), _defineProperty(_class$n, "themePath", 'messageInput'), _defineProperty(_class$n, "propTypes", {
    handleOnPress: PropTypes.func
  }), _temp$n));

const img$k = require('.//images/icons/icon_attach-media.png');

const img$l = require('.//images/icons/icon_folder.png');

const img$m = require('.//images/icons/icon_close.png');

var _class$o, _temp$o;

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject6$3() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n"]);

  _templateObject6$3 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$8() {
  var data = _taggedTemplateLiteral(["\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  width: 100%;\n  padding-left: 20;\n  ", ";\n"]);

  _templateObject5$8 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$d() {
  var data = _taggedTemplateLiteral(["\n  font-weight: bold;\n  ", ";\n"]);

  _templateObject4$d = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$h() {
  var data = _taggedTemplateLiteral(["\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n  padding-left: 20;\n  padding-right: 20;\n  ", ";\n"]);

  _templateObject3$h = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$p() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  padding-left: 10px;\n  padding-right: 10px;\n  min-height: 46;\n  margin: 10px;\n  align-items: center;\n  ", "\n"]);

  _templateObject2$p = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$v() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  border-radius: 10;\n  background-color: rgba(0, 0, 0, 0.05);\n  padding-top: ", "px;\n  margin-left: 10px;\n  margin-right: 10px;\n  ", "\n"]);

  _templateObject$v = function _templateObject() {
    return data;
  };

  return data;
}

function generateRandomId() {
  // prettier-ignore
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function S4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}

var Container$m = styled__default(function (_ref) {
  var padding = _ref.padding,
    rest = _objectWithoutProperties(_ref, ["padding"]);

  return React__default.createElement(reactNative.View, rest);
})(_templateObject$v(), function (_ref2) {
  var theme = _ref2.theme,
    padding = _ref2.padding;
  return padding ? theme.messageInput.container.conditionalPadding : 0;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.messageInput.container.css;
});
var InputBoxContainer = styled__default.View(_templateObject2$p(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.messageInput.inputBoxContainer.css;
});
var ActionSheetTitleContainer$1 = styled__default.View(_templateObject3$h(), function (_ref5) {
  var theme = _ref5.theme;
  return theme.messageInput.actionSheet.titleContainer.css;
});
var ActionSheetTitleText$1 = styled__default.Text(_templateObject4$d(), function (_ref6) {
  var theme = _ref6.theme;
  return theme.messageInput.actionSheet.titleText.css;
});
var ActionSheetButtonContainer$1 = styled__default.View(_templateObject5$8(), function (_ref7) {
  var theme = _ref7.theme;
  return theme.messageInput.actionSheet.buttonContainer.css;
});
var ActionSheetButtonText$1 = styled__default.Text(_templateObject6$3(), function (_ref8) {
  var theme = _ref8.theme;
  return theme.messageInput.actionSheet.buttonText.css;
});
/**
 * UI Component for message input
 * Its a consumer of [Channel Context](https://getstream.github.io/stream-chat-react-native/#channelcontext)
 * and [Keyboard Context](https://getstream.github.io/stream-chat-react-native/#keyboardcontext)
 *
 * @example ./docs/MessageInput.md
 * @extends PureComponent
 */

var MessageInput = withKeyboardContext(withSuggestionsContext(withChannelContext(themed((_temp$o = _class$o =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(MessageInput, _PureComponent);

    function MessageInput(props) {
      var _this;

      _classCallCheck(this, MessageInput);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageInput).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "getMessageDetailsForState", function (message) {
        var imageOrder = [];
        var imageUploads = {};
        var fileOrder = [];
        var fileUploads = {};
        var attachments = [];
        var mentioned_users = [];
        var text = '';

        if (message) {
          text = message.text;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = message.attachments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var attach = _step.value;

              if (attach.type === 'image') {
                var id = generateRandomId();
                imageOrder.push(id);
                imageUploads[id] = {
                  id: id,
                  url: attach.image_url,
                  state: 'finished',
                  file: {
                    name: attach.fallback
                  }
                };
              } else if (attach.type === 'file') {
                var _id2 = generateRandomId();

                fileOrder.push(_id2);
                fileUploads[_id2] = {
                  id: _id2,
                  url: attach.asset_url,
                  state: 'finished',
                  file: {
                    name: attach.title,
                    type: attach.mime_type,
                    size: attach.file_size
                  }
                };
              } else {
                attachments.push(attach);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (message.mentioned_users) {
            mentioned_users = _toConsumableArray(message.mentioned_users);
          }
        }

        return {
          text: text,
          attachments: attachments,
          imageOrder: imageOrder,
          imageUploads: Immutable(imageUploads),
          fileOrder: fileOrder,
          fileUploads: Immutable(fileUploads),
          mentioned_users: mentioned_users,
          numberOfUploads: 0
        };
      });

      _defineProperty(_assertThisInitialized(_this), "getUsers", function () {
        var users = [];
        var members = _this.props.members;
        var watchers = _this.props.watchers;

        if (members && Object.values(members).length) {
          Object.values(members).forEach(function (member) {
            return users.push(member.user);
          });
        }

        if (watchers && Object.values(watchers).length) {
          users.push.apply(users, _toConsumableArray(Object.values(watchers)));
        } // make sure we don't list users twice


        var userMap = {};

        for (var _i = 0, _users = users; _i < _users.length; _i++) {
          var user = _users[_i];

          if (user !== undefined && !userMap[user.id]) {
            userMap[user.id] = user;
          }
        }

        var usersArray = Object.values(userMap);
        return usersArray;
      });

      _defineProperty(_assertThisInitialized(_this), "onSelectItem", function (item) {
        _this.setState(function (prevState) {
          return {
            mentioned_users: [].concat(_toConsumableArray(prevState.mentioned_users), [item.id])
          };
        });
      });

      _defineProperty(_assertThisInitialized(_this), "sendMessage", function () {
        var attachments = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _this.state.imageOrder[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var id = _step2.value;
            var image = _this.state.imageUploads[id];

            if (!image || image.state === FileState.UPLOAD_FAILED) {
              continue;
            }

            if (image.state === FileState.UPLOADING) {
              // TODO: show error to user that they should wait until image is uploaded
              return;
            }

            attachments.push({
              type: 'image',
              image_url: image.url,
              fallback: image.file.name
            });
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _this.state.fileOrder[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _id3 = _step3.value;
            var upload = _this.state.fileUploads[_id3];

            if (!upload || upload.state === FileState.UPLOAD_FAILED) {
              continue;
            }

            if (upload.state === FileState.UPLOADING) {
              // TODO: show error to user that they should wait until image is uploaded
              return;
            }

            attachments.push({
              type: 'file',
              asset_url: upload.url,
              title: upload.file.name,
              mime_type: upload.file.type,
              file_size: upload.file.size
            });
          } // Disallow sending message if its empty.

        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        if (!_this.state.text && attachments.length === 0) return;

        if (_this.props.editing) {
          var updatedMessage = _objectSpread$5({}, _this.props.editing);

          updatedMessage.text = _this.state.text;
          updatedMessage.attachments = attachments;
          updatedMessage.mentioned_users = _this.state.mentioned_users.map(function (mu) {
            return mu.id;
          }); // TODO: Remove this line and show an error when submit fails

          _this.props.clearEditingState();

          var updateMessagePromise = _this.props.editMessage(updatedMessage).then(_this.props.clearEditingState);

          streamChat.logChatPromiseExecution(updateMessagePromise, 'update message');
        } else {
          try {
            _this.props.sendMessage({
              text: _this.state.text,
              parent: _this.props.parent,
              mentioned_users: uniq(_this.state.mentioned_users),
              attachments: attachments
            });

            _this.setState({
              text: '',
              imageUploads: Immutable({}),
              imageOrder: Immutable([]),
              fileUploads: Immutable({}),
              fileOrder: Immutable([]),
              mentioned_users: []
            });
          } catch (err) {
            console.log('Fialed');
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "updateMessage",
        /*#__PURE__*/
        _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee() {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return _this.props.client.editMessage(_objectSpread$5({}, _this.props.editing, {
                      text: _this.state.text
                    }));

                  case 3:
                    _this.setState({
                      text: ''
                    });

                    _this.props.clearEditingState();

                    _context.next = 10;
                    break;

                  case 7:
                    _context.prev = 7;
                    _context.t0 = _context["catch"](0);
                    console.log(_context.t0);

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[0, 7]]);
          })));

      _defineProperty(_assertThisInitialized(_this), "constructTypingString", function (dict) {
        var arr2 = Object.keys(dict);
        var arr3 = [];
        arr2.forEach(function (item, i) {
          if (_this.props.client.user.id === dict[arr2[i]].user.id) {
            return;
          }

          arr3.push(dict[arr2[i]].user.name || dict[arr2[i]].user.id);
        });
        var outStr = '';

        if (arr3.length === 1) {
          outStr = arr3[0] + ' is typing...';
        } else if (arr3.length === 2) {
          //joins all with "and" but =no commas
          //example: "bob and sam"
          outStr = arr3.join(' and ') + ' are typing...';
        } else if (arr3.length > 2) {
          //joins all with commas, but last one gets ", and" (oxford comma!)
          //example: "bob, joe, and sam"
          outStr = arr3.slice(0, -1).join(', ') + ', and ' + arr3.slice(-1) + ' are typing...';
        }

        return outStr;
      });

      _defineProperty(_assertThisInitialized(_this), "_pickFile",
        /*#__PURE__*/
        _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee2() {
            var result, mimeType;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(_this.props.maxNumberOfFiles && _this.state.numberOfUploads >= _this.props.maxNumberOfFiles)) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt("return");

                  case 2:
                    _context2.next = 4;
                    return pickDocument();

                  case 4:
                    result = _context2.sent;

                    if (!(result.type === 'cancel' || result.cancelled)) {
                      _context2.next = 7;
                      break;
                    }

                    return _context2.abrupt("return");

                  case 7:
                    mimeType = mimeTypes.lookup(result.name);

                    if (mimeType.startsWith('image/')) {
                      _this.uploadNewImage(result);
                    } else {
                      _this.uploadNewFile(result);
                    }

                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          })));

      _defineProperty(_assertThisInitialized(_this), "uploadNewFile", function (file) {
        var id = generateRandomId();
        var mimeType = mimeTypes.lookup(file.name);
        /* eslint-disable */

        _this.setState(function (prevState) {
          return {
            numberOfUploads: prevState.numberOfUploads + 1,
            fileOrder: prevState.fileOrder.concat([id]),
            fileUploads: prevState.fileUploads.setIn([id], {
              id: id,
              file: _objectSpread$5({}, file, {
                type: mimeType
              }),
              state: FileState.UPLOADING
            })
          };
        });
        /* eslint-enable */


        _this._uploadFile(id);
      });

      _defineProperty(_assertThisInitialized(_this), "_uploadFile",
        /*#__PURE__*/
        function () {
          var _ref11 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee3(id) {
              var doc, file, response;
              return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      doc = _this.state.fileUploads[id];

                      if (doc) {
                        _context3.next = 3;
                        break;
                      }

                      return _context3.abrupt("return");

                    case 3:
                      file = doc.file;
                      _context3.next = 6;
                      return _this.setState(function (prevState) {
                        return {
                          fileUploads: prevState.fileUploads.setIn([id, 'state'], FileState.UPLOADING)
                        };
                      });

                    case 6:
                      response = {};
                      response = {};
                      _context3.prev = 8;

                      if (!_this.props.doDocUploadRequest) {
                        _context3.next = 15;
                        break;
                      }

                      _context3.next = 12;
                      return _this.props.doDocUploadRequest(file, _this.props.channel);

                    case 12:
                      response = _context3.sent;
                      _context3.next = 18;
                      break;

                    case 15:
                      _context3.next = 17;
                      return _this.props.channel.sendFile(file.uri);

                    case 17:
                      response = _context3.sent;

                    case 18:
                      _context3.next = 26;
                      break;

                    case 20:
                      _context3.prev = 20;
                      _context3.t0 = _context3["catch"](8);
                      console.warn(_context3.t0);
                      _context3.next = 25;
                      return _this.setState(function (prevState) {
                        var image = prevState.fileUploads[id];

                        if (!image) {
                          return {
                            numberOfUploads: prevState.numberOfUploads - 1
                          };
                        }

                        return {
                          fileUploads: prevState.fileUploads.setIn([id, 'state'], FileState.UPLOAD_FAILED),
                          numberOfUploads: prevState.numberOfUploads - 1
                        };
                      });

                    case 25:
                      return _context3.abrupt("return");

                    case 26:
                      _this.setState(function (prevState) {
                        return {
                          fileUploads: prevState.fileUploads.setIn([id, 'state'], FileState.UPLOADED).setIn([id, 'url'], response.file)
                        };
                      });

                    case 27:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, null, [[8, 20]]);
            }));

          return function (_x) {
            return _ref11.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "_pickImage",
        /*#__PURE__*/
        _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee4() {
            var result;
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!(_this.props.maxNumberOfFiles && _this.state.numberOfUploads >= _this.props.maxNumberOfFiles)) {
                      _context4.next = 2;
                      break;
                    }

                    return _context4.abrupt("return");

                  case 2:
                    _context4.next = 4;
                    return pickImage();

                  case 4:
                    result = _context4.sent;

                    if (!result.cancelled) {
                      _context4.next = 7;
                      break;
                    }

                    return _context4.abrupt("return");

                  case 7:
                    _this.uploadNewImage(result);

                  case 8:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          })));

      _defineProperty(_assertThisInitialized(_this), "uploadNewImage", function (image) {
        var id = generateRandomId();
        /* eslint-disable */

        _this.setState(function (prevState) {
          return {
            numberOfUploads: prevState.numberOfUploads + 1,
            imageOrder: prevState.imageOrder.concat([id]),
            imageUploads: prevState.imageUploads.setIn([id], {
              id: id,
              file: image,
              state: FileState.UPLOADING
            })
          };
        });
        /* eslint-enable */


        _this._uploadImage(id);
      });

      _defineProperty(_assertThisInitialized(_this), "_removeImage", function (id) {
        _this.setState(function (prevState) {
          var img = prevState.imageUploads[id];

          if (!img) {
            return {};
          }

          return {
            numberOfUploads: prevState.numberOfUploads - 1,
            imageUploads: prevState.imageUploads.set(id, undefined),
            // remove
            imageOrder: prevState.imageOrder.filter(function (_id) {
              return id !== _id;
            })
          };
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_removeFile", function (id) {
        _this.setState(function (prevState) {
          var file = prevState.fileUploads[id];

          if (!file) {
            return {};
          }

          return {
            numberOfUploads: prevState.numberOfUploads - 1,
            fileUploads: prevState.fileUploads.set(id, undefined),
            // remove
            fileOrder: prevState.fileOrder.filter(function (_id) {
              return id !== _id;
            })
          };
        });
      });

      _defineProperty(_assertThisInitialized(_this), "_uploadImage",
        /*#__PURE__*/
        function () {
          var _ref13 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee5(id) {
              var img, file, response, filename, contentType;
              return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      img = _this.state.imageUploads[id];

                      if (img) {
                        _context5.next = 3;
                        break;
                      }

                      return _context5.abrupt("return");

                    case 3:
                      file = img.file;
                      _context5.next = 6;
                      return _this.setState(function (prevState) {
                        return {
                          imageUploads: prevState.imageUploads.setIn([id, 'state'], FileState.UPLOADING)
                        };
                      });

                    case 6:
                      response = {};
                      response = {};
                      filename = (file.name || file.uri).replace(/^(file:\/\/|content:\/\/)/, '');
                      contentType = mimeTypes.lookup(filename) || 'application/octet-stream';
                      _context5.prev = 10;

                      if (!_this.props.doImageUploadRequest) {
                        _context5.next = 17;
                        break;
                      }

                      _context5.next = 14;
                      return _this.props.doImageUploadRequest(file, _this.props.channel);

                    case 14:
                      response = _context5.sent;
                      _context5.next = 20;
                      break;

                    case 17:
                      _context5.next = 19;
                      return _this.props.channel.sendImage(file.uri, null, contentType);

                    case 19:
                      response = _context5.sent;

                    case 20:
                      _context5.next = 28;
                      break;

                    case 22:
                      _context5.prev = 22;
                      _context5.t0 = _context5["catch"](10);
                      console.warn(_context5.t0);
                      _context5.next = 27;
                      return _this.setState(function (prevState) {
                        var image = prevState.imageUploads[id];

                        if (!image) {
                          return {
                            numberOfUploads: prevState.numberOfUploads - 1
                          };
                        }

                        return {
                          imageUploads: prevState.imageUploads.setIn([id, 'state'], FileState.UPLOAD_FAILED),
                          numberOfUploads: prevState.numberOfUploads - 1
                        };
                      });

                    case 27:
                      return _context5.abrupt("return");

                    case 28:
                      _this.setState(function (prevState) {
                        return {
                          imageUploads: prevState.imageUploads.setIn([id, 'state'], FileState.UPLOADED).setIn([id, 'url'], response.file)
                        };
                      });

                    case 29:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, null, [[10, 22]]);
            }));

          return function (_x2) {
            return _ref13.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "onChange", function (text) {
        _this.setState({
          text: text
        });

        if (text) {
          streamChat.logChatPromiseExecution(_this.props.channel.keystroke(), 'start typing event');
        }
      });

      _defineProperty(_assertThisInitialized(_this), "setInputBoxRef", function (o) {
        return _this.inputBox = o;
      });

      _defineProperty(_assertThisInitialized(_this), "getCommands", function () {
        var config = _this.props.channel.getConfig();

        if (!config) return [];
        var allCommands = config.commands;
        return allCommands;
      });

      _defineProperty(_assertThisInitialized(_this), "closeAttachActionSheet", function () {
        _this.attachActionSheet.hide();
      });

      var state = _this.getMessageDetailsForState(props.editing);

      _this.state = _objectSpread$5({}, state);
      return _this;
    }

    _createClass(MessageInput, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.editing) this.inputBox.focus();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.props.editing) this.inputBox.focus();

        if (this.props.editing && prevProps.editing && this.props.editing.id === prevProps.editing.id) {
          return;
        }

        if (this.props.editing && !prevProps.editing) {
          this.setState(this.getMessageDetailsForState(this.props.editing));
        }

        if (this.props.editing && prevProps.editing && this.props.editing.id !== prevProps.editing.id) {
          this.setState(this.getMessageDetailsForState(this.props.editing));
        }

        if (!this.props.editing && prevProps.editing) {
          this.setState(this.getMessageDetailsForState());
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
          hasImagePicker = _this$props.hasImagePicker,
          hasFilePicker = _this$props.hasFilePicker,
          SendButton$$1 = _this$props.SendButton,
          AttachButton$$1 = _this$props.AttachButton;
        var editingBoxStyles = {};

        if (this.props.editing) {
          editingBoxStyles = {
            paddingLeft: 0,
            paddingRight: 0,
            shadowColor: 'gray',
            shadowOpacity: 0.5,
            shadowOffset: {
              width: 1,
              height: -3
            },
            zIndex: 100,
            backgroundColor: 'white'
          };
        }

        return React__default.createElement(React__default.Fragment, null, React__default.createElement(reactNative.View, {
          style: editingBoxStyles
        }, this.props.editing && React__default.createElement(reactNative.View, {
          style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10
          }
        }, React__default.createElement(reactNative.Text, {
          style: {
            fontWeight: 'bold'
          }
        }, "Editing Message"), React__default.createElement(IconSquare, {
          onPress: function onPress() {
            _this2.props.clearEditingState();
          },
          icon: img$m
        })), React__default.createElement(Container$m, {
          padding: this.state.imageUploads.length > 0
        }, this.state.fileUploads && React__default.createElement(FileUploadPreview, {
          removeFile: this._removeFile,
          retryUpload: this._uploadFile,
          fileUploads: this.state.fileOrder.map(function (id) {
            return _this2.state.fileUploads[id];
          }),
          AttachmentFileIcon: this.props.AttachmentFileIcon
        }), this.state.imageUploads && React__default.createElement(ImageUploadPreview, {
          removeImage: this._removeImage,
          retryUpload: this._uploadImage,
          imageUploads: this.state.imageOrder.map(function (id) {
            return _this2.state.imageUploads[id];
          })
        }), React__default.createElement(InputBoxContainer, {
          ref: this.props.setInputBoxContainerRef
        }, React__default.createElement(AttachButton$$1, {
          handleOnPress:
            /*#__PURE__*/
            _asyncToGenerator(
              /*#__PURE__*/
              _regeneratorRuntime.mark(function _callee6() {
                return _regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (!(hasImagePicker && hasFilePicker)) {
                          _context6.next = 6;
                          break;
                        }

                        _context6.next = 3;
                        return _this2.props.dismissKeyboard();

                      case 3:
                        _this2.attachActionSheet.show();

                        _context6.next = 7;
                        break;

                      case 6:
                        if (hasImagePicker && !hasFilePicker) _this2._pickImage(); else if (!hasImagePicker && hasFilePicker) _this2._pickFile();

                      case 7:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }))
        }), React__default.createElement(reactNativeActionsheet.ActionSheetCustom, {
          ref: function ref(o) {
            return _this2.attachActionSheet = o;
          },
          title: React__default.createElement(ActionSheetTitleContainer$1, null, React__default.createElement(ActionSheetTitleText$1, null, "Add a file"), React__default.createElement(IconSquare, {
            icon: img$m,
            onPress: this.closeAttachActionSheet
          })),
          options: [
            /* eslint-disable */
            React__default.createElement(AttachmentActionSheetItem, {
              icon: img$k,
              text: "Upload a photo"
            }), React__default.createElement(AttachmentActionSheetItem, {
              icon: img$l,
              text: "Upload a file"
            })
            /* eslint-enable */
          ],
          onPress: function onPress(index) {
            // https://github.com/beefe/react-native-actionsheet/issues/36
            setTimeout(function () {
              switch (index) {
                case 0:
                  _this2._pickImage();

                  break;

                case 1:
                  _this2._pickFile();

                  break;

                default:
              }
            }, 1);
          },
          styles: this.props.actionSheetStyles
        }), React__default.createElement(AutoCompleteInput, {
          openSuggestions: this.props.openSuggestions,
          closeSuggestions: this.props.closeSuggestions,
          updateSuggestions: this.props.updateSuggestions,
          value: this.state.text,
          onChange: this.onChange,
          getCommands: this.getCommands,
          setInputBoxRef: this.setInputBoxRef,
          triggerSettings: ACITriggerSettings({
            users: this.getUsers(),
            commands: this.getCommands(),
            onMentionSelectItem: this.onSelectItem
          }),
          additionalTextInputProps: this.props.additionalTextInputProps
        }), React__default.createElement(SendButton$$1, {
          title: "Send message",
          sendMessage: this.sendMessage,
          editing: this.props.editing
        })))));
      }
    }]);

    return MessageInput;
  }(React.PureComponent), _defineProperty(_class$o, "themePath", 'messageInput'), _defineProperty(_class$o, "propTypes", {
    /**
     * Override image upload request
     *
     * @param file    File object - {uri: ''}
     * @param channel Current channel object
     * */
    doImageUploadRequest: PropTypes.func,

    /**
     * Override file upload request
     *
     * @param file    File object - {uri: '', name: ''}
     * @param channel Current channel object
     * */
    doDocUploadRequest: PropTypes.func,

    /** Limit on allowed number of files to attach at a time. */
    maxNumberOfFiles: PropTypes.number,

    /** If component should have image picker functionality  */
    hasImagePicker: PropTypes.bool,

    /** @see See [keyboard context](https://getstream.github.io/stream-chat-react-native/#keyboardcontext) */
    dismissKeyboard: PropTypes.func,

    /** If component should have file picker functionality  */
    hasFilePicker: PropTypes.bool,

    /** @see See [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    members: PropTypes.object,

    /** @see See [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    watchers: PropTypes.object,

    /** @see See [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    editing: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

    /** @see See [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    clearEditingState: PropTypes.func,

    /** @see See [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    client: PropTypes.object,

    /** @see See [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    sendMessage: PropTypes.func,

    /** Parent message object - in case of thread */
    parent: PropTypes.object,

    /** @see See [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext) */
    channel: PropTypes.object,

    /**
     * Ref callback to set reference on input box container
     * @see See [keyboard context](https://getstream.github.io/stream-chat-react-native/#keyboardcontext)
     * */
    setInputBoxContainerRef: PropTypes.func,

    /** @see See [suggestions context](https://getstream.github.io/stream-chat-react-native/#suggestionscontext) */
    openSuggestions: PropTypes.func,

    /** @see See [suggestions context](https://getstream.github.io/stream-chat-react-native/#suggestionscontext) */
    closeSuggestions: PropTypes.func,

    /** @see See [suggestions context](https://getstream.github.io/stream-chat-react-native/#suggestionscontext) */
    updateSuggestions: PropTypes.func,

    /**
     * Custom UI component for send button.
     *
     * Defaults to and accepts same props as: [SendButton](https://getstream.github.io/stream-chat-react-native/#sendbutton)
     * */
    SendButton: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Custom UI component for attach button.
     *
     * Defaults to and accepts same props as: [AttachButton](https://getstream.github.io/stream-chat-react-native/#attachbutton)
     * */
    AttachButton: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * Additional props for underlying TextInput component. These props will be forwarded as it is to TextInput component.
     *
     * @see See https://facebook.github.io/react-native/docs/textinput#reference
     */
    additionalTextInputProps: PropTypes.object,

    /**
     * Style object for actionsheet (used for option to choose file attachment or photo attachment).
     * Supported styles: https://github.com/beefe/react-native-actionsheet/blob/master/lib/styles.js
     */
    actionSheetStyles: PropTypes.object,

    /**
     * Custom UI component for attachment icon for type 'file' attachment in preview.
     * Defaults to and accepts same props as: https://github.com/GetStream/stream-chat-react-native/blob/master/src/components/FileIcon.js
     */
    AttachmentFileIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType])
  }), _defineProperty(_class$o, "defaultProps", {
    hasImagePicker: true,
    hasFilePicker: true,
    SendButton: SendButton,
    AttachButton: AttachButton
  }), _temp$o)))));

var AttachmentActionSheetItem = function AttachmentActionSheetItem(_ref15) {
  var icon = _ref15.icon,
    text = _ref15.text;
  return React__default.createElement(ActionSheetButtonContainer$1, null, React__default.createElement(IconSquare, {
    icon: icon
  }), React__default.createElement(ActionSheetButtonText$1, null, text));
};

var _class$p, _temp$p;

function _templateObject6$4() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: 13;\n  font-weight: ", ";\n  ", "\n"]);

  _templateObject6$4 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$9() {
  var data = _taggedTemplateLiteral(["\n  color: #767676;\n  font-size: 11;\n  text-align: right;\n  ", "\n"]);

  _templateObject5$9 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$e() {
  var data = _taggedTemplateLiteral(["\n  font-weight: bold;\n  font-size: 14;\n  flex: 1;\n  ", "\n"]);

  _templateObject4$e = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$i() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  ", "\n"]);

  _templateObject3$i = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$q() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  padding-left: 10px;\n  ", "\n"]);

  _templateObject2$q = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$w() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  border-bottom-color: #ebebeb;\n  border-bottom-width: 1;\n  padding: 10px;\n  ", "\n"]);

  _templateObject$w = function _templateObject() {
    return data;
  };

  return data;
}
var Container$n = styled__default.TouchableOpacity(_templateObject$w(), function (_ref) {
  var theme = _ref.theme;
  return theme.channelPreview.container.css;
});
var Details = styled__default.View(_templateObject2$q(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.channelPreview.details.css;
});
var DetailsTop = styled__default.View(_templateObject3$i(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.channelPreview.detailsTop.css;
});
var Title$2 = styled__default.Text(_templateObject4$e(), function (_ref4) {
  var theme = _ref4.theme;
  return theme.channelPreview.title.css;
});
var Date$3 = styled__default.Text(_templateObject5$9(), function (_ref5) {
  var theme = _ref5.theme;
  return theme.channelPreview.date.css;
});
var Message$1 = styled__default.Text(_templateObject6$4(), function (_ref6) {
  var theme = _ref6.theme,
    unread = _ref6.unread;
  return unread ? theme.channelPreview.message.unreadColor : theme.channelPreview.message.color;
}, function (_ref7) {
  var theme = _ref7.theme,
    unread = _ref7.unread;
  return unread ? theme.channelPreview.message.unreadFontWeight : theme.channelPreview.message.fontWeight;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.channelPreview.message.css;
});
/**
 * ChannelPreviewMessenger - UI component for individual item in list of channels.
 *
 * @example ./docs/ChannelPreviewMessenger.md
 */

var ChannelPreviewMessenger = themed((_temp$p = _class$p =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(ChannelPreviewMessenger, _PureComponent);

    function ChannelPreviewMessenger() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ChannelPreviewMessenger);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ChannelPreviewMessenger)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "channelPreviewButton", React__default.createRef());

      _defineProperty(_assertThisInitialized(_this), "onSelectChannel", function () {
        _this.props.setActiveChannel(_this.props.channel);
      });

      _defineProperty(_assertThisInitialized(_this), "renderAvatar", function (otherMembers) {
        var channel = _this.props.channel;
        if (channel.data.image) return React__default.createElement(Avatar, {
          image: channel.data.image,
          size: 40,
          name: channel.data.name
        });
        if (otherMembers.length === 1) return React__default.createElement(Avatar, {
          image: otherMembers[0].user.image,
          size: 40,
          name: channel.data.name || otherMembers[0].user.name
        });
        return React__default.createElement(Avatar, {
          size: 40,
          name: channel.data.name
        });
      });

      return _this;
    }

    _createClass(ChannelPreviewMessenger, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var channel = this.props.channel;
        var otherMembers = [];
        var name = channel.data.name;
        var isValidName = name && typeof name === 'string';

        if (!isValidName) {
          var members = channel.state ? Object.values(channel.state.members) : [];
          otherMembers = members.filter(function (member) {
            return member.user.id !== _this2.props.client.userID;
          });
          name = otherMembers.map(function (member) {
            return member.user.name || member.user.id || 'Unnamed User';
          }).join(', ');
        }

        var formatLatestMessageDate = this.props.formatLatestMessageDate;
        return React__default.createElement(Container$n, {
          onPress: this.onSelectChannel
        }, this.renderAvatar(otherMembers), React__default.createElement(Details, null, React__default.createElement(DetailsTop, null, React__default.createElement(Title$2, {
          ellipsizeMode: "tail",
          numberOfLines: 1
        }, name), React__default.createElement(Date$3, null, formatLatestMessageDate ? formatLatestMessageDate(this.props.latestMessage.messageObject.created_at) : this.props.latestMessage.created_at)), React__default.createElement(Message$1, {
          unread: this.props.unread > 0 ? this.props.unread : undefined
        }, !this.props.latestMessage ? 'Nothing yet...' : truncate(this.props.latestMessage.text.replace(/\n/g, ' '), {
          length: this.props.latestMessageLength
        }))));
      }
    }]);

    return ChannelPreviewMessenger;
  }(React.PureComponent), _defineProperty(_class$p, "themePath", 'channelPreview'), _defineProperty(_class$p, "propTypes", {
    /** @see See [Chat Context](https://getstream.github.io/stream-chat-react-native/#chatcontext) */
    setActiveChannel: PropTypes.func,

    /** @see See [Chat Context](https://getstream.github.io/stream-chat-react-native/#chatcontext) */
    channel: PropTypes.object,

    /** Latest message (object) on channel */
    latestMessage: PropTypes.object,

    /** Number of unread messages on channel */
    unread: PropTypes.number,

    /** Length at which latest message should be truncated */
    latestMessageLength: PropTypes.number,

    /**
     * Formatter function for date of latest message.
     * @param date Message date
     * @returns Formatted date string
     *
     * By default today's date is shown in 'HH:mm A' format and other dates
     * are displayed in 'DD/MM/YY' format. props.latestMessage.created_at is the
     * default formated date. This default logic is part of ChannelPreview component.
     */
    formatLatestMessageDate: PropTypes.func
  }), _defineProperty(_class$p, "defaultProps", {
    latestMessageLength: 30
  }), _temp$p));

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var ChannelPreview =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(ChannelPreview, _PureComponent);

    function ChannelPreview(props) {
      var _this;

      _classCallCheck(this, ChannelPreview);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChannelPreview).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "handleReadEvent", function (event) {
        if (event.user.id === _this.props.client.userID) {
          _this.setState({
            unread: _this.props.channel.countUnread()
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "handleNewMessageEvent", function (event) {
        var channel = _this.props.channel;

        _this.setState({
          lastMessage: event.message,
          unread: channel.countUnread()
        });
      });

      _defineProperty(_assertThisInitialized(_this), "getLatestMessage", function () {
        var channel = _this.props.channel;
        var message = channel.state.messages[channel.state.messages.length - 1];
        var latestMessage = {
          text: '',
          created_at: '',
          messageObject: _objectSpread$6({}, message)
        };

        if (!message) {
          latestMessage.text = 'Nothing yet...';
          return latestMessage;
        }

        if (message.deleted_at) {
          latestMessage.text = 'Message deleted';
          return latestMessage;
        }

        if (message.text) {
          latestMessage.text = message.text;
        } else {
          if (message.command) {
            latestMessage.text = '/' + message.command;
          } else if (message.attachments.length) {
            latestMessage.text = '🏙 Attachment...';
          } else {
            latestMessage.text = 'Empty message...';
          }
        }

        if (Moment(message.created_at).isSame(new Date(), 'day')) latestMessage.created_at = Moment(message.created_at).format('HH:mm A'); else {
          latestMessage.created_at = Moment(message.created_at).format('DD/MM/YY');
        }
        return latestMessage;
      });

      _this.state = {
        unread: 0,
        lastMessage: {},
        lastRead: new Date()
      };
      return _this;
    }

    _createClass(ChannelPreview, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        // listen to change...
        var channel = this.props.channel;
        this.setState({
          unread: channel.countUnread()
        });
        channel.on('message.new', this.handleNewMessageEvent);
        channel.on('message.read', this.handleReadEvent);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var channel = this.props.channel;
        channel.off('message.new', this.handleNewMessageEvent);
        channel.off('message.read', this.handleReadEvent);
      }
    }, {
      key: "render",
      value: function render() {
        var props = _objectSpread$6({}, this.state, {}, this.props);

        var Preview = this.props.Preview;
        return React__default.createElement(Preview, _extends({}, props, {
          latestMessage: this.getLatestMessage()
        }));
      }
    }]);

    return ChannelPreview;
  }(React.PureComponent);

_defineProperty(ChannelPreview, "propTypes", {
  channel: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  setActiveChannel: PropTypes.func,
  Preview: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType])
});

_defineProperty(ChannelPreview, "defaultProps", {// Preview: ChannelPreviewCountOnly,
});

var _class$q, _temp$q;
/**
 * ChannelListMessenger - UI component for list of channels, allowing you to select the channel you want to open
 *
 * @example ./docs/ChannelListMessenger.md
 */

var ChannelListMessenger = withChatContext((_temp$q = _class$q =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(ChannelListMessenger, _PureComponent);

    function ChannelListMessenger() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ChannelListMessenger);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ChannelListMessenger)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "renderLoading", function () {
        var Indicator = _this.props.LoadingIndicator;
        return React__default.createElement(Indicator, {
          listType: "channel"
        });
      });

      _defineProperty(_assertThisInitialized(_this), "renderLoadingError", function () {
        var Indicator = _this.props.LoadingErrorIndicator;
        return React__default.createElement(Indicator, {
          error: _this.props.error,
          listType: "channel"
        });
      });

      _defineProperty(_assertThisInitialized(_this), "renderEmptyState", function () {
        var Indicator = _this.props.EmptyStateIndicator;
        return React__default.createElement(Indicator, {
          listType: "channel"
        });
      });

      _defineProperty(_assertThisInitialized(_this), "renderChannels", function () {
        return React__default.createElement(reactNative.FlatList, _extends({
          data: _this.props.channels,
          onEndReached: _this.props.loadNextPage,
          onEndReachedThreshold: _this.props.loadMoreThreshold,
          ListEmptyComponent: _this.renderEmptyState,
          renderItem: function renderItem(_ref) {
            var channel = _ref.item;
            return React__default.createElement(ChannelPreview, _extends({}, _this.props, {
              key: channel.cid,
              channel: channel,
              Preview: _this.props.Preview
            }));
          },
          keyExtractor: function keyExtractor(item) {
            return item.cid;
          }
        }, _this.props.additionalFlatListProps));
      });

      return _this;
    }

    _createClass(ChannelListMessenger, [{
      key: "render",
      value: function render() {
        if (this.props.error) {
          return this.renderLoadingError();
        } else if (this.props.loadingChannels) {
          return this.renderLoading();
        } else {
          return this.renderChannels();
        }
      }
    }]);

    return ChannelListMessenger;
  }(React.PureComponent), _defineProperty(_class$q, "propTypes", {
    /** Channels can be either an array of channels or a promise which resolves to an array of channels */
    channels: PropTypes.oneOfType([PropTypes.array, PropTypes.objectOf({
      then: PropTypes.func
    }), PropTypes.object]).isRequired,
    setActiveChannel: PropTypes.func,

    /** UI Component to display individual channel item in list.
     * Defaults to [ChannelPreviewMessenger](https://getstream.github.io/stream-chat-react-native/#channelpreviewmessenger) */
    Preview: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** The loading indicator to use. Default: [LoadingIndicator](https://getstream.github.io/stream-chat-react-native/#loadingindicator) */
    LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** The indicator to use when there is error in fetching channels. Default: [LoadingErrorIndicator](https://getstream.github.io/stream-chat-react-native/#loadingerrorindicator) */
    LoadingErrorIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** The indicator to use when channel list is empty. Default: [EmptyStateIndicator](https://getstream.github.io/stream-chat-react-native/#emptystateindicator) */
    EmptyStateIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** Loads next page of channels in channels object, which is present here as prop */
    loadNextPage: PropTypes.func,

    /**
     * For flatlist
     * @see See loeadMoreThreshold [doc](https://facebook.github.io/react-native/docs/flatlist#onendreachedthreshold)
     * */
    loadMoreThreshold: PropTypes.number,

    /** If there is error in querying channels */
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),

    /** If channels are being queries. LoadingIndicator will be displayed if true */
    loadingChannels: PropTypes.bool,

    /**
     * Besides existing (default) UX behaviour of underlying flatlist of ChannelListMessenger component, if you want
     * to attach some additional props to un derlying flatlist, you can add it to following prop.
     *
     * You can find list of all the available FlatList props here - https://facebook.github.io/react-native/docs/flatlist#props
     *
     * e.g.
     * ```
     * <ChannelListMessenger
     *  channels={channels}
     *  additionalFlatListProps={{ bounces: true }} />
     * ```
     */
    additionalFlatListProps: PropTypes.object
  }), _defineProperty(_class$q, "defaultProps", {
    Preview: ChannelPreviewMessenger,
    LoadingIndicator: LoadingIndicator,
    LoadingErrorIndicator: LoadingErrorIndicator,
    EmptyStateIndicator: EmptyStateIndicator,
    // https://github.com/facebook/react-native/blob/a7a7970e543959e9db5281914d5f132beb01db8d/Libraries/Lists/VirtualizedList.js#L466
    loadMoreThreshold: 2,
    additionalFlatListProps: {}
  }), _temp$q));

var _class$r, _temp$r;

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var isPromise = function isPromise(thing) {
  var promise = thing && typeof thing.then === 'function';
  return promise;
};
var DEFAULT_QUERY_CHANNELS_LIMIT = 10;
/**
 * ChannelList - A preview list of channels, allowing you to select the channel you want to open.
 * This components doesn't provide any UI for the list. UI is provided by component `List` which should be
 * provided to this component as prop. By default ChannelListMessenger is used a list UI.
 *
 * @extends PureComponent
 * @example ./docs/ChannelList.md
 */

var ChannelList = withChatContext((_temp$r = _class$r =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(ChannelList, _PureComponent);

    function ChannelList(props) {
      var _this;

      _classCallCheck(this, ChannelList);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChannelList).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "queryChannels",
        /*#__PURE__*/
        function () {
          var _ref = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee() {
              var resync,
                _this$props,
                options,
                filters,
                sort,
                offset,
                channelPromise,
                channelQueryResponse,
                _args = arguments;

              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      resync = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

                      if (!(_this.queryActive || !_this.state.hasNextPage)) {
                        _context.next = 3;
                        break;
                      }

                      return _context.abrupt("return");

                    case 3:
                      _this.queryActive = true;

                      if (!_this._unmounted) {
                        _context.next = 7;
                        break;
                      }

                      _this.queryActive = false;
                      return _context.abrupt("return");

                    case 7:
                      _this$props = _this.props, options = _this$props.options, filters = _this$props.filters, sort = _this$props.sort;

                      if (!resync) {
                        _context.next = 16;
                        break;
                      }

                      offset = 0;
                      options.limit = _this.state.channels.length;

                      if (!_this._unmounted) {
                        _context.next = 13;
                        break;
                      }

                      return _context.abrupt("return");

                    case 13:
                      _this.setState({
                        offset: 0
                      });

                      _context.next = 17;
                      break;

                    case 16:
                      offset = _this.state.offset;

                    case 17:
                      if (!_this._unmounted) {
                        _context.next = 19;
                        break;
                      }

                      return _context.abrupt("return");

                    case 19:
                      _this.setState({
                        refreshing: true
                      });

                      _this.props.logger('ChannelList component', 'queryChannels', {
                        tags: ['channellist'],
                        props: _this.props,
                        state: _this.state,
                        query: _objectSpread$7({
                          filters: filters,
                          sort: sort
                        }, options, {
                          offset: offset
                        })
                      });

                      channelPromise = _this.props.client.queryChannels(filters, sort, _objectSpread$7({}, options, {
                        offset: offset
                      }));
                      _context.prev = 22;
                      channelQueryResponse = channelPromise;

                      if (!isPromise(channelQueryResponse)) {
                        _context.next = 32;
                        break;
                      }

                      _context.next = 27;
                      return channelPromise;

                    case 27:
                      channelQueryResponse = _context.sent;

                      if (!(offset === 0 && channelQueryResponse.length >= 1)) {
                        _context.next = 32;
                        break;
                      }

                      if (!_this._unmounted) {
                        _context.next = 31;
                        break;
                      }

                      return _context.abrupt("return");

                    case 31:
                      _this.props.setActiveChannel(channelQueryResponse[0]);

                    case 32:
                      if (!_this._unmounted) {
                        _context.next = 34;
                        break;
                      }

                      return _context.abrupt("return");

                    case 34:
                      _context.next = 36;
                      return _this.setState(function (prevState) {
                        var channels;
                        var channelIds;

                        if (resync) {
                          channels = _toConsumableArray(channelQueryResponse);
                          channelIds = _toConsumableArray(channelQueryResponse.map(function (c) {
                            return c.id;
                          }));
                        } else {
                          // Remove duplicate channels in worse case we get repeted channel from backend.
                          channelQueryResponse = channelQueryResponse.filter(function (c) {
                            return _this.state.channelIds.indexOf(c.id) === -1;
                          });
                          channels = [].concat(_toConsumableArray(prevState.channels), _toConsumableArray(channelQueryResponse));
                          channelIds = [].concat(_toConsumableArray(prevState.channelIds), _toConsumableArray(channelQueryResponse.map(function (c) {
                            return c.id;
                          })));
                        }

                        return {
                          channels: channels,
                          // not unique somehow needs more checking
                          channelIds: channelIds,
                          loadingChannels: false,
                          offset: channels.length,
                          hasNextPage: channelQueryResponse.length >= (options.limit || DEFAULT_QUERY_CHANNELS_LIMIT) ? true : false,
                          refreshing: false
                        };
                      });

                    case 36:
                      _context.next = 44;
                      break;

                    case 38:
                      _context.prev = 38;
                      _context.t0 = _context["catch"](22);
                      console.warn(_context.t0);

                      if (!_this._unmounted) {
                        _context.next = 43;
                        break;
                      }

                      return _context.abrupt("return");

                    case 43:
                      _this.setState({
                        error: _context.t0,
                        refreshing: false
                      });

                    case 44:
                      _this.queryActive = false;

                    case 45:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, null, [[22, 38]]);
            }));

          return function () {
            return _ref.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "handleEvent",
        /*#__PURE__*/
        function () {
          var _ref2 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee2(e) {
              var newChannels, channel, _channel, channels, channelIndex, _channels, _channelIndex;

              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (e.type === 'user.presence.changed') {
                        newChannels = _this.state.channels;
                        newChannels = newChannels.map(function (channel) {
                          if (!channel.state.members[e.user.id]) return channel;
                          channel.state.members.setIn([e.user.id, 'user'], e.user);
                          return channel;
                        });

                        _this.setState({
                          channels: _toConsumableArray(newChannels)
                        });
                      }

                      if (e.type === 'message.new') {
                        !_this.props.lockChannelOrder && _this.moveChannelUp(e.cid);
                      } // make sure to re-render the channel list after connection is recovered


                      if (e.type === 'connection.recovered') {
                        _this.queryChannels(true);
                      } // move channel to start


                      if (!(e.type === 'notification.message_new')) {
                        _context2.next = 14;
                        break;
                      }

                      if (!(_this.props.onMessageNew && typeof _this.props.onMessageNew === 'function')) {
                        _context2.next = 8;
                        break;
                      }

                      _this.props.onMessageNew(_assertThisInitialized(_this), e);

                      _context2.next = 14;
                      break;

                    case 8:
                      _context2.next = 10;
                      return _this.getChannel(e.channel.type, e.channel.id);

                    case 10:
                      channel = _context2.sent;

                      if (!_this._unmounted) {
                        _context2.next = 13;
                        break;
                      }

                      return _context2.abrupt("return");

                    case 13:
                      _this.setState(function (prevState) {
                        return {
                          channels: uniqBy([channel].concat(_toConsumableArray(prevState.channels)), 'cid'),
                          channelIds: uniqWith([channel.id].concat(_toConsumableArray(prevState.channelIds)), isEqual),
                          offset: prevState.offset + 1
                        };
                      });

                    case 14:
                      if (!(e.type === 'notification.added_to_channel')) {
                        _context2.next = 25;
                        break;
                      }

                      if (!(_this.props.onAddedToChannel && typeof _this.props.onAddedToChannel === 'function')) {
                        _context2.next = 19;
                        break;
                      }

                      _this.props.onAddedToChannel(_assertThisInitialized(_this), e);

                      _context2.next = 25;
                      break;

                    case 19:
                      _context2.next = 21;
                      return _this.getChannel(e.channel.type, e.channel.id);

                    case 21:
                      _channel = _context2.sent;

                      if (!_this._unmounted) {
                        _context2.next = 24;
                        break;
                      }

                      return _context2.abrupt("return");

                    case 24:
                      _this.setState(function (prevState) {
                        return {
                          channels: uniqBy([_channel].concat(_toConsumableArray(prevState.channels)), 'cid'),
                          channelIds: uniqWith([_channel.id].concat(_toConsumableArray(prevState.channelIds)), isEqual),
                          offset: prevState.offset + 1
                        };
                      });

                    case 25:
                      if (!(e.type === 'notification.removed_from_channel')) {
                        _context2.next = 33;
                        break;
                      }

                      if (!(_this.props.onRemovedFromChannel && typeof _this.props.onRemovedFromChannel === 'function')) {
                        _context2.next = 30;
                        break;
                      }

                      _this.props.onRemovedFromChannel(_assertThisInitialized(_this), e);

                      _context2.next = 33;
                      break;

                    case 30:
                      if (!_this._unmounted) {
                        _context2.next = 32;
                        break;
                      }

                      return _context2.abrupt("return");

                    case 32:
                      _this.setState(function (prevState) {
                        var channels = prevState.channels.filter(function (channel) {
                          return channel.cid !== e.channel.cid;
                        });
                        var channelIds = prevState.channelIds.filter(function (cid) {
                          return cid !== e.channel.cid;
                        });
                        return {
                          channels: channels,
                          channelIds: channelIds
                        };
                      });

                    case 33:
                      // Channel data is updated
                      if (e.type === 'channel.updated') {
                        channels = _this.state.channels;
                        channelIndex = channels.findIndex(function (channel) {
                          return channel.cid === e.channel.cid;
                        });
                        channels[channelIndex].data = Immutable(e.channel);

                        _this.setState({
                          channels: _toConsumableArray(channels)
                        });

                        if (_this.props.onChannelUpdated && typeof _this.props.onChannelUpdated === 'function') _this.props.onChannelUpdated(_assertThisInitialized(_this), e);
                      } // Channel is deleted


                      if (e.type === 'channel.deleted') {
                        if (_this.props.onChannelDeleted && typeof _this.props.onChannelDeleted === 'function') {
                          _this.props.onChannelDeleted(_assertThisInitialized(_this), e);
                        } else {
                          _channels = _this.state.channels;
                          _channelIndex = _channels.findIndex(function (channel) {
                            return channel.cid === e.channel.cid;
                          }); // Remove the deleted channel from the list.

                          _channels.splice(_channelIndex, 1);

                          _this.setState({
                            channels: _toConsumableArray(_channels)
                          });
                        }
                      }

                      if (e.type === 'channel.truncated') {
                        _this.setState(function (prevState) {
                          return {
                            channels: _toConsumableArray(prevState.channels)
                          };
                        });

                        if (_this.props.onChannelTruncated && typeof _this.props.onChannelTruncated === 'function') _this.props.onChannelTruncated(_assertThisInitialized(_this), e);
                      }

                      return _context2.abrupt("return", null);

                    case 37:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "getChannel",
        /*#__PURE__*/
        function () {
          var _ref3 = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee3(type, id) {
              var channel;
              return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      channel = _this.props.client.channel(type, id);
                      _context3.next = 3;
                      return channel.watch();

                    case 3:
                      return _context3.abrupt("return", channel);

                    case 4:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            }));

          return function (_x2, _x3) {
            return _ref3.apply(this, arguments);
          };
        }());

      _defineProperty(_assertThisInitialized(_this), "moveChannelUp", function (cid) {
        if (_this._unmounted) return;
        var channels = _this.state.channels; // get channel index

        var channelIndex = _this.state.channels.findIndex(function (channel) {
          return channel.cid === cid;
        });

        if (channelIndex <= 0) return; // get channel from channels

        var channel = channels[channelIndex]; //remove channel from current position

        channels.splice(channelIndex, 1); //add channel at the start

        channels.unshift(channel); // set new channel state

        if (_this._unmounted) return;

        _this.setState({
          channels: _toConsumableArray(channels)
        });
      });

      _defineProperty(_assertThisInitialized(_this), "loadNextPage", function () {
        _this._queryChannelsDebounced();
      });

      _this.state = {
        error: false,
        channels: Immutable([]),
        channelIds: Immutable([]),
        loadingChannels: true,
        hasNextPage: true,
        refreshing: false,
        offset: 0
      };
      _this.menuButton = React__default.createRef();
      _this._queryChannelsDebounced = debounce(_this.queryChannels, 1000, {
        leading: true,
        trailing: true
      });
      _this.queryActive = false;
      _this._unmounted = false;
      return _this;
    }

    _createClass(ChannelList, [{
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee4() {
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    this.props.logger('ChannelList component', 'componentDidMount', {
                      tags: ['lifecycle', 'channellist'],
                      props: this.props,
                      state: this.state
                    });
                    _context4.next = 3;
                    return this._queryChannelsDebounced();

                  case 3:
                    this.listenToChanges();

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }

        return componentDidMount;
      }()
    }, {
      key: "componentDidUpdate",
      value: function () {
        var _componentDidUpdate = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee5(prevProps) {
            return _regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!(!isEqual(prevProps.filters, this.props.filters) || !isEqual(prevProps.sort, this.props.sort))) {
                      _context5.next = 5;
                      break;
                    }

                    _context5.next = 3;
                    return this.setState({
                      error: false,
                      channels: Immutable([]),
                      channelIds: Immutable([]),
                      loadingChannels: true,
                      hasNextPage: true,
                      refreshing: false,
                      offset: 0
                    });

                  case 3:
                    _context5.next = 5;
                    return this.queryChannels();

                  case 5:
                    this.props.logger('ChannelList component', 'componentDidUpdate', {
                      tags: ['lifecycle', 'channellist'],
                      props: this.props,
                      state: this.state
                    });

                  case 6:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));

        function componentDidUpdate(_x4) {
          return _componentDidUpdate.apply(this, arguments);
        }

        return componentDidUpdate;
      }()
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.logger('ChannelList component', 'componentWillUnmount', {
          tags: ['lifecycle', 'channellist'],
          props: this.props,
          state: this.state
        });
        this._unmounted = true;
        this.props.client.off(this.handleEvent);

        this._queryChannelsDebounced.cancel();
      }
    }, {
      key: "componentDidCatch",
      value: function componentDidCatch(error, info) {
        console.warn(error, info);
      }
    }, {
      key: "listenToChanges",
      value: function listenToChanges() {
        this.props.client.on(this.handleEvent);
      }
    }, {
      key: "render",
      value: function render() {
        var context = {
          loadNextPage: this.loadNextPage
        };
        var List = this.props.List;

        var props = _objectSpread$7({}, this.props, {
          setActiveChannel: this.props.onSelect
        });

        return React__default.createElement(React__default.Fragment, null, React__default.createElement(List, _extends({}, props, this.state, context)));
      }
    }], [{
      key: "getDerivedStateFromError",
      value: function getDerivedStateFromError(error) {
        return {
          error: error
        };
      }
    }]);

    return ChannelList;
  }(React.PureComponent), _defineProperty(_class$r, "propTypes", {
    /** The Preview to use, defaults to [ChannelPreviewMessenger](https://getstream.github.io/stream-chat-react-native/#channelpreviewmessenger) */
    Preview: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** The loading indicator to use */
    LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** The indicator to use when there is error in fetching channels */
    LoadingErrorIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /** The indicator to use when channel list is empty */
    EmptyStateIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
    List: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
    onSelect: PropTypes.func,

    /**
     * Function that overrides default behaviour when new message is received on channel that is not being watched
     *
     * @param {Component} thisArg Reference to ChannelList component
     * @param {Event} event       [Event object](https://getstream.io/chat/docs/#event_object) corresponding to `notification.message_new` event
     * */
    onMessageNew: PropTypes.func,

    /**
     * Function that overrides default behaviour when users gets added to a channel
     *
     * @param {Component} thisArg Reference to ChannelList component
     * @param {Event} event       [Event object](https://getstream.io/chat/docs/#event_object) corresponding to `notification.added_to_channel` event
     * */
    onAddedToChannel: PropTypes.func,

    /**
     * Function that overrides default behaviour when users gets removed from a channel
     *
     * @param {Component} thisArg Reference to ChannelList component
     * @param {Event} event       [Event object](https://getstream.io/chat/docs/#event_object) corresponding to `notification.removed_from_channel` event
     * */
    onRemovedFromChannel: PropTypes.func,

    /**
     * Function that overrides default behaviour when channel gets updated
     *
     * @param {Component} thisArg Reference to ChannelList component
     * @param {Event} event       [Event object](https://getstream.io/chat/docs/#event_object) corresponding to `channel.updated` event
     * */
    onChannelUpdated: PropTypes.func,

    /**
     * Function to customize behaviour when channel gets truncated
     *
     * @param {Component} thisArg Reference to ChannelList component
     * @param {Event} event       [Event object](https://getstream.io/chat/docs/#event_object) corresponding to `channel.truncated` event
     * */
    onChannelTruncated: PropTypes.func,

    /**
     * Function that overrides default behaviour when channel gets deleted. In absence of this prop, channel will be removed from the list.
     *
     * @param {Component} thisArg Reference to ChannelList component
     * @param {Event} event       [Event object](https://getstream.io/chat/docs/#event_object) corresponding to `channel.deleted` event
     * */
    onChannelDeleted: PropTypes.func,

    /**
     * Object containing query filters
     * @see See [Channel query documentation](https://getstream.io/chat/docs/#query_channels) for a list of available fields for filter.
     * */
    filters: PropTypes.object,

    /**
     * Object containing query options
     * @see See [Channel query documentation](https://getstream.io/chat/docs/#query_channels) for a list of available fields for options.
     * */
    options: PropTypes.object,

    /**
     * Object containing sort parameters
     * @see See [Channel query documentation](https://getstream.io/chat/docs/#query_channels) for a list of available fields for sort.
     * */
    sort: PropTypes.object,

    /** For flatlist  */
    loadMoreThreshold: PropTypes.number,

    /** Client object. Avaiable from [Chat context](#chatcontext) */
    client: PropTypes.object,

    /**
     * Function to set change active channel. This function acts as bridge between channel list and currently active channel component.
     *
     * @param channel A Channel object
     */
    setActiveChannel: PropTypes.func,

    /**
     * If true, channels won't be dynamically sorted by most recent message.
     */
    lockChannelOrder: PropTypes.bool,

    /**
     * Besides existing (default) UX behaviour of underlying flatlist of ChannelList component, if you want
     * to attach some additional props to un derlying flatlist, you can add it to following prop.
     *
     * You can find list of all the available FlatList props here - https://facebook.github.io/react-native/docs/flatlist#props
     *
     * e.g.
     * ```
     * <ChannelList
     *  filters={filters}
     *  sort={sort}
     *  additionalFlatListProps={{ bounces: true }} />
     * ```
     */
    additionalFlatListProps: PropTypes.object
  }), _defineProperty(_class$r, "defaultProps", {
    Preview: ChannelPreviewMessenger,
    List: ChannelListMessenger,
    LoadingIndicator: LoadingIndicator,
    LoadingErrorIndicator: LoadingErrorIndicator,
    EmptyStateIndicator: EmptyStateIndicator,
    filters: {},
    options: {},
    sort: {},
    // https://github.com/facebook/react-native/blob/a7a7970e543959e9db5281914d5f132beb01db8d/Libraries/Lists/VirtualizedList.js#L466
    loadMoreThreshold: 2,
    lockChannelOrder: false,
    additionalFlatListProps: {},
    logger: function logger() { }
  }), _temp$r));

var _class$s, _temp$s;

function _templateObject2$r() {
  var data = _taggedTemplateLiteral(["\n  ", ";\n"]);

  _templateObject2$r = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$x() {
  var data = _taggedTemplateLiteral(["\n  padding: 8px;\n  background-color: #f4f9ff;\n  margin: 10px;\n  border-radius: 4;\n  display: flex;\n  align-items: center;\n  ", ";\n"]);

  _templateObject$x = function _templateObject() {
    return data;
  };

  return data;
}
var NewThread = styled__default.View(_templateObject$x(), function (_ref) {
  var theme = _ref.theme;
  return theme.thread.newThread.css;
});
var NewThreadText = styled__default.Text(_templateObject2$r(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.thread.newThread.text.css;
});
/**
 * Thread - The Thread renders a parent message with a list of replies. Use the standard message list of the main channel's messages.
 * The thread is only used for the list of replies to a message.
 *
 * Thread is a consumer of [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)
 * Underlying MessageList, MessageInput and Message components can be customized using props:
 * - additionalParentMessageProps
 * - additionalMessageListProps
 * - additionalMessageInputProps
 *
 * @example ./docs/Thread.md
 * @extends Component
 */

var Thread = withChannelContext(themed((_temp$s = _class$s =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(Thread, _React$PureComponent);

    function Thread() {
      _classCallCheck(this, Thread);

      return _possibleConstructorReturn(this, _getPrototypeOf(Thread).apply(this, arguments));
    }

    _createClass(Thread, [{
      key: "render",
      value: function render() {
        if (!this.props.thread) {
          return null;
        }

        var parentID = this.props.thread.id;
        var cid = this.props.channel.cid;
        var key = "thread-".concat(parentID, "-").concat(cid); // We use a wrapper to make sure the key variable is set.
        // this ensures that if you switch thread the component is recreated

        return React__default.createElement(ThreadInner, _extends({}, this.props, {
          key: key
        }));
      }
    }]);

    return Thread;
  }(React__default.PureComponent), _defineProperty(_class$s, "themePath", 'thread'), _defineProperty(_class$s, "propTypes", {
    /** Make input focus on mounting thread */
    autoFocus: PropTypes.bool,

    /**
     * **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)**
     * */
    channel: PropTypes.object.isRequired,

    /**
     *  **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)**
     * */
    Message: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),

    /**
     * **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)**
     * The thread (the parent [message object](https://getstream.io/chat/docs/#message_format)) */
    thread: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

    /**
     * **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)**
     * The array of immutable messages to render. By default they are provided by parent Channel component */
    threadMessages: PropTypes.array.isRequired,

    /**
     * **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)**
     *
     * Function which provides next page of thread messages.
     * loadMoreThread is called when infinite scroll wants to load more messages
     * */
    loadMoreThread: PropTypes.func.isRequired,

    /**
     * **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)**
     * If there are more messages available, set to false when the end of pagination is reached.
     * */
    threadHasMore: PropTypes.bool,

    /**
     * **Available from [channel context](https://getstream.github.io/stream-chat-react-native/#channelcontext)**
     * If the thread is currently loading more messages. This is helpful to display a loading indicator on threadlist */
    threadLoadingMore: PropTypes.bool,

    /**
     * Additional props for underlying Message component of parent message at the top.
     * Available props - https://getstream.github.io/stream-chat-react-native/#message
     * */
    additionalParentMessageProps: PropTypes.object,

    /**
     * Additional props for underlying MessageList component.
     * Available props - https://getstream.github.io/stream-chat-react-native/#messagelist
     * */
    additionalMessageListProps: PropTypes.object,

    /**
     * Additional props for underlying MessageInput component.
     * Available props - https://getstream.github.io/stream-chat-react-native/#messageinput
     * */
    additionalMessageInputProps: PropTypes.object
  }), _defineProperty(_class$s, "defaultProps", {
    threadHasMore: true,
    threadLoadingMore: true,
    autoFocus: true
  }), _temp$s)));

var ThreadInner =
  /*#__PURE__*/
  function (_React$PureComponent2) {
    _inherits(ThreadInner, _React$PureComponent2);

    function ThreadInner(props) {
      var _this;

      _classCallCheck(this, ThreadInner);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ThreadInner).call(this, props));
      _this.messageList = React__default.createRef();
      return _this;
    }

    _createClass(ThreadInner, [{
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee() {
            var parentID;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    parentID = this.props.thread.id;

                    if (!(parentID && this.props.thread.reply_count)) {
                      _context.next = 4;
                      break;
                    }

                    _context.next = 4;
                    return this.props.loadMoreThread();

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }

        return componentDidMount;
      }()
    }, {
      key: "render",
      value: function render() {
        if (!this.props.thread) {
          return null;
        }

        var read = {};
        var headerComponent = React__default.createElement(React__default.Fragment, null, React__default.createElement(Message, _extends({
          message: this.props.thread,
          initialMessage: true,
          threadList: true,
          readOnly: true,
          groupStyles: ['single'],
          Message: this.props.Message // TODO: remove the following line in next release, since we already have additionalParentMessageProps now.

        }, this.props, this.props.additionalParentMessageProps)), React__default.createElement(NewThread, null, React__default.createElement(NewThreadText, null, "Start of a new thread")));
        return React__default.createElement(React__default.Fragment, null, React__default.createElement(MessageList, _extends({
          messages: this.props.threadMessages,
          HeaderComponent: headerComponent,
          read: read,
          threadList: true,
          loadMore: this.props.loadMoreThread,
          hasMore: this.props.threadHasMore,
          loadingMore: this.props.threadLoadingMore,
          Message: this.props.Message
        }, this.props.additionalMessageListProps)), React__default.createElement(MessageInput, _extends({
          parent: this.props.thread,
          focus: this.props.autoFocus
        }, this.props.additionalMessageInputProps)));
      }
    }]);

    return ThreadInner;
  }(React__default.PureComponent);

_defineProperty(ThreadInner, "propTypes", {
  /** Channel is passed via the Channel Context */
  channel: PropTypes.object.isRequired,

  /** the thread (just a message) that we're rendering */
  thread: PropTypes.object.isRequired
});

function _templateObject4$f() {
  var data = _taggedTemplateLiteral(["\n  font-size: 10;\n  color: #ffffff;\n  ", "\n"]);

  _templateObject4$f = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$j() {
  var data = _taggedTemplateLiteral(["\n  background-color: green;\n  justify-content: center;\n  align-items: center;\n  align-self: flex-start;\n  min-width: 15;\n  height: 15;\n  padding-left: 3;\n  padding-right: 3;\n  border-radius: 20;\n  ", "\n"]);

  _templateObject3$j = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$s() {
  var data = _taggedTemplateLiteral(["\n  padding-top: 5;\n  align-self: center;\n  border-radius: 20;\n  align-items: center;\n  justify-content: center;\n  ", "\n"]);

  _templateObject2$s = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$y() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject$y = function _templateObject() {
    return data;
  };

  return data;
}
var Container$o = styled__default.View(_templateObject$y());
var Icon = styled__default.View(_templateObject2$s(), function (_ref) {
  var theme = _ref.theme;
  return theme.iconBadge.icon.css;
});
var IconInner = styled__default.View(_templateObject3$j(), function (_ref2) {
  var theme = _ref2.theme;
  return theme.iconBadge.iconInner.css;
});
var UnreadCount = styled__default.Text(_templateObject4$f(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.iconBadge.unreadCount.css;
});
var IconBadge =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(IconBadge, _React$Component);

    function IconBadge() {
      _classCallCheck(this, IconBadge);

      return _possibleConstructorReturn(this, _getPrototypeOf(IconBadge).apply(this, arguments));
    }

    _createClass(IconBadge, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
          children = _this$props.children,
          showNumber = _this$props.showNumber,
          unread = _this$props.unread;
        return React.createElement(Container$o, null, children, unread > 0 && React.createElement(Icon, null, React.createElement(IconInner, null, showNumber && React.createElement(UnreadCount, null, unread))));
      }
    }]);

    return IconBadge;
  }(React.Component);

var ReactionPickerWrapper =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(ReactionPickerWrapper, _React$PureComponent);

    function ReactionPickerWrapper(props) {
      var _this;

      _classCallCheck(this, ReactionPickerWrapper);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactionPickerWrapper).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "_setReactionPickerPosition", function () {
        var _this$props = _this.props,
          isMyMessage = _this$props.isMyMessage,
          message = _this$props.message,
          offset = _this$props.offset;
        var pos = isMyMessage(message) ? 'right' : 'left';

        _this.messageContainer.measureInWindow(function (x, y, width) {
          _this.setState({
            reactionPickerVisible: true,
            rpTop: y - 60 + offset.top,
            rpLeft: pos === 'left' ? x - 10 + offset.left : null,
            rpRight: pos === 'right' ? Math.round(reactNative.Dimensions.get('window').width) - (x + width + 10) : null
          });
        });
      });

      _defineProperty(_assertThisInitialized(_this), "openReactionSelector", function () {
        // Keyboard closes automatically whenever modal is opened (currently there is no way of avoiding this afaik)
        // So we need to postpone the calculation for reaction picker position
        // until after keyboard is closed completely. To achieve this, we close
        // the keyboard forcefully and then calculate position of picker in callback.
        _this._setReactionPickerPosition();
      });

      _this.state = {
        reactionPickerVisible: false
      };
      return _this;
    }

    _createClass(ReactionPickerWrapper, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props2 = this.props,
          handleReaction = _this$props2.handleReaction,
          message = _this$props2.message,
          emojiData = _this$props2.emojiData,
          style = _this$props2.style;
        return React__default.createElement(reactNative.TouchableOpacity, {
          onPress: this.openReactionSelector,
          ref: function ref(o) {
            return _this2.messageContainer = o;
          }
        }, this.props.children, React__default.createElement(ReactionPicker, {
          reactionPickerVisible: this.state.reactionPickerVisible,
          handleReaction: handleReaction,
          hideReactionOwners: true,
          latestReactions: message.latest_reactions,
          reactionCounts: message.reaction_counts,
          handleDismiss: function handleDismiss() {
            _this2.setState({
              reactionPickerVisible: false
            });
          },
          style: style,
          emojiData: emojiData,
          rpLeft: this.state.rpLeft,
          rpRight: this.state.rpRight,
          rpTop: this.state.rpTop
        }));
      }
    }]);

    return ReactionPickerWrapper;
  }(React__default.PureComponent);

_defineProperty(ReactionPickerWrapper, "propTypes", {
  isMyMessage: PropTypes.func,
  message: PropTypes.object,
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleReaction: PropTypes.func,
  emojiData: PropTypes.array,
  style: PropTypes.any
});

exports.registerNativeHandlers = registerNativeHandlers;
exports.ChatContext = ChatContext;
exports.withChatContext = withChatContext;
exports.ChannelContext = ChannelContext;
exports.withChannelContext = withChannelContext;
exports.SuggestionsContext = SuggestionsContext;
exports.withSuggestionsContext = withSuggestionsContext;
exports.KeyboardContext = KeyboardContext;
exports.withKeyboardContext = withKeyboardContext;
exports.MessageContentContext = MessageContentContext;
exports.withMessageContentContext = withMessageContentContext;
exports.AutoCompleteInput = AutoCompleteInput;
exports.Card = Card;
exports.CommandsItem = CommandsItem;
exports.DateSeparator = DateSeparator;
exports.EmptyStateIndicator = EmptyStateIndicator;
exports.EventIndicator = EventIndicator;
exports.FileAttachmentGroup = FileAttachmentGroup;
exports.FileUploadPreview = FileUploadPreview;
exports.Gallery = Gallery;
exports.IconSquare = IconSquare;
exports.ImageUploadPreview = ImageUploadPreview;
exports.KeyboardCompatibleView = KeyboardCompatibleView;
exports.LoadingErrorIndicator = LoadingErrorIndicator;
exports.LoadingIndicator = LoadingIndicator;
exports.MentionsItem = MentionsItem;
exports.Message = Message;
exports.MessageNotification = MessageNotification;
exports.MessageSystem = MessageSystem;
exports.ReactionList = ReactionList;
exports.Spinner = Spinner;
exports.SuggestionsProvider = SuggestionsProvider;
exports.UploadProgressIndicator = UploadProgressIndicator;
exports.Attachment = Attachment;
exports.AttachmentActions = AttachmentActions;
exports.Avatar = Avatar;
exports.Chat = Chat;
exports.Channel = Channel;
exports.MessageList = MessageList;
exports.TypingIndicator = TypingIndicator;
exports.MessageInput = MessageInput;
exports.ChannelList = ChannelList;
exports.Thread = Thread;
exports.ChannelPreviewMessenger = ChannelPreviewMessenger;
exports.CloseButton = CloseButton;
exports.IconBadge = IconBadge;
exports.ReactionPicker = ReactionPicker;
exports.ReactionPickerWrapper = ReactionPickerWrapper;
exports.SendButton = SendButton;
exports.FileIcon = FileIcon;
exports.MessageSimple = MessageSimple;
exports.MessageStatus = MessageStatus;
exports.MessageContent = MessageContent;
exports.MessageAvatar = MessageAvatar;
exports.MessageTextContainer = MessageTextContainer;
exports.emojiData = emojiData;
exports.capitalize = capitalize;
exports.FileState = FileState;
exports.ProgressIndicatorTypes = ProgressIndicatorTypes;
exports.ACITriggerSettings = ACITriggerSettings;
exports.MESSAGE_ACTIONS = MESSAGE_ACTIONS;
exports.makeImageCompatibleUrl = makeImageCompatibleUrl;
exports.renderText = renderText;
//# sourceMappingURL=index.js.map
