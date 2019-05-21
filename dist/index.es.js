import _objectSpread from '@babel/runtime/helpers/objectSpread';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React__default, { PureComponent, createElement, Component } from 'react';
import { StyleSheet, View, Image, Text, findNodeHandle, TouchableOpacity, FlatList, Dimensions, Animated, Keyboard, Linking, Modal, SafeAreaView, ActivityIndicator, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import _typeof from '@babel/runtime/helpers/typeof';
import { defaultsDeep, truncate } from 'lodash-es';
import _extends from '@babel/runtime/helpers/extends';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import uuidv4 from 'uuid/v4';
import Immutable from 'seamless-immutable';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import ImageViewer from 'react-native-image-zoom-viewer';
import Moment from 'moment';
import anchorme from 'anchorme';
import Markdown from 'react-native-simple-markdown';
import { ActionSheetCustom } from 'react-native-actionsheet';
import deepequal from 'deep-equal';
import { logChatPromiseExecution } from 'stream-chat';
import { lookup } from 'mime-types';
import uniq from 'lodash/uniq';
import truncate$1 from 'lodash/truncate';

var BASE_FONT_SIZE = 16; // Set fixed component sizes

var REACTION_PICKER_HEIGHT = 70;
var Sizes = {
  borderRadius: 16,
  borderRadiusS: 2
};
var Colors = {
  primary: '#006cff',
  secondary: '#111',
  danger: '#EDD8DD',
  light: '#EBEBEB',
  textLight: 'white',
  textDark: 'rgba(0,0,0,1)',
  textGrey: 'rgba(0,0,0,0.5)'
};
var Layouts = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  }
};
var styles = {
  Avatar: StyleSheet.create({
    image: {
      width: 50,
      height: 50
    },
    fallback: {
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center'
    },
    fallbackText: {
      color: Colors.textLight,
      textTransform: 'uppercase',
      fontSize: BASE_FONT_SIZE - 2,
      fontWeight: '600'
    }
  }),
  MessageSimple: StyleSheet.create({
    container: _objectSpread({}, Layouts.flexRow, {
      alignItems: 'flex-end'
    }),
    left: {
      justifyContent: 'flex-start'
    },
    right: {
      justifyContent: 'flex-end'
    },
    bottom: {
      marginBottom: 20
    }
  }),
  MessageSimpleAvatar: StyleSheet.create({
    left: {
      marginRight: 8
    },
    right: {
      marginLeft: 8
    }
  }),
  MessageSimpleContent: StyleSheet.create({
    container: _objectSpread({}, Layouts.flexColumn, {
      maxWidth: 250
    }),
    left: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    },
    right: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    failed: {
      padding: 5,
      borderRadius: 10,
      backgroundColor: Colors.danger
    },
    error: {
      padding: 5,
      borderRadius: 10,
      backgroundColor: Colors.danger
    },
    metaContainer: {
      marginTop: 2
    },
    metaText: {
      fontSize: 11,
      color: Colors.textGrey
    }
  }),
  MessageSimpleText: StyleSheet.create({
    container: {
      borderBottomLeftRadius: Sizes.borderRadius,
      borderBottomRightRadius: Sizes.borderRadius,
      borderTopLeftRadius: Sizes.borderRadius,
      borderTopRightRadius: Sizes.borderRadius,
      marginTop: 2,
      padding: 5,
      paddingLeft: 8,
      paddingRight: 8
    },
    text: {
      fontSize: 15,
      lineHeight: 20
    },
    deletedText: {
      color: '#A4A4A4'
    },
    left: {
      alignSelf: 'flex-start',
      borderWidth: 0.5,
      borderColor: 'rgba(0,0,0,0.08)'
    },
    right: {
      alignSelf: 'flex-end',
      backgroundColor: Colors.light
    },
    failed: {
      backgroundColor: 'transparent'
    },
    error: {
      backgroundColor: 'transparent'
    },
    rightSingle: {
      borderBottomRightRadius: Sizes.borderRadiusS
    },
    rightTop: {
      borderBottomRightRadius: Sizes.borderRadiusS
    },
    rightMiddle: {
      borderBottomRightRadius: Sizes.borderRadiusS,
      borderTopRightRadius: Sizes.borderRadiusS
    },
    rightBottom: {
      borderBottomRightRadius: Sizes.borderRadiusS,
      borderTopRightRadius: Sizes.borderRadiusS
    },
    leftSingle: {
      borderBottomLeftRadius: Sizes.borderRadiusS
    },
    leftTop: {
      borderBottomLeftRadius: Sizes.borderRadiusS
    },
    leftMiddle: {
      borderBottomLeftRadius: Sizes.borderRadiusS,
      borderTopLeftRadius: Sizes.borderRadiusS
    },
    leftBottom: {
      borderBottomLeftRadius: Sizes.borderRadiusS,
      borderTopLeftRadius: Sizes.borderRadiusS
    }
  }),
  MessageInput: StyleSheet.create({
    container: _objectSpread({}, Layouts.flexColumn, {
      borderRadius: 10,
      backgroundColor: 'rgba(0,0,0,0.05)'
    }),
    inputBoxContainer: _objectSpread({}, Layouts.flexRow, {
      paddingLeft: 10,
      paddingRight: 10,
      minHeight: 46,
      margin: 10,
      alignItems: 'center'
    }),
    inputBox: {
      maxHeight: 60,
      marginTop: -5,
      flex: 1
    },
    sendButton: {
      marginLeft: 8
    },
    pictureButton: {
      marginRight: 8
    },
    attachButton: {
      marginRight: 8
    },
    attachButtonIcon: {
      height: 15,
      width: 15
    },
    iconGallery: {
      width: 20,
      height: 20,
      marginRight: 10
    },
    iconMedia: {
      width: 20,
      height: 20,
      marginRight: 10
    }
  }),
  HyperLink: StyleSheet.create({
    title: {
      color: Colors.primary,
      fontWeight: 'bold'
    }
  }),
  Card: StyleSheet.create({
    footer: _objectSpread({}, Layouts.flexRow, {
      justifyContent: 'space-between',
      backgroundColor: Colors.light,
      padding: 10,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16
    })
  }),
  AttachmentActions: StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5
    },
    button: {
      borderRadius: 20,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center'
    },
    primaryButton: {
      backgroundColor: '#006CFF'
    },
    primaryButtonText: {
      color: 'white'
    },
    defaultButton: {
      backgroundColor: 'white',
      borderColor: Colors.light,
      borderWidth: 1
    },
    defaultButtonText: {
      color: 'black'
    }
  }),
  MessageNotification: StyleSheet.create({
    container: _objectSpread({}, Layouts.flexColumn, {
      alignItems: 'center',
      zIndex: 10,
      marginBottom: 0
    })
  }),
  Notification: StyleSheet.create({
    container: _objectSpread({}, Layouts.flexColumn, {
      alignItems: 'center',
      zIndex: 10,
      marginBottom: 0,
      padding: 5
    }),
    warning: {
      color: 'red',
      backgroundColor: '#FAE6E8'
    }
  }),
  DateSeparator: StyleSheet.create({
    container: _objectSpread({}, Layouts.flexRow, {
      justifyContent: 'center',
      alignItems: 'center'
    }),
    dividingLines: {
      flex: 1,
      borderColor: Colors.light,
      borderWidth: 1,
      height: 0
    },
    date: {
      flex: 1,
      textAlign: 'center'
    }
  }),
  ReactionPicker: StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'black',
      paddingLeft: 20,
      height: REACTION_PICKER_HEIGHT,
      paddingRight: 20,
      borderRadius: 30
    },
    reactionColumn: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: -5
    },
    reactionCount: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold'
    }
  }),
  iconBadge: StyleSheet.create({
    icon: {
      paddingTop: 5,
      alignSelf: 'center',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontSize: 10,
      color: '#fff'
    },
    iconInner: {
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      minWidth: 15,
      height: 15,
      paddingLeft: 3,
      paddingRight: 3,
      borderRadius: 20
    }
  })
};

var depthOf = function depthOf(object) {
  var level = 1;
  var key;

  for (key in object) {
    if (!object.hasOwnProperty(key)) continue;

    if (_typeof(object[key]) == 'object') {
      var depth = depthOf(object[key]) + 1;
      level = Math.max(depth, level);
    }
  }

  return level;
};

function getStyle(styleName) {
  return styles[styleName] || {};
}
/** function buildStylesheet
 * @param styleName: string
 * @param styleOverwrites: any
 */

function buildStylesheet(styleName, styleOverwrites) {
  var baseStyle = getStyle(styleName);

  if (!styleOverwrites || Object.keys(styleOverwrites).length === 0) {
    return baseStyle;
  }

  var falseObj = {};
  var base = Object.keys(baseStyle).map(function (k) {
    return _defineProperty({}, k, StyleSheet.flatten(baseStyle[k]));
  }).reduce(function (accumulated, v) {
    return Object.assign(accumulated, v);
  }, {});
  var topLevelOverwrites = Object.keys(styleOverwrites).map(function (k) {
    if (depthOf(styleOverwrites[k]) === 1) {
      return _defineProperty({}, k, StyleSheet.flatten(styleOverwrites[k]));
    }

    return falseObj;
  }).filter(function (v) {
    return v !== falseObj;
  }).reduce(function (accumulated, v) {
    return Object.assign(accumulated, v);
  }, {});
  return StyleSheet.create(defaultsDeep(topLevelOverwrites, base));
}

/**
 * Avatar - A round avatar image with fallback to username's first letter
 *
 * @example ./docs/Avatar.md
 * @extends PureComponent
 */

var Avatar =
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
          image = _this$props.image,
          style = _this$props.style;
      var styles$$1 = buildStylesheet('Avatar', style);
      var initials = this.getInitials(name);
      return React__default.createElement(View, {
        style: _objectSpread({
          display: 'flex',
          alignItems: 'center'
        }, styles$$1.container)
      }, image && !this.state.imageError ? React__default.createElement(Image, {
        style: _objectSpread({}, styles$$1.image, {
          borderRadius: size / 2,
          width: size,
          height: size
        }),
        source: {
          uri: image
        },
        accessibilityLabel: "initials",
        resizeMethod: "resize",
        onError: this.setError
      }) : React__default.createElement(View, {
        style: _objectSpread({}, styles$$1.fallback, {
          borderRadius: size / 2,
          width: size,
          height: size
        })
      }, React__default.createElement(Text, {
        style: styles$$1.fallbackText
      }, initials)));
    }
  }]);

  return Avatar;
}(React__default.PureComponent);

_defineProperty(Avatar, "propTypes", {
  /** image url */
  image: PropTypes.string,

  /** name of the picture, used for title tag fallback */
  name: PropTypes.string,

  /** shape of the avatar, circle, rounded or square */
  shape: PropTypes.oneOf(['circle', 'rounded', 'square']),

  /** size in pixels */
  size: PropTypes.number,

  /** Style overrides */
  style: PropTypes.object
});

_defineProperty(Avatar, "defaultProps", {
  size: 32,
  shape: 'circle'
});

