import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { styles, buildStylesheet } from '../styles/styles.js';
import { Attachment } from './Attachment';
import { Avatar } from './Avatar';

import { renderText } from '../utils';
import PropTypes from 'prop-types';

export class MessageSimple extends React.PureComponent {
  openThread = () => {
    this.props.onThreadSelect(this.props.message);
  };

  messageContentContainer = () => {
    const { message, isMyMessage, style } = this.props;
    const hasAttachment = Boolean(
      message && message.attachments && message.attachments.length,
    );

    const pos = isMyMessage(message) ? 'right' : 'left';

    const styles = buildStylesheet('MessageSimpleContent', style);

    const showTime =
      message.groupPosition[0] === 'single' ||
      message.groupPosition[0] === 'bottom'
        ? true
        : false;

    return (
      <View
        style={{
          ...styles.container,
          ...styles[pos],
        }}
      >
        {hasAttachment
          ? message.attachments.map((attachment, index) => (
              <Attachment
                key={`${message.id}-${index}`}
                attachment={attachment}
              />
            ))
          : false}
        <MessageText message={message} isMyMessage={isMyMessage} />
        {!this.props.threadList && message.reply_count !== 0 && (
          <TouchableOpacity onPress={this.openThread} style={{ padding: 5 }}>
            <Text style={{ color: '#006CFF' }}>
              {message.reply_count} Replies
            </Text>
          </TouchableOpacity>
        )}
        {showTime ? (
          <View style={styles.metaContainer}>
            <Text style={{ ...styles.metaText, textAlign: pos }}>
              {moment(message.created_at).format('h:mmA')}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  messageAvatarContainer = () => {
    const { message, isMyMessage, style } = this.props;

    const pos = isMyMessage(message) ? 'right' : 'left';
    const styles = buildStylesheet('MessageSimpleAvatar', style);

    const showAvatar =
      message.groupPosition[0] === 'single' ||
      message.groupPosition[0] === 'bottom'
        ? true
        : false;
    return (
      <View
        style={{
          ...styles[pos],
        }}
      >
        {showAvatar ? (
          <Avatar
            image={message.user.image}
            size={32}
            name={message.user.name}
          />
        ) : (
          <View style={{ width: 32, height: 32 }} />
        )}
      </View>
    );
  };

  render() {
    const { message, isMyMessage, style } = this.props;
    const hasAttachment = Boolean(
      message && message.attachments && message.attachments.length,
    );
    const styles = buildStylesheet('MessageSimple', style);
    const pos = isMyMessage(message) ? 'right' : 'left';
    const bottomMargin =
      message.groupPosition[0] === 'single' ||
      message.groupPosition[0] === 'bottom'
        ? 'bottom'
        : null;

    return (
      <View
        style={{
          ...styles.container,
          ...styles[pos],
          ...styles[bottomMargin],
        }}
      >
        {isMyMessage(message) ? (
          <React.Fragment>
            {this.messageContentContainer()}
            {this.messageAvatarContainer()}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.messageAvatarContainer()}
            {this.messageContentContainer()}
          </React.Fragment>
        )}
      </View>
    );
  }
}

class MessageText extends React.PureComponent {
  capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    const { message, isMyMessage, style } = this.props;

    const pos = isMyMessage(message) ? 'right' : 'left';
    const groupStyles =
      (isMyMessage(message) ? 'right' : 'left') +
      this.capitalize(message.groupPosition[0]);

    if (!message.text) return false;
    const styles = buildStylesheet('MessageSimpleText', style);
    return (
      <View
        style={{
          ...styles.container,
          ...styles[pos],
          ...styles[groupStyles],
        }}
      >
        <Text style={styles.text}>{renderText(message.text)}</Text>
      </View>
    );
  }
}
