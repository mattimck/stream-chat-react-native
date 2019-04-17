import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from './Avatar';
import Moment from 'moment';
import truncate from 'lodash/truncate';

export class ChannelPreviewMessenger extends PureComponent {
  channelPreviewButton = React.createRef();

  onSelectChannel = () => {
    this.props.setActiveChannel(this.props.channel);
  };

  render() {
    const { channel } = this.props;
    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
        }}
        onPress={this.onSelectChannel}
      >
        <Avatar
          image={channel.data.image}
          size={40}
          style={{ container: { padding: 10 } }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 10,
            paddingBottom: 10,
            flex: 1,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
              {channel.data.name}
            </Text>
            <Text style={{ color: '#767676', fontSize: 11 }}>
              {this.props.latestMessage.created_at}
            </Text>
          </View>
          <Text
            style={{
              color: this.props.unread > 0 ? 'black' : '#767676',
              fontSize: 13,
              fontWeight: this.props.unread > 0 ? 'bold' : 'normal',
            }}
          >
            {!channel.state.messages[0]
              ? 'Nothing yet...'
              : truncate(this.props.latestMessage.text.replace(/\n/g, ' '), 14)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