var ChatContext = React__default.createContext({
  client: null
});
function withChatContext(OriginalComponent) {
  var ContextAwareComponent = function ContextComponent(props) {
    return React__default.createElement(ChatContext.Consumer, null, function (context) {
      var mergedProps = _objectSpread({}, context, props);

      return React__default.createElement(OriginalComponent, mergedProps);
    });
  };

  ContextAwareComponent.displayName = OriginalComponent.displayName || OriginalComponent.name || 'Component';
  ContextAwareComponent.displayName = ContextAwareComponent.displayName.replace('Base', '');
  return ContextAwareComponent;
}
var ChannelContext = React__default.createContext({});
function withChannelContext(OriginalComponent) {
  var ContextAwareComponent = function ContextComponent(props) {
    return React__default.createElement(ChannelContext.Consumer, null, function (channelContext) {
      return React__default.createElement(OriginalComponent, _extends({}, channelContext, props));
    });
  };

  ContextAwareComponent.displayName = OriginalComponent.displayName || OriginalComponent.name || 'Component';
  ContextAwareComponent.displayName = ContextAwareComponent.displayName.replace('Base', '');
  return ContextAwareComponent;
}
var SuggestionsContext = React__default.createContext({});
function withSuggestionsContext(OriginalComponent) {
  var ContextAwareComponent = function ContextComponent(props) {
    return React__default.createElement(SuggestionsContext.Consumer, null, function (suggestionsContext) {
      return React__default.createElement(OriginalComponent, _extends({}, suggestionsContext, props));
    });
  };

  ContextAwareComponent.displayName = OriginalComponent.displayName || OriginalComponent.name || 'Component';
  ContextAwareComponent.displayName = ContextAwareComponent.displayName.replace('Base', '');
  return ContextAwareComponent;
}

var NetInfo = function NetInfo() {
  throw Error('Native handler was not registered, you should import stream-chat-expo or stream-chat-react-native');
};
var pickImage = function pickImage() {
  throw Error('Native handler was not registered, you should import expo-activity-feed or react-native-activity-feed');
};
var pickDocument = function pickDocument() {
  throw Error('Native handler was not registered, you should import expo-activity-feed or react-native-activity-feed');
};
var registerNativeHandlers = function registerNativeHandlers(handlers) {
  if (handlers.NetInfo) {
    NetInfo = handlers.NetInfo;
  }

  if (handlers.pickImage) {
    pickImage = handlers.pickImage;
  }

  if (handlers.pickDocument) {
    pickDocument = handlers.pickDocument;
  }
};

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

var colors = ['light', 'dark'];
var baseUseCases = ['messaging', 'team', 'commerce', 'gaming', 'livestream'];
var themes = [];

for (var _i = 0, _colors = colors; _i < _colors.length; _i++) {
  var color = _colors[_i];

  for (var _i2 = 0, _baseUseCases = baseUseCases; _i2 < _baseUseCases.length; _i2++) {
    var useCase = _baseUseCases[_i2];
    themes.push("".concat(useCase, " ").concat(color));
  }
}

var Chat =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Chat, _PureComponent);

  function Chat(props) {
    var _this;

    _classCallCheck(this, Chat);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Chat).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "notifyChatClient", function (isConnected) {
      if (_this.wsConnection != null) {
        if (isConnected) {
          _this.wsConnection.onlineStatusChanged({
            type: 'online'
          });
        } else {
          _this.wsConnection.onlineStatusChanged({
            type: 'offline'
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setConnectionListener", function () {
      NetInfo.isConnected.fetch().then(function (isConnected) {
        _this.notifyChatClient(isConnected);
      });
      NetInfo.addEventListener('connectionChange', _this.handleConnectionChange);
    });

    _defineProperty(_assertThisInitialized(_this), "handleConnectionChange", function () {
      NetInfo.isConnected.fetch().then(function (isConnected) {
        _this.notifyChatClient(isConnected);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setActiveChannel", function (channel, e) {
      if (e !== undefined && e.preventDefault) {
        e.preventDefault();
      }

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
        theme: _this.props.theme,
        isOnline: _this.state.isOnline,
        connectionRecovering: _this.state.connectionRecovering
      };
    });

    _this.state = {
      // currently active channel
      channel: {},
      isOnline: true,
      connectionRecovering: false
    };

    _this.setConnectionListener();

    _this.props.client.on('connection.changed', function (event) {
      _this.setState({
        isOnline: event.online,
        connectionRecovering: !event.online
      });
    });

    _this.props.client.on('connection.recovered', function () {
      _this.setState({
        connectionRecovering: false
      });
    });

    _this._unmounted = false;
    return _this;
  }

  _createClass(Chat, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unmounted = true;
      this.props.client.off('connection.recovered');
      this.props.client.off('connection.changed');
      this.props.client.off(this.handleEvent);
      NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement(ChatContext.Provider, {
        value: this.getContext()
      }, this.props.children);
    }
  }]);

  return Chat;
}(PureComponent);

_defineProperty(Chat, "propTypes", {
  /** The StreamChat client object */
  client: PropTypes.object.isRequired,

  /** The theme 'messaging', 'team', 'commerce', 'gaming', 'livestream' plus either 'light' or 'dark' */
  theme: PropTypes.oneOf(themes)
});

_defineProperty(Chat, "defaultProps", {
  theme: 'messaging light'
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
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(title, component) {
        var _ref2, _ref3, inputBoxPosition, chatBoxPosition;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.all([_this.getInputBoxPosition(), _this.getChatBoxPosition()]);

              case 2:
                _ref2 = _context.sent;
                _ref3 = _slicedToArray(_ref2, 2);
                inputBoxPosition = _ref3[0];
                chatBoxPosition = _ref3[1];

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
        return _ref.apply(this, arguments);
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
        var nodeHandleRoot = findNodeHandle(_this.rootView);

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
        var nodeHandleRoot = findNodeHandle(_this.rootView);

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
      suggestions: [],
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
      }), React__default.createElement(View, {
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

    _defineProperty(_assertThisInitialized(_this2), "renderItem", function (_ref4) {
      var item = _ref4.item;
      var _this2$props = _this2.props,
          onSelect = _this2$props.suggestions.onSelect,
          Component$$1 = _this2$props.component;
      return React__default.createElement(TouchableOpacity, {
        style: {
          height: SUGGESTIONS_ITEM_HEIGHT,
          justifyContent: 'center'
        },
        onPress: function onPress() {
          onSelect(item);
        }
      }, React__default.createElement(Component$$1, {
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
      return React__default.createElement(TouchableOpacity, {
        style: {
          position: 'absolute',
          zIndex: 90,
          height: backdropHeight,
          width: '100%'
        },
        onPress: handleDismiss
      }, React__default.createElement(View, {
        style: {
          position: 'absolute',
          bottom: 0,
          marginLeft: marginLeft,
          width: width,
          height: Math.min((data.length + 1) * SUGGESTIONS_ITEM_HEIGHT, 250),
          backgroundColor: 'white',
          shadowColor: '#EBEBEB',
          shadowOpacity: 1,
          shadowOffset: {
            width: 0,
            height: -3
          },
          zIndex: 100
        }
      }, React__default.createElement(FlatList, {
        ListHeaderComponent: React__default.createElement(SuggestionsHeader, {
          title: suggestionsTitle
        }),
        ItemSeparatorComponent: SuggestionsSeparator,
        data: data,
        keyboardShouldPersistTaps: "always",
        renderItem: this.renderItem,
        keyExtractor: function keyExtractor(item, index) {
          return item.name + index;
        }
      })));
    }
  }]);

  return SuggestionsView;
}(React__default.PureComponent);

var SuggestionsHeader = function SuggestionsHeader(_ref5) {
  var title = _ref5.title;
  return React__default.createElement(Text, {
    style: {
      padding: 10,
      height: SUGGESTIONS_ITEM_HEIGHT,
      fontWeight: 'bold'
    }
  }, title);
};

var SuggestionsSeparator = function SuggestionsSeparator() {
  return React__default.createElement(View, {
    style: {
      height: 0
    }
  });
};

var SUGGESTIONS_ITEM_HEIGHT = 50;

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
          return React__default.createElement(Text, null, "Loading channel list ...");

        case 'message':
          return React__default.createElement(Text, null, "Loading messages ...");

        case 'default':
        default:
          return React__default.createElement(Text, null, "Loading ...");
      }
    }
  }]);

  return LoadingIndicator;
}(React__default.PureComponent);

_defineProperty(LoadingIndicator, "propTypes", {
  listType: PropTypes.oneOf(['channel', 'message', 'default'])
});

_defineProperty(LoadingIndicator, "defaultProps", {
  listType: 'default'
});

var LoadingErrorIndicator = function LoadingErrorIndicator(_ref) {
  var listType = _ref.listType;
  var Loader;

  switch (listType) {
    case 'channel':
      Loader = React__default.createElement(Text, null, "Error loading channel list ...");
      break;

    case 'message':
      Loader = React__default.createElement(Text, null, "Error loading messages for this channel ...");
      break;

    default:
      Loader = React__default.createElement(Text, null, "Error loading");
      break;
  }

  return Loader;
};

