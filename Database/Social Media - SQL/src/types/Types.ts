import type {
  Theme,
  WhoCanMessage,
  WhoCanSeePosts,
} from "@prisma/generated/prisma/enums.js";

export interface JWTPayload {
  userId: string;
  email: string;
}

// Auth Types
export interface UserType {
  email: string;
  username: string;
  passwordHash: string;
  phoneNumber?: string;
}

export interface ProfileType {
  userId: string;
  displayName: string;
  bio?: string;
  location?: string;
  avatarMediaId?: string;
  coverMediaId?: string;
  websiteUrl?: string;
  dateOfBirth?: string;
}

export interface SettingType {
  userId: string;
  language?: string;
  timezone?: string;
  theme?: Theme;
  whoCanMessage?: WhoCanMessage;
  whoCanSeePosts?: WhoCanSeePosts;
  notifEmail?: boolean;
  notifPush?: boolean;
}

export interface SearchResult {
  id: string;
  contentText: string | null;
  createdAt: Date;
  username: string;
  displayName: string;
  likeCount: number;
  commentCount: number;
  relevanceScore: number;
}
