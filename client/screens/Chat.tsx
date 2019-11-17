import React from 'react';
import styled from 'styled-components/native';
import { GiftedChat } from 'react-native-gifted-chat';

import { TAB_BAR_HEIGHT } from '../constants/display';
import { useAppState } from '../utils/context';
import { Message } from '../utils/types';

function mangleMessages(messages: Message[]) {
  return messages.map(m => ({
    _id: m.id,
    text: m.content.text,
    createdAt: new Date(m.content.timestampMsCreated),
    user: {
      _id: m.user.id,
      name: `${m.user.firstName} ${m.user.lastName}`,
      avatar: m.user.image,
    },
  }));
}

function ChatScreen({ navigation }) {
  const { messages, user } = useAppState();
  const [localMessages, setLocalMessages] = React.useState(
    mangleMessages(messages)
  );

  function handleSend(sentMessages = []) {
    setLocalMessages(prevMessages =>
      GiftedChat.append(prevMessages, sentMessages)
    );
  }

  function handleLongPress() {
    navigation.navigate('ProfileTab');
  }

  // Sync messages
  React.useEffect(() => {
    if (messages.length > localMessages.length) {
      setLocalMessages(mangleMessages(messages));
    }
  }, [messages, localMessages]);

  return (
    <Wrapper>
      <GiftedChat
        bottomOffset={TAB_BAR_HEIGHT}
        messages={localMessages}
        onSend={handleSend}
        onLongPress={handleLongPress}
        user={{
          _id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.image,
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

export default ChatScreen;