var EmptyStateIndicator = function EmptyStateIndicator(_ref) {
  var listType = _ref.listType;
  var Indicator;

  switch (listType) {
    case 'channel':
      Indicator = React__default.createElement(Text, null, "You have no channels currently");
      break;

    case 'message':
      Indicator = null;
      break;

    default:
      Indicator = React__default.createElement(Text, null, "No itens exist");
      break;
  }

  return Indicator;
};

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

    _defineProperty(_assertThisInitialized(_this), "keyboardDidShow", function (e) {
      var keyboardHeight = e.startCoordinates.screenY - e.endCoordinates.screenY;

      _this.rootChannelView.measureInWindow(function (x, y) {
        var _Dimensions$get = Dimensions.get('window'),
            windowHeight = _Dimensions$get.height;

        Animated.timing(_this.state.channelHeight, {
          toValue: windowHeight - y - keyboardHeight,
          duration: 500
        }).start();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "keyboardDidHide", function () {
      Animated.timing(_this.state.channelHeight, {
        toValue: _this.initialHeight,
        duration: 500
      }).start();
    });

    _defineProperty(_assertThisInitialized(_this), "openThread", function (message, e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      var channel = _this.props.channel;
      var threadMessages = channel.state.threads[message.id] || [];

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
              _this.setState({
                threadLoadingMore: true
              });

              channel = _this.props.channel;
              parentID = _this.state.thread.id;
              oldMessages = channel.state.threads[parentID] || [];
              oldestMessageID = oldMessages[0] ? oldMessages[0].id : null;
              limit = 50;
              _context.next = 10;
              return channel.getReplies(parentID, {
                limit: limit,
                id_lt: oldestMessageID
              });

            case 10:
              queryResponse = _context.sent;
              hasMore = queryResponse.messages.length === limit;
              threadMessages = channel.state.threads[parentID] || []; // next set loadingMore to false so we can start asking for more data...

              _this._loadMoreThreadFinishedDebounced(hasMore, threadMessages);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "loadMoreThreadFinished", function (threadHasMore, threadMessages) {
      _this.setState({
        threadLoadingMore: false,
        threadHasMore: threadHasMore,
        threadMessages: threadMessages
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeThread", function (e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      _this.setState({
        thread: null,
        threadMessages: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setEditingState", function (message) {
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

      _this.setState(_objectSpread({
        messages: channel.state.messages
      }, extraState));
    });

    _defineProperty(_assertThisInitialized(_this), "clearEditingState", function () {
      _this.setState({
        editing: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "removeMessage", function (message) {
      var channel = _this.props.channel;
      channel.state.removeMessage(message);

      _this.setState({
        messages: channel.state.messages
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createMessagePreview", function (text, attachments, parent, mentioned_users) {
      // create a preview of the message
      var clientSideID = "".concat(_this.props.client.userID, "-") + uuidv4();
      var message = {
        text: text,
        html: text,
        __html: text,
        //id: tmpID,
        id: clientSideID,
        type: 'regular',
        status: 'sending',
        user: _objectSpread({
          id: _this.props.client.userID
        }, _this.props.client.user),
        created_at: new Date(),
        attachments: attachments,
        mentioned_users: mentioned_users,
        reactions: []
      };

      if (parent && parent.id) {
        message.parent_id = parent.id;
      }

      return message;
    });

    _defineProperty(_assertThisInitialized(_this), "_sendMessage",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(message) {
        var text, attachments, id, parent_id, mentioned_users, messageData, messageResponse;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                text = message.text, attachments = message.attachments, id = message.id, parent_id = message.parent_id, mentioned_users = message.mentioned_users;
                messageData = {
                  text: text,
                  attachments: attachments,
                  id: id,
                  parent_id: parent_id,
                  mentioned_users: mentioned_users
                };
                _context2.prev = 2;
                _context2.next = 5;
                return _this.props.channel.sendMessage(messageData);

              case 5:
                messageResponse = _context2.sent;

                // replace it after send is completed
                if (messageResponse.message) {
                  messageResponse.message.status = 'received';

                  _this.updateMessage(messageResponse.message);
                }

                _context2.next = 14;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](2);
                console.log(_context2.t0); // set the message to failed..

                message.status = 'failed';

                _this.updateMessage(message);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 9]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "sendMessage",
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(_ref3) {
        var text, _ref3$attachments, attachments, parent, mentioned_users, messagePreview;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                text = _ref3.text, _ref3$attachments = _ref3.attachments, attachments = _ref3$attachments === void 0 ? [] : _ref3$attachments, parent = _ref3.parent, mentioned_users = _ref3.mentioned_users;

                // remove error messages upon submit
                _this.props.channel.state.filterErrorMessages(); // create a local preview message to show in the UI


                messagePreview = _this.createMessagePreview(text, attachments, parent, mentioned_users); // first we add the message to the UI

                _this.updateMessage(messagePreview, {
                  messageInput: '',
                  commands: [],
                  userAutocomplete: []
                });

                _context3.next = 6;
                return _this._sendMessage(messagePreview);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "retrySendMessage",
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(message) {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // set the message status to sending
                message = message.asMutable();
                message.status = 'sending';

                _this.updateMessage(message); // actually try to send the message...


                _context4.next = 5;
                return _this._sendMessage(message);

              case 5:
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
        _this.setState(threadState);
      }

      _this._setStateThrottled({
        messages: channel.state.messages,
        watchers: channel.state.watchers,
        read: channel.state.read,
        typing: channel.state.typing,
        watcher_count: channel.state.watcher_count
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadMore",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee5() {
      var oldestID, perPage, queryResponse, hasMore;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!_this.state.loadingMore) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              _this.setState({
                loadingMore: true
              });

              oldestID = _this.state.messages[0] ? _this.state.messages[0].id : null;
              perPage = 100;
              _context5.prev = 5;
              _context5.next = 8;
              return _this.props.channel.query({
                messages: {
                  limit: perPage,
                  id_lt: oldestID
                }
              });

            case 8:
              queryResponse = _context5.sent;
              _context5.next = 16;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](5);
              console.warn('message pagination request failed with error', _context5.t0);

              _this.setState({
                loadingMore: false
              });

              return _context5.abrupt("return");

            case 16:
              hasMore = queryResponse.messages.length === perPage;

              _this._loadMoreFinishedDebounced(hasMore, _this.props.channel.state.messages);

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[5, 11]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "loadMoreFinished", function (hasMore, messages) {
      _this.setState({
        loadingMore: false,
        hasMore: hasMore,
        messages: messages
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getContext", function () {
      return _objectSpread({}, _this.state, {
        channels: _this.props.channels,
        client: _this.props.client,
        channel: _this.props.channel,
        Message: _this.props.Message,
        Attachment: _this.props.Attachment,
        updateMessage: _this.updateMessage,
        removeMessage: _this.removeMessage,
        sendMessage: _this.sendMessage,
        retrySendMessage: _this.retrySendMessage,
        resetNotification: _this.resetNotification,
        listenToScroll: _this.listenToScroll,
        setEditingState: _this.setEditingState,
        clearEditingState: _this.clearEditingState,
        EmptyStateIndicator: _this.props.EmptyStateIndicator,
        // thread related
        openThread: _this.openThread,
        closeThread: _this.closeThread,
        loadMoreThread: _this.loadMoreThread,
        openSuggestions: _this.openSuggestions,
        closeSuggestions: _this.closeSuggestions,
        updateSuggestions: _this.updateSuggestions
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
        listType: "message"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setRootChannelView", function (o) {
      _this.rootChannelView = o; // this.rootChannelView.measureInWindow((x, y, height, width) => { this.initialHeight = height; });
    });

    _defineProperty(_assertThisInitialized(_this), "onLayout", function (_ref7) {
      var height = _ref7.nativeEvent.layout.height;

      // Not to set initial height again.
      if (!_this.initialHeight) {
        _this.initialHeight = height;

        _this.setState({
          channelHeight: new Animated.Value(_this.initialHeight)
        });
      }
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
      channelHeight: '100%'
    }; // hard limit to prevent you from scrolling faster than 1 page per 2 seconds

    _this._loadMoreFinishedDebounced = debounce(_this.loadMoreFinished, 2000, {
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
    _this.rootChannelView = false;
    _this.messageInputBox = false;
    _this.initialHeight = undefined;
    return _this;
  }

  _createClass(ChannelInner, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.isOnline !== prevProps.isOnline) this.setState({
        online: this.props.isOnline
      });
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6() {
        var channel, errored;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                channel = this.props.channel;
                errored = false;

                if (channel.initialized) {
                  _context6.next = 12;
                  break;
                }

                _context6.prev = 3;
                _context6.next = 6;
                return channel.watch();

              case 6:
                _context6.next = 12;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](3);
                this.setState({
                  error: true
                });
                errored = true;

              case 12:
                // this.originalTitle = document.title;
                this.lastRead = new Date();

                if (!errored) {
                  this.copyChannelState();
                  this.listenToChanges();
                }

                this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardDidShow);
                this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardDidHide);

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[3, 8]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.channel.off(this.handleEvent);
      this.props.client.off('connection.recovered', this.handleEvent);

      this._loadMoreFinishedDebounced.cancel();

      this._loadMoreThreadFinishedDebounced.cancel();

      this._setStateThrottled.cancel();

      this._unmounted = true;
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
  }, {
    key: "copyChannelState",
    value: function copyChannelState() {
      var channel = this.props.channel;
      this.setState({
        messages: channel.state.messages,
        read: channel.state.read,
        watchers: channel.state.watchers,
        members: channel.state.members,
        watcher_count: channel.state.watcher_count,
        loading: false,
        typing: {}
      });
      channel.markRead();
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
      this.setState({
        messages: c.state.messages
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var core;

      if (this.state.error) {
        core = this.renderLoadingError();
      } else if (this.state.loading) {
        core = this.renderLoading();
      } else if (!this.props.channel || !this.props.channel.watch) {
        core = React__default.createElement(View, null, React__default.createElement(Text, null, "Channel Missing"));
      } else {
        core = React__default.createElement(Animated.View, {
          style: {
            display: 'flex',
            height: this.state.channelHeight
          },
          onLayout: this.onLayout
        }, React__default.createElement(View, {
          ref: this.setRootChannelView,
          collapsable: false
        }), React__default.createElement(ChannelContext.Provider, {
          value: this.getContext()
        }, React__default.createElement(SuggestionsProvider, {
          handleKeyboardAvoidingViewEnabled: function handleKeyboardAvoidingViewEnabled(trueOrFalse) {
            _this2.setState({
              kavEnabled: trueOrFalse
            });
          }
        }, this.renderComponent())));
      }

      return React__default.createElement(View, null, core);
    }
  }]);

  return ChannelInner;
}(PureComponent);

_defineProperty(ChannelInner, "propTypes", {
  /** Which channel to connect to */
  channel: PropTypes.shape({
    watch: PropTypes.func
  }).isRequired,

  /** Client is passed via the Chat Context */
  client: PropTypes.object.isRequired,

  /** The loading indicator to use */
  LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** The indicator to use when there is error  */
  LoadingErrorIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** The indicator to use when message list is empty */
  EmptyStateIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
});

_defineProperty(ChannelInner, "defaultProps", {
  LoadingIndicator: LoadingIndicator,
  LoadingErrorIndicator: LoadingErrorIndicator,
  EmptyStateIndicator: EmptyStateIndicator
});

var _class, _temp;
/**
 * Channel - Wrapper component for a channel. It needs to be place inside of the Chat component.
 * ChannelHeader, MessageList, Thread and MessageInput should be used as children of the Channel component.
 *
 * @example ./docs/Channel.md
 * @extends PureComponent
 */

var Channel = withChatContext((_temp = _class =
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
        return React__default.createElement(Text, null, "Please select a channel first");
      } // We use a wrapper to make sure the key variable is set.
      // this ensures that if you sw\itch channel the component is recreated


      return React__default.createElement(ChannelInner, _extends({}, this.props, {
        key: this.props.channel.cid
      }));
    }
  }]);

  return Channel;
}(PureComponent), _defineProperty(_class, "propTypes", {
  /** Which channel to connect to, will initialize the channel if it's not initialized yet */
  channel: PropTypes.shape({
    watch: PropTypes.func
  }).isRequired,

  /** Client is passed automatically via the Chat Context */
  client: PropTypes.object.isRequired,

  /** The loading indicator to use */
  // LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  Message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  Attachment: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}), _defineProperty(_class, "defaultProps", {// LoadingIndicator,
  // Message: MessageSimple,
  // Attachment,
}), _temp));

const img = require('.//assets/Poweredby_100px-White_VertText.png');

var Card =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card(props) {
    var _this;

    _classCallCheck(this, Card);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Card).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "trimUrl", function (url) {
      var trimmedUrl;

      if (url !== undefined || url !== null) {
        trimmedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
      }

      return trimmedUrl;
    });

    _defineProperty(_assertThisInitialized(_this), "_goToURL", function (url) {
      Linking.canOpenURL(url).then(function (supported) {
        if (supported) {
          Linking.openURL(url);
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
          title_link = _this$props.title_link,
          og_scrape_url = _this$props.og_scrape_url,
          type = _this$props.type;
      return React__default.createElement(TouchableOpacity, {
        onPress: function onPress() {
          _this2._goToURL(og_scrape_url || image_url || thumb_url);
        }
      }, React__default.createElement(Image, {
        source: {
          uri: image_url || thumb_url
        },
        resizeMethod: "resize",
        style: {
          height: 300,
          width: 200
        }
      }), React__default.createElement(View, {
        style: styles.Card.footer
      }, React__default.createElement(View, {
        style: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transperant'
        }
      }, title && React__default.createElement(Text, null, title), React__default.createElement(Text, null, this.trimUrl(title_link || og_scrape_url))), type === 'giphy' && React__default.createElement(Image, {
        source: img
      })));
    }
  }]);

  return Card;
}(React__default.Component);

_defineProperty(Card, "propTypes", {
  /** Title retured by the OG scraper */
  title: PropTypes.string.isRequired,

  /** Link retured by the OG scraper */
  title_link: PropTypes.string,

  /** The scraped url, used as a fallback if the OG-data doesnt include a link */
  og_scrape_url: PropTypes.string,

  /** The url of the full sized image */
  image_url: PropTypes.string,

  /** The url for thumbnail sized image*/
  thumb_url: PropTypes.string,

  /** Description retured by the OG scraper */
  text: PropTypes.string
});

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
'application/vnd.oasis.opendocument.text-flat-xml'];
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
'application/vnd.oasis.opendocument.spreadsheet-flat-xml'];
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
'application/vnd.oasis.opendocument.presentation-flat-xml'];
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

for (var _i$1 = 0, _wordMimeTypes = wordMimeTypes; _i$1 < _wordMimeTypes.length; _i$1++) {
  var type = _wordMimeTypes[_i$1];
  mimeTypeToIconMap[type] = img$2;
}

for (var _i2$1 = 0, _excelMimeTypes = excelMimeTypes; _i2$1 < _excelMimeTypes.length; _i2$1++) {
  var _type = _excelMimeTypes[_i2$1];
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
/**
 * @example ./examples/FileIcon.md
 */


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
      // const { size, big, filename, mimeType } = this.props;
      var mimeType = this.props.mimeType;
      return createElement(Image, {
        source: mimeTypeToIcon(mimeType)
      });
    }
  }]);

  return FileIcon;
}(Component);

