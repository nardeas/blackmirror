import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';

import { Post } from '../utils/types';
import { WINDOW_WIDTH } from '../constants/display';
import theme from '../constants/theme';
import FeedItemHeader from './FeedItemHeader';

interface Props {
  data: Post;
  onShowComments: () => any;
  disableComments?: boolean;
}

function FeedItem({ data, onShowComments, disableComments }: Props) {
  return (
    <Wrapper>
      <FeedItemHeaderWrapper>
        <FeedItemHeader data={data} />
      </FeedItemHeaderWrapper>

      <TextContent>{data.post.content.text}</TextContent>

      <FeedImage source={{ uri: data.post.content.image }} resizeMode="cover" />

      <Footer>
        <MetaData>
          <MetaItem>
            <MetaCircle bg={theme.primary.base} style={{ zIndex: 1 }}>
              <AntDesign name="like1" size={12} color="#fff" />
            </MetaCircle>
            <MetaCircle bg="#F4485F" style={{ marginLeft: -4, zIndex: 0 }}>
              <FontAwesome name="heart" size={11} color="#fff" />
            </MetaCircle>
            <MetaText>{data.post.content.likeCount}</MetaText>
          </MetaItem>

          {data.comments.length > 0 && !disableComments && (
            <MetaItem onPress={onShowComments}>
              <MetaText>{data.comments.length} comments</MetaText>
            </MetaItem>
          )}
        </MetaData>

        <Actions>
          <Action>
            <AntDesign name="like2" size={20} color="#666" />
            <ActionText>Like</ActionText>
          </Action>

          <Action>
            <EvilIcons name="comment" size={24} color="#666" />
            <ActionText>Comment</ActionText>
          </Action>

          <Action>
            <MaterialCommunityIcons
              name="share-outline"
              size={26}
              color="#666"
            />
            <ActionText>Share</ActionText>
          </Action>
        </Actions>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  background-color: #fff;
  padding-top: 16px;
  border-color: #ddd;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`;

const FeedItemHeaderWrapper = styled.View`
  padding-left: 16px;
  padding-right: 16px;
`;

const TextContent = styled.Text`
  color: #222;
  font-size: 14px;
  padding: 16px;
`;

const FeedImage = styled.Image`
  width: ${WINDOW_WIDTH}px;
  height: 300px;
`;

const Footer = styled.View`
  padding: 16px;
`;

const Actions = styled.View`
  flex-direction: row;
  border-top-color: #eee;
  border-top-width: 1px;
  padding-top: 8px;
`;

const Action = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ActionText = styled.Text`
  color: #666;
  font-size: 14px;
  font-weight: 500;
  margin-left: 4px;
`;

const MetaData = styled.View`
  padding-bottom: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MetaItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const MetaCircle = styled.View<{ bg: string }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${props => props.bg};
  border: 2px solid #fff;
`;

const MetaText = styled.Text`
  color: #666;
  font-size: 14px;
  margin-left: 4px;
`;

export default FeedItem;