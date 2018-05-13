// @flow

export type Range = {|
  start: number,
  end: number,
|}

export type MarkdownAction = {|
  prefix: string,
  suffix: string,
|}

export type MarkdownActionResult = {|
  text: string,
  // true if action resulted in an addition, false if markup was removed instead
  added: boolean,
|}