/**
 * AttachmentActions - The actions you can take on an attachment
 *
 * @example ./docs/AttachmentActions.md
 * @extends PureComponent
 */

var AttachmentActions =
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
          actionHandler = _this$props.actionHandler,
          style = _this$props.style;
      var styles$$1 = buildStylesheet('AttachmentActions', style);
      return React__default.createElement(View, {
        style: styles$$1.container
      }, actions.map(function (action) {
        return React__default.createElement(TouchableOpacity, {
          key: "".concat(id, "-").concat(action.value),
          style: _objectSpread({}, styles$$1.button, styles$$1[action.style + 'Button']),
          onPress: actionHandler.bind(_this, action.name, action.value)
        }, React__default.createElement(Text, {
          style: styles$$1[action.style + 'ButtonText']
        }, action.text));
      }));
    }
  }]);

  return AttachmentActions;
}(React__default.PureComponent);

_defineProperty(AttachmentActions, "propTypes", {
  // /** The id of the form input */
  // id: PropTypes.string.isRequired,

  /** The text for the form input */
  text: PropTypes.string,

  /** A list of actions */
  actions: PropTypes.array.isRequired,

  /** The handler to execute after selecting an action */
  actionHandler: PropTypes.func.isRequired
});

var Gallery =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Gallery, _React$PureComponent);

  function Gallery(props) {
    var _this;

    _classCallCheck(this, Gallery);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Gallery).call(this, props));
    _this.state = {
      viewerModalOpen: false
    };
    return _this;
  }

  _createClass(Gallery, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var images = _toConsumableArray(this.props.images).map(function (i) {
        return {
          url: i.image_url || i.thumb_url
        };
      });

      return React__default.createElement(React__default.Fragment, null, images.map(function (image, i) {
        return React__default.createElement(TouchableOpacity, {
          key: "gallery-image-".concat(i),
          activeOpacity: 0.8,
          onPress: function onPress() {
            _this2.setState({
              viewerModalOpen: true
            });
          }
        }, React__default.createElement(Image, {
          source: {
            uri: image.url
          },
          style: {
            height: 200,
            width: 200
          }
        }));
      }), React__default.createElement(Modal, {
        visible: this.state.viewerModalOpen,
        transparent: true
      }, React__default.createElement(SafeAreaView, {
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
}(React__default.PureComponent);

_defineProperty(Gallery, "propTypes", {
  /** The images to render */
  images: PropTypes.arrayOf(PropTypes.shape({
    image_url: PropTypes.string,
    thumb_url: PropTypes.string
  }))
});

var GalleryHeader = function GalleryHeader(_ref) {
  var handleDismiss = _ref.handleDismiss;
  return React__default.createElement(View, {
    style: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      position: 'absolute',
      width: '100%',
      zIndex: 1000
    }
  }, React__default.createElement(TouchableOpacity, {
    onPress: handleDismiss,
    style: {
      backgroundColor: '#ebebeb',
      width: 30,
      height: 30,
      marginRight: 20,
      marginTop: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20
    }
  }, React__default.createElement(Text, null, "X")));
};

var Attachment =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Attachment, _React$Component);

  function Attachment(props) {
    var _this;

    _classCallCheck(this, Attachment);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Attachment).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_goToURL", function (url) {
      Linking.canOpenURL(url).then(function (supported) {
        if (supported) {
          Linking.openURL(url);
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

      if (type === 'image') {
        return React__default.createElement(Gallery, {
          images: [a]
        });
      }

      if (a.type === 'giphy' || type === 'card') {
        if (a.actions && a.actions.length) {
          return React__default.createElement(View, null, React__default.createElement(Card, a), React__default.createElement(AttachmentActions, _extends({
            key: 'key-actions-' + a.id
          }, a, {
            actionHandler: this.props.actionHandler
          })));
        } else {
          return React__default.createElement(Card, a);
        }
      }

      if (a.type === 'file') {
        return React__default.createElement(TouchableOpacity, {
          onPress: function onPress() {
            _this2._goToURL(a.asset_url);
          }
        }, React__default.createElement(View, {
          style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#EBEBEB',
            padding: 10,
            borderRadius: 16
          }
        }, React__default.createElement(FileIcon, {
          filename: a.title,
          mimeType: a.mime_type,
          size: 50
        }), React__default.createElement(View, {
          style: {
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 10
          }
        }, React__default.createElement(Text, {
          ellipsizeMode: "tail",
          numberOfLines: 2,
          style: {
            fontWeight: 'bold'
          }
        }, a.title), React__default.createElement(Text, null, a.file_size, " KB"))));
      }

      if (a.type === 'video' && a.asset_url && a.image_url) {
        return React__default.createElement(TouchableOpacity, {
          onPress: function onPress() {
            _this2._goToURL(a.asset_url);
          }
        }, React__default.createElement(Image, {
          resizeMode: "stretch",
          style: {
            height: 200,
            width: 250,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          },
          source: {
            uri: a.image_url
          }
        }), React__default.createElement(View, {
          style: {
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            backgroundColor: '#EBEBEB',
            padding: 10
          }
        }, React__default.createElement(Text, {
          style: {
            fontWeight: 'bold'
          }
        }, a.title)));
      }

      return false;
    }
  }]);

  return Attachment;
}(React__default.Component);

_defineProperty(Attachment, "propTypes", {
  /** The attachment to render */
  attachment: PropTypes.object.isRequired
});

const img$6 = require('.//images/loading.gif');

const img$7 = require('.//images/icons/delivered_unseen.png');

var MessageStatus = function MessageStatus(_ref) {
  var message = _ref.message,
      lastReceivedId = _ref.lastReceivedId,
      threadList = _ref.threadList;

  if (message.status === 'sending') {
    return React__default.createElement(View, {
      style: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
      }
    }, React__default.createElement(Image, {
      source: img$6,
      style: {
        height: 10,
        width: 10
      }
    }));
  } else if (message.status === 'received' && message.type !== 'ephemeral' && message.id === lastReceivedId && !threadList) {
    return React__default.createElement(View, {
      style: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 2
      }
    }, React__default.createElement(Image, {
      source: img$7
    }));
  } else {
    return React__default.createElement(View, {
      style: {
        height: 10,
        width: 20
      }
    });
  }
};

var MentionsItem =
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
          icon = _this$props$item.icon;
      return React__default.createElement(View, {
        style: {
          flexDirection: 'row',
          alignItems: 'center'
        }
      }, React__default.createElement(Avatar, {
        image: icon
      }), React__default.createElement(Text, {
        style: {
          padding: 10
        }
      }, name));
    }
  }]);

  return MentionsItem;
}(React__default.Component);

var CommandsItem =
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
      return React__default.createElement(View, {
        style: {
          flexDirection: 'column',
          padding: 10
        }
      }, React__default.createElement(View, {
        style: {
          flexDirection: 'row',
          alignItems: 'center'
        }
      }, React__default.createElement(Text, {
        style: {
          fontWeight: 'bold'
        }
      }, "/", name, " "), React__default.createElement(Text, null, args)), React__default.createElement(Text, null, description));
    }
  }]);

  return CommandsItem;
}(React__default.Component);

var renderText = function renderText(message) {
  // take the @ mentions and turn them into markdown?
  // translate links
  var text = message.text;
  var mentioned_users = message.mentioned_users;

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
      var displayLink = truncate(urlInfo.encoded.replace(/^(www\.)/, ''), {
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

  return React__default.createElement(Markdown, {
    styles: markdownStyles
  }, newText);
};
var markdownStyles = {
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

var ReactionList =
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
        return reactionTypes.indexOf(type) > -1 ? React__default.createElement(Text, {
          key: type
        }, emojiDataByType[type].icon) : null;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getReactionCount", function (reactionCounts) {
      var count = null;

      if (reactionCounts !== null && reactionCounts !== undefined && Object.keys(reactionCounts).length > 0) {
        count = 0;
        Object.keys(reactionCounts).map(function (key) {
          return count += reactionCounts[key];
        });
      }

      return count;
    });

    return _this;
  }

  _createClass(ReactionList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          latestReactions = _this$props.latestReactions,
          openReactionSelector = _this$props.openReactionSelector,
          reactionCounts = _this$props.reactionCounts,
          visible = _this$props.visible;
      return React__default.createElement(TouchableOpacity, {
        onPress: openReactionSelector,
        activeOpacity: 1
      }, React__default.createElement(View, {
        style: {
          opacity: visible ? 1 : 0,
          display: 'flex',
          flexDirection: 'row',
          padding: 5,
          backgroundColor: 'black',
          borderRadius: 10
        }
      }, this._renderReactions(latestReactions), React__default.createElement(Text, {
        style: {
          color: 'white',
          paddingLeft: 5,
          paddingRight: 5
        }
      }, this._getReactionCount(reactionCounts))));
    }
  }]);

  return ReactionList;
}(React__default.PureComponent);

var ReactionPicker =
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
          reactionPickerVisible = _this$props.reactionPickerVisible,
          handleDismiss = _this$props.handleDismiss,
          handleReaction = _this$props.handleReaction,
          latestReactions = _this$props.latestReactions,
          reactionCounts = _this$props.reactionCounts,
          rpLeft = _this$props.rpLeft,
          rpTop = _this$props.rpTop,
          rpRight = _this$props.rpRight,
          style = _this$props.style;
      if (!reactionPickerVisible) return null;
      var position = {
        marginTop: rpTop
      };
      if (rpLeft) position.marginLeft = rpLeft;
      if (rpRight) position.marginRight = rpRight;
      var styles$$1 = buildStylesheet('ReactionPicker', style);
      return React__default.createElement(Modal, {
        visible: reactionPickerVisible,
        transparent: true,
        animationType: "fade",
        onRequestClose: handleDismiss
      }, reactionPickerVisible && React__default.createElement(TouchableOpacity, {
        onPress: handleDismiss,
        style: {
          flex: 1,
          alignItems: rpLeft ? 'flex-start' : 'flex-end'
        },
        activeOpacity: 1
      }, React__default.createElement(View, {
        style: _objectSpread({}, styles$$1.container, position)
      }, emojiData.map(function (_ref) {
        var id = _ref.id,
            icon = _ref.icon;

        var latestUser = _this2.getLatestUser(latestReactions, id);

        var count = reactionCounts && reactionCounts[id];
        return React__default.createElement(View, {
          key: id,
          style: styles$$1.reactionColumn
        }, latestUser !== 'NotFound' ? React__default.createElement(Avatar, {
          image: latestUser.image,
          alt: latestUser.id,
          size: 20,
          style: {
            image: {
              borderColor: 'white',
              borderWidth: 1
            }
          },
          name: latestUser.id
        }) : React__default.createElement(View, {
          style: {
            height: 20,
            width: 20
          }
        }), React__default.createElement(Text, {
          style: {
            fontSize: 30
          },
          onPress: function onPress() {
            handleReaction(id);
          }
        }, icon), React__default.createElement(Text, {
          style: styles$$1.reactionCount
        }, count > 0 ? count : ''));
      }))));
    }
  }]);

  return ReactionPicker;
}(React__default.PureComponent);

