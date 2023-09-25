import Element from '@satorijs/element'
import { Dict } from 'cosmokit'

// do not remove the `type` modifier
// because `esModuleInterop` is not respected by esbuild
export type { Fragment, Render } from '@satorijs/element'

export { Element, Element as h }

export interface SendOptions {
  linkPreview?: boolean
}

export interface Field {
  name: string
}

function Field(name: string): Field {
  return { name }
}

export interface Method {
  name: string
  fields: Field[]
}

function Method(name: string, fields: string[]): Method {
  return { name, fields: fields.map(Field) }
}

export const Methods: Dict<Method> = {
  'message.send': Method('sendMessage', ['channel_id', 'content', 'guild_id', 'options']),
  'message.get': Method('getMessage', ['channel_id', 'message_id']),
  'message.list': Method('getMessageList', ['channel_id', 'next']),
  'message.update': Method('editMessage', ['channel_id', 'message_id']),
  'message.delete': Method('deleteMessage', ['channel_id', 'message_id']),
  'reaction.create': Method('createReaction', ['channel_id', 'message_id', 'emoji']),
  'reaction.delete': Method('deleteReaction', ['channel_id', 'message_id', 'emoji', 'user_id']),
  'reaction.clear': Method('clearReaction', ['channel_id', 'message_id', 'emoji']),
  'reaction.list': Method('getReactionList', ['channel_id', 'message_id', 'emoji', 'next']),
  'guild.get': Method('getGuild', ['guild_id']),
  'guild.list': Method('getGuildList', ['next']),
  'guild.member.get': Method('getGuildMember', ['guild_id', 'user_id']),
  'guild.member.list': Method('getGuildMemberList', ['guild_id', 'next']),
  'guild.member.kick': Method('kickGuildMember', ['guild_id', 'user_id', 'permanent']),
  'guild.member.mute': Method('muteGuildMember', ['guild_id', 'user_id', 'duration', 'reason']),
  'guild.member.role': Method('setGuildMemberRole', ['guild_id', 'user_id', 'role_id']),
  'guild.role.list': Method('getGuildRoleList', ['guild_id', 'next']),
  'guild.role.create': Method('createGuildRole', ['guild_id', 'data']),
  'guild.role.update': Method('modifyGuildRole', ['guild_id', 'role_id', 'data']),
  'guild.role.delete': Method('deleteGuildRole', ['guild_id', 'role_id']),
  'channel.get': Method('getChannel', ['channel_id', 'guild_id']),
  'channel.list': Method('getChannelList', ['guild_id', 'next']),
  'channel.mute': Method('muteChannel', ['channel_id', 'guild_id', 'enable']),
}

export interface List<T> {
  data: T[]
  next?: string
}

export interface Methods {
  // message
  sendMessage(channelId: string, content: Element.Fragment, guildId?: string, options?: SendOptions): Promise<string[]>
  // sendMessage(session: Session.Payload, content: segment.Fragment, options?: SendOptions): Promise<string[]>
  sendPrivateMessage(userId: string, content: Element.Fragment, options?: SendOptions): Promise<string[]>
  // sendPrivateMessage(session: Session.Payload, content: segment.Fragment, options?: SendOptions): Promise<string[]>
  getMessage(channelId: string, messageId: string): Promise<Message>
  getMessageList(channelId: string, next?: string): Promise<List<Message>>
  getMessageIter(channelId: string): AsyncIterable<Message>
  editMessage(channelId: string, messageId: string, content: Element.Fragment): Promise<void>
  deleteMessage(channelId: string, messageId: string): Promise<void>

  // reaction
  createReaction(channelId: string, messageId: string, emoji: string): Promise<void>
  deleteReaction(channelId: string, messageId: string, emoji: string, userId?: string): Promise<void>
  clearReaction(channelId: string, messageId: string, emoji?: string): Promise<void>
  getReactionList(channelId: string, messageId: string, emoji: string, next?: string): Promise<List<User>>
  getReactionIter(channelId: string, messageId: string, emoji: string): AsyncIterable<User>

  // user
  getLogin(): Promise<Login>
  getUser(userId: string, guildId?: string): Promise<User>
  getFriendList(next?: string): Promise<List<User>>
  getFriendIter(): AsyncIterable<User>
  deleteFriend(userId: string): Promise<void>

  // guild
  getGuild(guildId: string): Promise<Guild>
  getGuildList(next?: string): Promise<List<Guild>>
  getGuildIter(): AsyncIterable<Guild>

