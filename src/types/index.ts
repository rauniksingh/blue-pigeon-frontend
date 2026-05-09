export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string | null;
  isPrivate: boolean;
  memberCount: number;
  createdAt: string;
}

export interface ChannelDetail extends Channel {
  topics: TopicItem[];
}

export interface TopicItem {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string | null;
  channelId: string;
  channelName: string;
  createdAt: string;
}

export interface TopicDetail extends Topic {
  messages: MessageItem[];
}

export interface MessageItem {
  id: string;
  transcript: string;
  audioUrl: string | null;
  duration: number | null;
  sender: {
    id: string;
    username: string;
  };
  createdAt: string;
}



export interface SearchMessage {
  id: string;
  transcript: string;
  snippet: string;
  audioUrl: string | null;
  duration: number | null;
  topicId: string;
  topicName: string;
  channelId: string;
  channelName: string;
  sender: {
    id: string;
    username: string;
  };
  createdAt: string;
}

export interface SearchResults {
  query: string;
  messages: SearchMessage[];
  channels: Channel[];
  topics: Topic[];
  users: User[];
  meta: {
    total: number;
    counts: {
      messages: number;
      channels: number;
      topics: number;
      users: number;
    };
  };
}