var MessageText = function MessageText(_ref) {
  var message = _ref.message,
      _ref$isMyMessage = _ref.isMyMessage,
      isMyMessage = _ref$isMyMessage === void 0 ? function () {
    return false;
  } : _ref$isMyMessage,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? null : _ref$style;
  var pos = isMyMessage(message) ? 'right' : 'left';
  var groupStyles = (isMyMessage(message) ? 'right' : 'left') + capitalize(message.groupPosition[0]);
  if (!message.text) return false;
  var styles$$1 = buildStylesheet('MessageSimpleText', style);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(View, {
    style: _objectSpread({}, styles$$1.container, styles$$1[pos], styles$$1[groupStyles], styles$$1[message.status])
  }, renderText(message)));
};

const img$8 = require('.//images/icons/icon_path.png');

var MessageReplies = function MessageReplies(_ref) {
  var message = _ref.message,
      isThreadList = _ref.isThreadList,
      openThread = _ref.openThread,
      pos = _ref.pos;
  if (isThreadList || !message.reply_count) return null;
  return React__default.createElement(TouchableOpacity, {
    onPress: openThread,
    style: {
      padding: 5,
      flexDirection: 'row'
    }
  }, pos === 'left' ? React__default.createElement(Image, {
    source: img$8
  }) : null, React__default.createElement(Text, {
    style: {
      color: '#006CFF'
    }
  }, message.reply_count, " ", message.reply_count === 1 ? 'Reply' : 'Replies'), pos === 'right' ? React__default.createElement(Image, {
    style: {
      transform: [{
        rotateY: '180deg'
      }]
    },
    source: img$8
  }) : null);
};

var MessageContent =
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

    _defineProperty(_assertThisInitialized(_this), "onMessageTouch", function () {
      _this.props.onMessageTouch(_this.props.message.id);
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
              return _this.props.Message.handleDelete();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "handleEdit", function () {
      _this.props.Message.handleEdit();
    });

    _defineProperty(_assertThisInitialized(_this), "openReactionSelector", function () {
      var _this$props = _this.props,
          isMyMessage = _this$props.isMyMessage,
          message = _this$props.message;
      var pos = isMyMessage(message) ? 'right' : 'left';

      _this.messageContainer.measureInWindow(function (x, y, width) {
        _this.setState({
          reactionPickerVisible: true,
          rpTop: y - REACTION_PICKER_HEIGHT,
          rpLeft: pos === 'left' ? x : null,
          rpRight: pos === 'right' ? Math.round(Dimensions.get('window').width) - (x + width) : null
        });
      });
    });

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
          activeMessageId = _this$props2.activeMessageId,
          Message = _this$props2.Message,
          handleReaction = _this$props2.handleReaction,
          threadList = _this$props2.threadList,
          retrySendMessage = _this$props2.retrySendMessage,
          messageActions = _this$props2.messageActions,
          style = _this$props2.style;
      var hasAttachment = Boolean(message && message.attachments && message.attachments.length);
      var pos = isMyMessage(message) ? 'right' : 'left';
      var styles$$1 = buildStylesheet('MessageSimpleContent', style);
      var showTime = message.groupPosition[0] === 'single' || message.groupPosition[0] === 'bottom' ? true : false;
      var options = [{
        id: 'cancel',
        title: 'Cancel'
      }];
      var images = hasAttachment && message.attachments.filter(function (item) {
        return item.type === 'image';
      });

      if (messageActions && messageActions.indexOf(MESSAGE_ACTIONS.reactions) > -1) {
        options.splice(1, 0, {
          id: MESSAGE_ACTIONS.reactions,
          title: 'Add Reaction'
        });
      }

      if (messageActions && messageActions.indexOf(MESSAGE_ACTIONS.reply) > -1 && !threadList) {
        options.splice(1, 0, {
          id: MESSAGE_ACTIONS.reply,
          title: 'Reply'
        });
      }

      if (messageActions && messageActions.indexOf(MESSAGE_ACTIONS.edit) > -1 && Message.canEditMessage()) options.splice(1, 0, {
        id: MESSAGE_ACTIONS.edit,
        title: 'Edit Message'
      });
      if (messageActions && messageActions.indexOf(MESSAGE_ACTIONS["delete"]) > -1 && Message.canDeleteMessage()) options.splice(1, 0, {
        id: MESSAGE_ACTIONS["delete"],
        title: 'Delete Message'
      });
      if (message.deleted_at) return React__default.createElement(View, {
        style: _objectSpread({}, styles$$1.container, styles$$1[pos], {
          padding: 5
        })
      }, React__default.createElement(Text, {
        style: _objectSpread({}, styles$$1.deletedText, styles$$1.text)
      }, "This message was deleted ..."));
      var contentProps = {
        style: _objectSpread({}, styles$$1.container, styles$$1[pos], styles$$1[message.status] ? styles$$1[message.status] : {}),
        onLongPress: options.length > 1 ? this.showActionSheet : null,
        activeOpacity: 0.7,
        disabled: readOnly
      };
      if (message.status === 'failed') contentProps.onPress = retrySendMessage.bind(this, Immutable(message));
      return React__default.createElement(TouchableOpacity, contentProps, message.status === 'failed' ? React__default.createElement(Text, null, "Message failed - try again") : null, message.latest_reactions && message.latest_reactions.length > 0 && React__default.createElement(ReactionList, {
        visible: !this.state.reactionPickerVisible,
        latestReactions: message.latest_reactions,
        openReactionSelector: this.openReactionSelector,
        reactionCounts: message.reaction_counts
      }), React__default.createElement(View, {
        ref: function ref(o) {
          return _this2.messageContainer = o;
        },
        collapsable: false,
        style: {
          alignItems: 'flex-end'
        }
      }, hasAttachment && images.length <= 1 && message.attachments.map(function (attachment, index) {
        return React__default.createElement(Attachment, {
          key: "".concat(message.id, "-").concat(index),
          attachment: attachment,
          actionHandler: _this2.props.handleAction
        });
      }), images.length > 1 && React__default.createElement(Gallery, {
        images: images
      }), React__default.createElement(MessageText, {
        message: message,
        isMyMessage: isMyMessage,
        disabled: message.status === 'failed',
        onMessageTouch: this.onMessageTouch,
        activeMessageId: activeMessageId,
        Message: Message,
        openThread: this.openThread,
        handleReaction: handleReaction
      })), React__default.createElement(MessageReplies, {
        message: message,
        isThreadList: !!threadList,
        openThread: this.openThread,
        pos: pos
      }), showTime ? React__default.createElement(View, {
        style: styles$$1.metaContainer
      }, React__default.createElement(Text, {
        style: _objectSpread({}, styles$$1.metaText, {
          textAlign: pos
        })
      }, Moment(message.created_at).format('h:mmA'))) : null, React__default.createElement(ActionSheetCustom, {
        ref: function ref(o) {
          _this2.ActionSheet = o;
        },
        title: React__default.createElement(Text, null, "Choose an action"),
        options: options.map(function (o) {
          return o.title;
        }),
        cancelButtonIndex: 0,
        destructiveButtonIndex: 0,
        onPress: function onPress(index) {
          return _this2.onActionPress(options[index].id);
        }
      }), React__default.createElement(ReactionPicker, {
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
        rpTop: this.state.rpTop
      }));
    }
  }]);

  return MessageContent;
}(React__default.PureComponent);

var MessageAvatar = function MessageAvatar(_ref) {
  var message = _ref.message,
      isMyMessage = _ref.isMyMessage,
      style = _ref.style;
  var pos = isMyMessage(message) ? 'right' : 'left';
  var styles$$1 = buildStylesheet('MessageSimpleAvatar', style);
  var showAvatar = message.groupPosition[0] === 'single' || message.groupPosition[0] === 'bottom' ? true : false;
  return React__default.createElement(View, {
    style: _objectSpread({}, styles$$1[pos])
  }, showAvatar ? React__default.createElement(Avatar, {
    image: message.user.image,
    size: 32,
    name: message.user.name
  }) : React__default.createElement(View, {
    style: {
      width: 32,
      height: 28
    }
  }));
};

var MessageSimple =
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
          style = _this$props.style,
          editing = _this$props.editing;
      var styles$$1 = buildStylesheet('MessageSimple', style);
      var pos = isMyMessage(message) ? 'right' : 'left';
      var bottomMargin = message.groupPosition[0] === 'single' || message.groupPosition[0] === 'bottom' ? 'bottom' : null;
      return React__default.createElement(View, {
        style: _objectSpread({}, styles$$1.container, styles$$1[pos], styles$$1[bottomMargin], {
          backgroundColor: editing.id === message.id ? 'pink' : 'white'
        })
      }, isMyMessage(message) ? React__default.createElement(React__default.Fragment, null, React__default.createElement(MessageContent, this.props), React__default.createElement(MessageAvatar, this.props), React__default.createElement(MessageStatus, this.props)) : React__default.createElement(React__default.Fragment, null, React__default.createElement(MessageAvatar, this.props), React__default.createElement(MessageContent, this.props)));
    }
  }]);

  return MessageSimple;
}(React__default.PureComponent);

var _class$1, _temp$1;
var Message = withChannelContext((_temp$1 = _class$1 =
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
        }, _callee4, null, [[6, 10, 14, 22], [15,, 17, 21], [24, 29]]);
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
      } // editing is the last one which can trigger a change..


      if (!shouldUpdate && nextProps.messageListRect !== this.props.messageListRect) {
        shouldUpdate = true;
      }

      return shouldUpdate;
    }
  }, {
    key: "render",
    value: function render() {
      var message = this.props.message;
      var actionsEnabled = message.type === 'regular' && message.status === 'received';
      var Component$$1 = this.props.Message;
      return React__default.createElement(Component$$1, _extends({}, this.props, {
        actionsEnabled: actionsEnabled,
        Message: this,
        handleReaction: this.handleReaction,
        handleFlag: this.handleFlag,
        handleMute: this.handleMute,
        handleAction: this.handleAction,
        handleReply: this.handleReply,
        handleRetry: this.handleRetry,
        isMyMessage: this.isMyMessage,
        openThread: this.props.openThread && this.props.openThread.bind(this, message)
      }));
    }
  }]);

  return Message;
}(React__default.Component), _defineProperty(_class$1, "propTypes", {
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

  /** The message rendering component, the Message component delegates its rendering logic to this component */
  Message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** Allows you to overwrite the attachment component */
  Attachment: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  messageActions: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
}), _defineProperty(_class$1, "defaultProps", {
  Message: MessageSimple,
  messageActions: Object.keys(MESSAGE_ACTIONS),
  readBy: [],
  groupStyles: [],
  Attachment: Attachment,
  editing: false
}), _temp$1));

var MessageNotification =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MessageNotification, _PureComponent);

  function MessageNotification() {
    _classCallCheck(this, MessageNotification);

    return _possibleConstructorReturn(this, _getPrototypeOf(MessageNotification).apply(this, arguments));
  }

  _createClass(MessageNotification, [{
    key: "render",
    value: function render() {
      var styles$$1 = buildStylesheet('MessageNotification', this.props.style);

      if (!this.props.showNotification) {
        return null;
      } else {
        return React__default.createElement(TouchableOpacity, {
          onPress: this.props.onClick,
          style: styles$$1.container,
          onClick: this.props.onClick
        }, this.props.children);
      }
    }
  }]);

  return MessageNotification;
}(PureComponent);