  // guild member
  getGuildMember(guildId: string, userId: string): Promise<GuildMember>
  getGuildMemberList(guildId: string, next?: string): Promise<List<GuildMember>>
  getGuildMemberIter(guildId: string): AsyncIterable<GuildMember>
  kickGuildMember(guildId: string, userId: string, permanent?: boolean): Promise<void>
  muteGuildMember(guildId: string, userId: string, duration: number, reason?: string): Promise<void>

  // role
  setGuildMemberRole(guildId: string, userId: string, roleId: string): Promise<void>
  unsetGuildMemberRole(guildId: string, userId: string, roleId: string): Promise<void>
  getGuildRoleList(guildId: string, next?: string): Promise<List<GuildRole>>
  getGuildRoleIter(guildId: string): AsyncIterable<GuildRole>
  createGuildRole(guildId: string, data: Partial<GuildRole>): Promise<string>
  modifyGuildRole(guildId: string, roleId: string, data: Partial<GuildRole>): Promise<void>
  deleteGuildRole(guildId: string, roleId: string): Promise<void>

  // channel
  getChannel(channelId: string, guildId?: string): Promise<Channel>
  getChannelList(guildId: string, next?: string): Promise<List<Channel>>
  getChannelIter(guildId: string): AsyncIterable<Channel>
  muteChannel(channelId: string, guildId?: string, enable?: boolean): Promise<void>

  // request
  handleFriendRequest(messageId: string, approve: boolean, comment?: string): Promise<void>
  handleGuildRequest(messageId: string, approve: boolean, comment?: string): Promise<void>
  handleGuildMemberRequest(messageId: string, approve: boolean, comment?: string): Promise<void>

  // commands
  updateCommands(commands: Command[]): Promise<void>
}

export interface Channel {
  id: string
  type: Channel.Type
  name?: string
  parentId?: string
}

export namespace Channel {
  export const enum Type {
    TEXT = 0,
    DIRECT = 1,
    VOICE = 2,
    CATEGORY = 3,
  }
}

export interface Guild {
  id: string
  name?: string
}

export interface GuildRole {
  id: string
  name: string
  color: number
  position: number
  permissions: bigint
  hoist: boolean
  mentionable: boolean
}

export interface User {
  id: string
  name?: string
  nick?: string
  /** @deprecated */
  userId?: string
  /** @deprecated */
  username?: string
  avatar?: string
  discriminator?: string
  isBot?: boolean
}

export interface GuildMember {
  user?: User
  name?: string
  avatar?: string
  title?: string
  roles?: string[]
}

export interface Login {
  user?: User
  platform?: string
  selfId?: string
  status: Login.Status
}

export namespace Login {
  export type Status = 'offline' | 'online' | 'connect' | 'disconnect' | 'reconnect'
}

/** @deprecated */
export type Author = Partial<Omit<GuildMember, 'user'> & User>

export interface Message {
  id?: string
  /** @deprecated */
  messageId?: string
  channel?: Channel
  guild?: Guild
  user?: User
  member?: GuildMember
  content?: string
  elements?: Element[]
  timestamp?: number
  quote?: Message
  createdAt?: number
  updatedAt?: number
}

export interface Command {
  name: string
  aliases: string[]
  description: Dict<string>
  arguments: Command.Argument[]
  options: Command.Option[]
  children: Command[]
}

export namespace Command {
  export interface Argument {
    name: string
    description: Dict<string>
    type: string
    required: boolean
  }

  export interface Option {
    name: string
    description: Dict<string>
    type: string
    required: boolean
  }
}

export interface Argv {
  name: string
  arguments: any[]
  options: Dict
}

type Genres = 'friend' | 'channel' | 'guild' | 'guild-member' | 'guild-role' | 'guild-file' | 'guild-emoji'
type Actions = 'added' | 'deleted' | 'updated'

export type EventName =
  | `${Genres}-${Actions}`
  | 'message'
  | 'message-deleted'
  | 'message-updated'
  | 'message-pinned'
  | 'message-unpinned'
  | 'interaction/command'
  | 'reaction-added'
  | 'reaction-deleted'
  | 'reaction-deleted/one'
  | 'reaction-deleted/all'
  | 'reaction-deleted/emoji'
  | 'send'
  | 'friend-request'
  | 'guild-request'
  | 'guild-member-request'

export interface EventData {
  id: number
  type: string
  selfId: string
  platform: string
  timestamp: number
  argv?: Argv
  channel?: Channel
  guild?: Guild
  member?: GuildMember
  message?: Message
  operator?: User
  role?: GuildRole
  user?: User
  /** @deprecated */
  subtype?: string
  /** @deprecated */
  subsubtype?: string
}