_defineProperty(MessageNotification, "propTypes", {
  /** If we should show the notification or not */
  showNotification: PropTypes.bool,

  /** Onclick handler */
  onClick: PropTypes.func.isRequired,

  /** Style overrides */
  style: PropTypes.object
});

_defineProperty(MessageNotification, "defaultProps", {
  showNotification: true
});

var DateSeparator = function DateSeparator(_ref) {
  var message = _ref.message,
      formatDate = _ref.formatDate,
      date = _ref.date;
  return React__default.createElement(View, {
    style: styles.DateSeparator.container,
    collapsable: false
  }, React__default.createElement(View, {
    style: styles.DateSeparator.dividingLines
  }), React__default.createElement(Text, {
    style: styles.DateSeparator.date
  }, formatDate ? formatDate(date) : Moment(message.date.toISOString()).calendar(null, {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[Last] dddd',
    nextWeek: 'dddd',
    sameElse: 'L'
  })), React__default.createElement(View, {
    style: styles.DateSeparator.dividingLines
  }));
};

var _class$2, _temp$2;
var MessageList = withChannelContext((_temp$2 = _class$2 =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MessageList, _PureComponent);

  function MessageList(props) {
    var _this;

    _classCallCheck(this, MessageList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageList).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "insertDates", function (messages) {
      var newMessages = [];
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

    _defineProperty(_assertThisInitialized(_this), "assignGroupPositions", function (m) {
      var l = m.length;
      var newMessages = [];

      var messages = _toConsumableArray(m);

      for (var i = 0; i < l; i++) {
        var previousMessage = messages[i - 1];
        var message = messages[i];
        var nextMessage = messages[i + 1];
        var groupStyles = [];

        if (message.type === 'message.date') {
          newMessages.unshift(_objectSpread({}, message, {
            groupPosition: []
          }));
          continue;
        }

        var userId = message.user.id;
        var isTopMessage = !previousMessage || previousMessage.type === 'message.date' || previousMessage.attachments.length !== 0 || userId !== previousMessage.user.id || previousMessage.type === 'error' || previousMessage.deleted_at;
        var isBottomMessage = !nextMessage || nextMessage.type === 'message.date' || nextMessage.attachments.length !== 0 || userId !== nextMessage.user.id || nextMessage.type === 'error' || nextMessage.deleted_at;

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

        newMessages.unshift(_objectSpread({}, message, {
          groupPosition: groupStyles
        }));
      }

      return newMessages;
    });

    _defineProperty(_assertThisInitialized(_this), "goToNewMessages", function () {
      _this.setState({
        newMessagesNotification: false
      });

      _this.flatList.scrollToIndex({
        index: 0
      });
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

      _this.setState({
        lastReceivedId: lastReceivedId
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (_ref) {
      var message = _ref.item;

      if (message.type === 'message.date') {
        var _DateSeparator = _this.props.dateSeparator;
        return React__default.createElement(_DateSeparator, {
          message: message
        });
      }

      return React__default.createElement(Message, {
        onThreadSelect: _this.props.onThreadSelect,
        message: message,
        Message: _this.props.Message,
        lastReceivedId: _this.state.lastReceivedId === message.id ? _this.state.lastReceivedId : null,
        onMessageTouch: _this.onMessageTouch,
        activeMessageId: _this.state.activeMessageId,
        setEditingState: _this.props.setEditingState,
        editing: _this.props.editing,
        threadList: _this.props.threadList,
        messageActions: _this.props.messageActions
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function (event) {
      var yOffset = event.nativeEvent.contentOffset.y;

      _this.setState({
        yOffset: yOffset
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMessageTouch", function (id) {
      _this.setState({
        activeMessageId: id
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
      activeMessageId: false,
      online: props.online
    };
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
      var userScrolledUp = this.state.yOffset > 0;
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

      // We can't provide ListEmptyComponent to FlatList when inverted flag is set.
      // https://github.com/facebook/react-native/issues/21196
      if (this.props.messages && this.props.messages.length === 0) {
        return React__default.createElement(View, {
          style: {
            flex: 1
          }
        }, this.renderEmptyState());
      }

      var messagesWithDates = this.insertDates(this.props.messages);
      var messagesWithGroupPositions = this.assignGroupPositions(messagesWithDates);
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(FlatList, {
        ref: function ref(fl) {
          return _this2.flatList = fl;
        },
        style: {
          flex: 1,
          paddingLeft: 10,
          paddingRight: 10
        },
        data: messagesWithGroupPositions,
        onScroll: this.handleScroll,
        ListFooterComponent: this.props.headerComponent,
        onEndReached: this.props.loadMore,
        inverted: true,
        keyExtractor: function keyExtractor(item) {
          return item.id || item.created_at || item.date.toISOString();
        },
        renderItem: this.renderItem,
        maintainVisibleContentPosition: {
          minIndexForVisible: 1,
          autoscrollToTopThreshold: 10
        }
      }), this.state.newMessagesNotification && React__default.createElement(MessageNotification, {
        showNotification: this.state.newMessagesNotification,
        onClick: this.goToNewMessages
      }, React__default.createElement(View, {
        style: {
          borderRadius: 10,
          backgroundColor: 'black',
          color: 'white',
          padding: 10
        }
      }, React__default.createElement(Text, {
        style: {
          color: 'white'
        }
      }, "New Messages \u2193"))), React__default.createElement(Notification, {
        type: "warning",
        active: !this.state.online
      }, React__default.createElement(Text, {
        style: styles.Notification.warning
      }, "Connection failure, reconnecting now ...")));
    }
  }]);

  return MessageList;
}(PureComponent), _defineProperty(_class$2, "propTypes", {
  /** A list of immutable messages */
  messages: PropTypes.array.isRequired,

  /** Turn off grouping of messages by user */
  noGroupByUser: PropTypes.bool,
  online: PropTypes.bool,

  /** The message rendering component, the Message component delegates its rendering logic to this component */
  Message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  dateSeparator: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}), _defineProperty(_class$2, "defaultProps", {
  dateSeparator: DateSeparator
}), _temp$2));

var Notification = function Notification(_ref2) {
  var children = _ref2.children,
      active = _ref2.active,
      type = _ref2.type;

  if (active) {
    return React__default.createElement(View, {
      style: _objectSpread({}, styles.Notification.container, styles.Notification[type])
    }, children);
  }

  return null;
};

const img$9 = require('.//images/icons/icon_edit.png');

const img$a = require('.//images/icons/icon_new_message.png');

const img$b = require('.//images/reload1.png');

var WithProgressIndicator =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(WithProgressIndicator, _React$PureComponent);

  function WithProgressIndicator(props) {
    _classCallCheck(this, WithProgressIndicator);

    return _possibleConstructorReturn(this, _getPrototypeOf(WithProgressIndicator).call(this, props));
  }

  _createClass(WithProgressIndicator, [{
    key: "render",
    value: function render() {
      if (!this.props.active) {
        return React__default.createElement(View, null, this.props.children);
      }

      return React__default.createElement(TouchableOpacity, {
        onPress: this.props.action
      }, this.props.children, React__default.createElement(View, {
        style: {
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          opacity: 0.3
        }
      }), React__default.createElement(View, {
        style: {
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transperant'
        }
      }, this.props.type === ProgressIndicatorTypes.IN_PROGRESS && React__default.createElement(ActivityIndicator, {
        color: "white"
      }), this.props.type === ProgressIndicatorTypes.RETRY && React__default.createElement(Image, {
        source: img$b,
        style: {
          height: 25,
          width: 25
        }
      })));
    }
  }]);

  return WithProgressIndicator;
}(React__default.PureComponent);

_defineProperty(WithProgressIndicator, "propTypes", {
  active: PropTypes.bool,
  type: PropTypes.oneOf([ProgressIndicatorTypes.IN_PROGRESS, ProgressIndicatorTypes.RETRY]),
  action: PropTypes.func
});

/**
 * ImageUploadPreview
 *
 * @example ./docs/ImageUploadPreview.md
 * @extends PureComponent
 */

var ImageUploadPreview =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ImageUploadPreview, _React$PureComponent);

  function ImageUploadPreview(props) {
    var _this;

    _classCallCheck(this, ImageUploadPreview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageUploadPreview).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_renderItem", function (_ref) {
      var item = _ref.item;
      var type;
      if (item.state === FileState.UPLOADING) type = ProgressIndicatorTypes.IN_PROGRESS;
      if (item.state === FileState.UPLOAD_FAILED) type = ProgressIndicatorTypes.RETRY;
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(View, {
        style: {
          padding: 5,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start'
        }
      }, React__default.createElement(WithProgressIndicator, {
        active: item.state !== FileState.UPLOADED,
        type: type,
        action: _this.props.retryUpload.bind(_assertThisInitialized(_this), item.id)
      }, React__default.createElement(Image, {
        source: {
          uri: item.url
        },
        style: {
          height: 100,
          width: 100,
          borderRadius: 10
        }
      })), React__default.createElement(TouchableOpacity, {
        style: {
          backgroundColor: '#ebebeb',
          width: 25,
          height: 25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          marginLeft: -25
        },
        onPress: function onPress() {
          _this.props.removeImage(item.id);
        }
      }, React__default.createElement(Text, null, "X"))));
    });

    return _this;
  }

  _createClass(ImageUploadPreview, [{
    key: "render",
    value: function render() {
      if (!this.props.imageUploads || this.props.imageUploads.length === 0) return null;
      return React__default.createElement(View, {
        style: {
          height: 100,
          display: 'flex'
        }
      }, React__default.createElement(FlatList, {
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
}(React__default.PureComponent);

_defineProperty(ImageUploadPreview, "propTypes", {
  imageUploads: PropTypes.array.isRequired,
  removeImage: PropTypes.func,
  retryUpload: PropTypes.func
});

/**
 * FileUploadPreview
 *
 * @example ./docs/FileUploadPreview.md
 * @extends PureComponent
 */

var FILE_PREVIEW_HEIGHT = 50;
var FILE_PREVIEW_PADDING = 10;
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
      return React__default.createElement(WithProgressIndicator, {
        active: item.state !== FileState.UPLOADED,
        type: type,
        action: _this.props.retryUpload.bind(_assertThisInitialized(_this), item.id)
      }, React__default.createElement(View, {
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
      }, React__default.createElement(View, {
        style: {
          flexDirection: 'row',
          alignItems: 'center'
        }
      }, React__default.createElement(FileIcon, {
        filename: item.file.name,
        mimeType: item.file.type,
        size: 20
      }), React__default.createElement(Text, {
        style: {
          paddingLeft: 10
        }
      }, item.file.name.length > 35 ? item.file.name.substring(0, 35).concat('...') : item.file.name)), React__default.createElement(Text, {
        onPress: _this.props.removeFile.bind(_assertThisInitialized(_this), item.id)
      }, "X")));
    });

    return _this;
  }

  _createClass(FileUploadPreview, [{
    key: "render",
    value: function render() {
      if (!this.props.fileUploads || this.props.fileUploads.length === 0) return null;
      return React__default.createElement(View, {
        style: {
          display: 'flex',
          height: this.props.fileUploads.length * (FILE_PREVIEW_HEIGHT + 5),
          marginRight: 10,
          marginLeft: 10
        }
      }, React__default.createElement(FlatList, {
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
  retryUpload: PropTypes.func
});

const img$c = require('.//images/icons/gallery.png');

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

    _defineProperty(_assertThisInitialized(_this), "handleSelectionChange", function (_ref) {
      var _ref$nativeEvent$sele = _ref.nativeEvent.selection,
          start = _ref$nativeEvent$sele.start,
          end = _ref$nativeEvent$sele.end;

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
    _asyncToGenerator(
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
    })));

    _defineProperty(_assertThisInitialized(_this), "_createRegExp", function () {
      var triggers = _this.props.triggerSettings; // negative lookahead to match only the trigger + the actual token = "bladhwd:adawd:word test" => ":word"
      // https://stackoverflow.com/a/8057827/2719917

      _this.tokenRegExp = new RegExp("([".concat(Object.keys(triggers).join(''), "])(?:(?!\\1)[^\\s])*$"));
    });

    _defineProperty(_assertThisInitialized(_this), "handleSuggestions",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(text) {
        var selectionEnd, minChar, tokenMatch, lastToken, triggers, currentTrigger, actualToken;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // console.log('in handle suggestions: ' + text);
                selectionEnd = _this.state.selectionEnd; // TODO: Move these const to props

                minChar = 0;
                tokenMatch = _this.tokenRegExp.exec(text.slice(0, selectionEnd));
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
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());

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
        onSelect: this.onSelectSuggestion,
        output: triggers[this.state.currentTrigger].output
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var styles$$1 = buildStylesheet('MessageInput', this.props.style); // console.log('RENDERING THE COMPONENT: ' + this.state.text);

      return React__default.createElement(TextInput, {
        ref: this.props.setInputBoxRef,
        style: styles$$1.inputBox,
        placeholder: "Write your message",
        onChangeText: function onChangeText(text) {
          _this2.handleChange(text);
        },
        numberOfLines: 20,
        value: this.state.text,
        onSelectionChange: this.handleSelectionChange,
        multiline: true
      });
    }
  }]);

  return AutoCompleteInput;
}(React__default.PureComponent);

_defineProperty(AutoCompleteInput, "propTypes", {
  value: PropTypes.string,
  openSuggestions: PropTypes.func,
  closeSuggestions: PropTypes.func,
  triggerSettings: PropTypes.object,
  getUsers: PropTypes.func,
  setInputBoxRef: PropTypes.func
});

_defineProperty(AutoCompleteInput, "defaultProps", {
  value: ''
});

var _class$3, _temp$3;

function generateRandomId() {
  // prettier-ignore
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function S4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}

var MessageInput = withSuggestionsContext(withChannelContext((_temp$3 = _class$3 =
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
          console.log(mentioned_users);
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
          var _id3 = _step2.value;
          var image = _this.state.imageUploads[_id3];

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
          var _id4 = _step3.value;
          var upload = _this.state.fileUploads[_id4];

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
        var id = _this.props.editing.id;
        var updatedMessage = {
          id: id
        };
        updatedMessage.text = _this.state.text;
        updatedMessage.attachments = attachments;
        updatedMessage.mentioned_users = _this.state.mentioned_users.map(function (mu) {
          return mu.id;
        }); // TODO: Remove this line and show an error when submit fails

        _this.props.clearEditingState();

        var updateMessagePromise = _this.props.client.updateMessage(updatedMessage).then(function () {
          _this.props.clearEditingState();
        });

        logChatPromiseExecution(updateMessagePromise, 'update message');
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
              return _this.props.client.updateMessage(_objectSpread({}, _this.props.editing, {
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

              if (!(result.type === 'cancel')) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return");

            case 7:
              mimeType = lookup(result.name);

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
      var mimeType = lookup(file.name);
      /* eslint-disable */

      _this.setState(function (prevState) {
        return {
          numberOfUploads: prevState.numberOfUploads + 1,
          fileOrder: prevState.fileOrder.concat([id]),
          fileUploads: prevState.fileUploads.setIn([id], {
            id: id,
            file: _objectSpread({}, file, {
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
      var _ref3 = _asyncToGenerator(
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
        return _ref3.apply(this, arguments);
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
      var _ref5 = _asyncToGenerator(
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
                contentType = lookup(filename) || 'application/octet-stream';
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
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onChange", function (text) {
      _this.setState({
        text: text
      });

      if (text) {
        logChatPromiseExecution(_this.props.channel.keystroke(), 'start typing event');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setInputBoxRef", function (o) {
      return _this.inputBox = o;
    });

    _defineProperty(_assertThisInitialized(_this), "getCommands", function () {
      var config = _this.props.channel.getConfig();

      var allCommands = config.commands;
      return allCommands;
    });

    var state = _this.getMessageDetailsForState(props.editing);

    _this.state = _objectSpread({}, state);
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

      var styles$$1 = buildStylesheet('MessageInput', this.props.style);
      var _this$props = this.props,
          hasImagePicker = _this$props.hasImagePicker,
          hasFilePicker = _this$props.hasFilePicker;
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(View, {
        style: _objectSpread({}, styles$$1.container, {
          paddingTop: this.state.imageUploads.length > 0 ? 20 : 0
        })
      }, this.state.fileUploads && React__default.createElement(FileUploadPreview, {
        removeFile: this._removeFile,
        retryUpload: this._uploadFile,
        fileUploads: this.state.fileOrder.map(function (id) {
          return _this2.state.fileUploads[id];
        })
      }), this.state.imageUploads && React__default.createElement(ImageUploadPreview, {
        removeImage: this._removeImage,
        retryUpload: this._uploadImage,
        imageUploads: this.state.imageOrder.map(function (id) {
          return _this2.state.imageUploads[id];
        })
      }), React__default.createElement(View, {
        style: styles$$1.inputBoxContainer,
        ref: this.props.setInputBoxContainerRef
      }, React__default.createElement(TouchableOpacity, {
        style: styles$$1.attachButton,
        onPress: function onPress() {
          if (hasImagePicker && hasFilePicker) _this2.attachActionSheet.show();else if (hasImagePicker && !hasFilePicker) _this2._pickImage();else if (!hasImagePicker && hasFilePicker) _this2._pickFile();
        }
      }, React__default.createElement(Image, {
        source: img$c,
        style: styles$$1.attachButtonIcon
      })), React__default.createElement(ActionSheetCustom, {
        ref: function ref(o) {
          return _this2.attachActionSheet = o;
        },
        title: 'Add a file',
        options: ['Select a photo', 'Upload a file', 'Cancel'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 2,
        onPress: function onPress(index) {
          switch (index) {
            case 0:
              _this2._pickImage();

              break;

            case 1:
              _this2._pickFile();

              break;

            default:
          }
        }
      }), React__default.createElement(AutoCompleteInput, {
        openSuggestions: this.props.openSuggestions,
        closeSuggestions: this.props.closeSuggestions,
        updateSuggestions: this.props.updateSuggestions,
        value: this.state.text,
        onChange: this.onChange,
        getUsers: this.getUsers,
        getCommands: this.getCommands,
        setInputBoxRef: this.setInputBoxRef,
        triggerSettings: ACITriggerSettings({
          users: this.getUsers(),
          commands: this.getCommands(),
          onMentionSelectItem: this.onSelectItem
        })
      }), React__default.createElement(TouchableOpacity, {
        style: styles$$1.sendButton,
        title: "Pick an image from camera roll",
        onPress: this.sendMessage
      }, this.props.editing ? React__default.createElement(Image, {
        source: img$9
      }) : React__default.createElement(Image, {
        source: img$a
      })))), React__default.createElement(Text, {
        style: {
          textAlign: 'right',
          height: 20
        }
      }, this.props.channel.state.typing ? this.constructTypingString(this.props.channel.state.typing) : ''));
    }
  }]);

  return MessageInput;
}(PureComponent), _defineProperty(_class$3, "propTypes", {
  /** Override image upload request */
  doImageUploadRequest: PropTypes.func,

  /** Override file upload request */
  doFileUploadRequest: PropTypes.func,
  maxNumberOfFiles: PropTypes.number,
  hasImagePicker: PropTypes.bool,
  hasFilePicker: PropTypes.bool
}), _defineProperty(_class$3, "defaultProps", {
  hasImagePicker: true,
  hasFilePicker: true
}), _temp$3)));

var ChannelPreviewMessenger =
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

    return _this;
  }

  _createClass(ChannelPreviewMessenger, [{
    key: "render",
    value: function render() {
      var channel = this.props.channel;
      return React__default.createElement(TouchableOpacity, {
        style: {
          display: 'flex',
          flexDirection: 'row',
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
          padding: 10
        },
        onPress: this.onSelectChannel
      }, React__default.createElement(Avatar, {
        image: channel.data.image,
        size: 40
      }), React__default.createElement(View, {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingLeft: 10
        }
      }, React__default.createElement(View, {
        style: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }
      }, React__default.createElement(Text, {
        style: {
          fontWeight: 'bold',
          fontSize: 14,
          flex: 9
        },
        ellipsizeMode: "tail",
        numberOfLines: 1
      }, channel.data.name), React__default.createElement(Text, {
        style: {
          color: '#767676',
          fontSize: 11,
          flex: 3,
          textAlign: 'right'
        }
      }, this.props.latestMessage.created_at)), React__default.createElement(Text, {
        style: {
          color: this.props.unread > 0 ? 'black' : '#767676',
          fontSize: 13,
          fontWeight: this.props.unread > 0 ? 'bold' : 'normal'
        }
      }, !channel.state.messages[0] ? 'Nothing yet...' : truncate$1(this.props.latestMessage.text.replace(/\n/g, ' '), 14))));
    }
  }]);

  return ChannelPreviewMessenger;
}(PureComponent);

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
        created_at: ''
      };

      if (!message) {
        latestMessage.text = 'Nothing yet...';
        return latestMessage;
      }

      if (message.deleted_at) {
        latestMessage.text = 'Message deleted';
      }

      if (message.text) {
        latestMessage.text = message.text.slice(0, 20);
      } else {
        if (message.command) {
          latestMessage.text = '/' + message.command;
        }

        if (message.attachments.length) {
          latestMessage.text = '🏙 Attachment...';
        }

        latestMessage.text = 'Empty message...';
      }

      if (Moment(message.created_at).isSame(new Date(), 'day')) latestMessage.created_at = Moment(message.created_at).format('HH:mm A');else {
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
      var props = _objectSpread({}, this.state, this.props);

      var Preview = this.props.Preview;
      return React__default.createElement(Preview, _extends({}, props, {
        latestMessage: this.getLatestMessage()
      }));
    }
  }]);

  return ChannelPreview;
}(PureComponent);

_defineProperty(ChannelPreview, "propTypes", {
  channel: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  setActiveChannel: PropTypes.func.isRequired,
  Preview: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
});

_defineProperty(ChannelPreview, "defaultProps", {// Preview: ChannelPreviewCountOnly,
});

var _class$4, _temp$4;
/**
 * ChannelList - A preview list of channels, allowing you to select the channel you want to open
 * @example ./examples/ChannelList.md
 */

var ChannelListMessenger = withChatContext((_temp$4 = _class$4 =
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
      return React__default.createElement(FlatList, {
        data: _this.props.channels,
        onEndReached: _this.props.loadNextPage,
        ListEmptyComponent: _this.renderEmptyState,
        renderItem: function renderItem(_ref) {
          var channel = _ref.item;
          return React__default.createElement(ChannelPreview, _extends({}, _this.props, {
            key: channel.cid,
            channel: channel,
            Preview: _this.props.Preview
          }));
        },
        keyExtractor: function keyExtractor(item, index) {
          return item.cid + index;
        }
      });
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
}(PureComponent), _defineProperty(_class$4, "propTypes", {
  /** Channels can be either an array of channels or a promise which resolves to an array of channels */
  channels: PropTypes.oneOfType([PropTypes.array, PropTypes.objectOf({
    then: PropTypes.func
  }), PropTypes.object]).isRequired,

  /** The Preview to use, defaults to ChannelPreviewMessenger */
  Preview: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** The loading indicator to use */
  LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** The indicator to use when there is error in fetching channels */
  LoadingErrorIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** The indicator to use when channel list is empty */
  EmptyStateIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  loadNextPage: PropTypes.func
}), _defineProperty(_class$4, "defaultProps", {
  Preview: ChannelPreviewMessenger,
  LoadingIndicator: LoadingIndicator,
  LoadingErrorIndicator: LoadingErrorIndicator,
  EmptyStateIndicator: EmptyStateIndicator
}), _temp$4));

var _class$5, _temp$5;
/**
 * ChannelList - A preview list of channels, allowing you to select the channel you want to open
 * @extends PureComponent
 * @example ./docs/ChannelList.md
 */

var isPromise = function isPromise(thing) {
  var promise = thing && typeof thing.then === 'function';
  return promise;
};
var ChannelList = withChatContext((_temp$5 = _class$5 =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ChannelList, _PureComponent);

  function ChannelList(props) {
    var _this;

    _classCallCheck(this, ChannelList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChannelList).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isPromise", function (thing) {
      var promise = thing && typeof thing.then === 'function';
      return promise;
    });

    _defineProperty(_assertThisInitialized(_this), "clickCreateChannel", function (e) {
      _this.props.setChannelStart();

      e.target.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "closeMenu", function () {
      _this.menuButton.current.checked = false;
    });

    _defineProperty(_assertThisInitialized(_this), "queryChannels",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var _this$props, options, filters, sort, offset, channelPromise, channelQueryResponse;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('querying channels');

              if (!_this._unmounted) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              _this$props = _this.props, options = _this$props.options, filters = _this$props.filters, sort = _this$props.sort;
              offset = _this.state.offset;

              _this.setState({
                refreshing: true
              });

              channelPromise = _this.props.client.queryChannels(filters, sort, _objectSpread({}, options, {
                offset: offset
              }));
              _context.prev = 7;
              channelQueryResponse = channelPromise;

              if (!isPromise(channelQueryResponse)) {
                _context.next = 18;
                break;
              }

              _context.next = 12;
              return channelPromise;

            case 12:
              channelQueryResponse = _context.sent;
              console.log(channelQueryResponse.length);

              if (!(offset === 0 && channelQueryResponse.length >= 1)) {
                _context.next = 18;
                break;
              }

              if (!_this._unmounted) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return");

            case 17:
              _this.props.setActiveChannel(channelQueryResponse[0]);

            case 18:
              if (!_this._unmounted) {
                _context.next = 20;
                break;
              }

              return _context.abrupt("return");

            case 20:
              _this.setState(function (prevState) {
                var channels = [].concat(_toConsumableArray(prevState.channels), _toConsumableArray(channelQueryResponse));
                return {
                  channels: channels,
                  // not unique somehow needs more checking
                  loadingChannels: false,
                  offset: channels.length,
                  hasNextPage: channelQueryResponse.length >= options.limit ? true : false,
                  refreshing: false
                };
              });

              _context.next = 29;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](7);
              console.warn(_context.t0);

              if (!_this._unmounted) {
                _context.next = 28;
                break;
              }

              return _context.abrupt("return");

            case 28:
              _this.setState({
                error: true,
                refreshing: false
              });

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 23]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "handleEvent",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(e) {
        var channel, _channel;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (e.type === 'message.new') {
                  _this.moveChannelUp(e.cid);
                } // move channel to start


                if (!(e.type === 'notification.message_new')) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 4;
                return _this.getChannel(e.cid);

              case 4:
                channel = _context2.sent;

                // move channel to starting position
                _this.setState(function (prevState) {
                  return {
                    channels: [].concat(_toConsumableArray(channel), _toConsumableArray(prevState.channels))
                  };
                });

              case 6:
                if (!(e.type === 'notification.added_to_channel')) {
                  _context2.next = 15;
                  break;
                }

                if (!(_this.props.onAddedToChannel && typeof _this.props.onAddedToChannel === 'function')) {
                  _context2.next = 11;
                  break;
                }

                _this.props.onAddedToChannel(e);

                _context2.next = 15;
                break;

              case 11:
                _context2.next = 13;
                return _this.getChannel(e.channel.cid);

              case 13:
                _channel = _context2.sent;

                _this.setState(function (prevState) {
                  return {
                    channels: [].concat(_toConsumableArray(_channel), _toConsumableArray(prevState.channels))
                  };
                });

              case 15:
                // remove from channel
                if (e.type === 'notification.removed_from_channel') {
                  if (_this.props.onRemovedFromChannel && typeof _this.props.onRemovedFromChannel === 'function') {
                    _this.props.onRemovedFromChannel(e);
                  } else {
                    _this.setState(function (prevState) {
                      var channels = prevState.channels.filter(function (channel) {
                        return channel.cid !== e.channel.cid;
                      });
                      return {
                        channels: channels
                      };
                    });
                  }
                }

                return _context2.abrupt("return", null);

              case 17:
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
      _regeneratorRuntime.mark(function _callee3(cid) {
        var channelPromise, channelQueryResponse;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                channelPromise = _this.props.client.queryChannels({
                  cid: cid
                });
                _context3.prev = 1;
                channelQueryResponse = channelPromise;

                if (!isPromise(channelQueryResponse)) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 6;
                return channelPromise;

              case 6:
                channelQueryResponse = _context3.sent;

              case 7:
                return _context3.abrupt("return", channelQueryResponse);

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                console.warn(_context3.t0);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "moveChannelUp", function (cid) {
      if (_this._unmounted) return;
      var channels = _this.state.channels; // get channel index

      var channelIndex = _this.state.channels.findIndex(function (channel) {
        return channel.cid === cid;
      });

      if (channelIndex === 0) return; // get channel from channels

      var channel = channels[channelIndex];
      console.log('channel id: ' + channelIndex); //remove channel from current position

      channels.splice(channelIndex, 1); //add channel at the start

      channels.unshift(channel); // set new channel state

      _this.setState({
        channels: _toConsumableArray(channels)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadNextPage", function () {
      _this.queryChannels();
    });

    _this.state = {
      error: false,
      loading: true,
      channels: Immutable([]),
      loadingChannels: true,
      refreshing: false,
      offset: 0
    };
    _this.menuButton = React__default.createRef();
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
                _context4.next = 2;
                return this.queryChannels();

              case 2:
                this.listenToChanges();

              case 3:
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unmounted = true;
      this.props.client.off(this.handleEvent);
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
        clickCreateChannel: this.clickCreateChannel,
        closeMenu: this.closeMenu,
        loadNextPage: this.loadNextPage
      };
      var List = this.props.List;

      var props = _objectSpread({}, this.props, {
        setActiveChannel: this.props.onSelect
      });

      return React__default.createElement(React__default.Fragment, null, React__default.createElement(List, _extends({}, props, this.state, context)));
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError() {
      return {
        error: true
      };
    }
  }]);

  return ChannelList;
}(PureComponent), _defineProperty(_class$5, "propTypes", {
  /** The Preview to use, defaults to ChannelPreviewMessenger */
  Preview: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** The loading indicator to use */
  LoadingIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** The indicator to use when there is error in fetching channels */
  LoadingErrorIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** The indicator to use when channel list is empty */
  EmptyStateIndicator: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  List: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onSelect: PropTypes.func,

  /** Function that overrides default behaviour when users gets added to a channel */
  onAddedToChannel: PropTypes.func,

  /** Function that overrides default behaviour when users gets removed from a channel */
  onRemovedFromChannel: PropTypes.func,

  /** Object containing query filters */
  filters: PropTypes.object,

  /** Object containing query options */
  options: PropTypes.object,

  /** Object containing sort parameters */
  sort: PropTypes.object
}), _defineProperty(_class$5, "defaultProps", {
  Preview: ChannelPreviewMessenger,
  List: ChannelListMessenger,
  LoadingIndicator: LoadingIndicator,
  LoadingErrorIndicator: LoadingErrorIndicator,
  EmptyStateIndicator: EmptyStateIndicator,
  hasNextPage: true,
  filters: {},
  options: {},
  sort: {}
}), _temp$5));

var _class$6, _temp$6;
/**
 * Thread - The Thread renders a parent message with a list of replies. Use the stnadard message list of the main channel's messages.
 * The thread is only used for the list of replies to a message.
 *
 * @example ./docs/Thread.md
 * @extends Component
 */

var Thread = withChannelContext((_temp$6 = _class$6 =
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
}(React__default.PureComponent), _defineProperty(_class$6, "propTypes", {
  /** Channel is passed via the Channel Context */
  channel: PropTypes.object.isRequired,

  /** the thread (the parent message object) */
  thread: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

  /** The message component to use for rendering messages */
  Message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /** The list of messages to render, state is handled by the parent channel component */
  threadMessages: PropTypes.array.isRequired,

  /** loadMoreThread iss called when infinite scroll wants to load more messages */
  loadMoreThread: PropTypes.func.isRequired,

  /** If there are more messages available, set to false when the end of pagination is reached */
  threadHasMore: PropTypes.bool,

  /** If the thread is currently loading more messages */
  threadLoadingMore: PropTypes.bool,

  /** Display the thread on 100% width of it's container. Useful for mobile style view */
  fullWidth: PropTypes.bool,

  /** Make input focus on mounting thread */
  autoFocus: PropTypes.bool
}), _defineProperty(_class$6, "defaultProps", {
  threadHasMore: true,
  threadLoadingMore: true,
  fullWidth: false,
  autoFocus: true
}), _temp$6));

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
        Message: this.props.Message,
        style: {
          container: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10
          }
        }
      }, this.props)), React__default.createElement(View, {
        style: {
          padding: 20,
          backgroundColor: '#F4F9FF',
          margin: 10,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center'
        }
      }, React__default.createElement(Text, null, "Start of a new thread")));
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(MessageList, {
        messages: this.props.threadMessages,
        headerComponent: headerComponent,
        read: read,
        threadList: true,
        loadMore: this.props.loadMoreThread,
        hasMore: this.props.threadHasMore,
        loadingMore: this.props.threadLoadingMore,
        Message: this.props.Message
      }), React__default.createElement(MessageInput, {
        parent: this.props.thread,
        focus: this.props.autoFocus
      }));
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
      var styles$$1 = buildStylesheet('iconBadge', this.props.styles);
      return createElement(View, null, children, unread > 0 && createElement(View, {
        style: styles$$1.icon
      }, createElement(View, {
        style: styles$$1.iconInner
      }, showNumber && createElement(Text, {
        style: styles$$1.text
      }, unread))));
    }
  }]);

  return IconBadge;
}(Component);

export { registerNativeHandlers, NetInfo, ChatContext, withChatContext, ChannelContext, withChannelContext, SuggestionsContext, withSuggestionsContext, MESSAGE_ACTIONS, Avatar, Chat, Channel, MessageList, MessageInput, ChannelList, Thread, ChannelPreviewMessenger, IconBadge, MessageSimple, MessageStatus, MessageContent, MessageAvatar, MessageText };
//# sourceMappingURL=index.es.js.map
