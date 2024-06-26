import { ExecSyncOptions, ExecOptions as ExecAsyncOptions } from 'child_process';

export const asyncApi: <F = string>(config?: AsyncConfigType<F>) => AsyncApiType<F>;
export const syncApi: <F = string>(config?: SyncConfigType<F>) => SyncApiType<F>;
export const formats: FormatsType;

type AsyncConfigType<F> = {
  format?: FormatType<F>;
  options?: ExecAsyncOptions;
};

type SyncConfigType<F> = {
  format?: FormatType<F>;
  options?: ExecSyncOptions;
};

type FormatType<F> = (output: string | Buffer) => F;

type FormatsType = {
  bufferFormat: FormatType<Buffer>;
  jsonFormat: FormatType<any>;
  rawFormat: FormatType<string | Buffer>;
  stringFormat: FormatType<string>;
};

type AsyncCommandType<F> = (...args: (string | Record<string, any>)[]) => Promise<F>;

type AsyncApiType<F> = {
  access: AsyncCommandType<F>;
  adduser: AsyncCommandType<F>;
  audit: AsyncCommandType<F>;
  bugs: AsyncCommandType<F>;
  cache: AsyncCommandType<F>;
  ci: AsyncCommandType<F>;
  completion: AsyncCommandType<F>;
  config: AsyncCommandType<F>;
  dedupe: AsyncCommandType<F>;
  deprecate: AsyncCommandType<F>;
  diff: AsyncCommandType<F>;
  distTag: AsyncCommandType<F>;
  docs: AsyncCommandType<F>;
  doctor: AsyncCommandType<F>;
  edit: AsyncCommandType<F>;
  exec: AsyncCommandType<F>;
  explain: AsyncCommandType<F>;
  explore: AsyncCommandType<F>;
  findDupes: AsyncCommandType<F>;
  fund: AsyncCommandType<F>;
  get: AsyncCommandType<F>;
  help: AsyncCommandType<F>;
  helpSearch: AsyncCommandType<F>;
  hook: AsyncCommandType<F>;
  init: AsyncCommandType<F>;
  install: AsyncCommandType<F>;
  installCiTest: AsyncCommandType<F>;
  installTest: AsyncCommandType<F>;
  link: AsyncCommandType<F>;
  ll: AsyncCommandType<F>;
  login: AsyncCommandType<F>;
  logout: AsyncCommandType<F>;
  ls: AsyncCommandType<F>;
  org: AsyncCommandType<F>;
  outdated: AsyncCommandType<F>;
  owner: AsyncCommandType<F>;
  pack: AsyncCommandType<F>;
  ping: AsyncCommandType<F>;
  pkg: AsyncCommandType<F>;
  prefix: AsyncCommandType<F>;
  profile: AsyncCommandType<F>;
  prune: AsyncCommandType<F>;
  publish: AsyncCommandType<F>;
  query: AsyncCommandType<F>;
  rebuild: AsyncCommandType<F>;
  repo: AsyncCommandType<F>;
  restart: AsyncCommandType<F>;
  root: AsyncCommandType<F>;
  runScript: AsyncCommandType<F>;
  search: AsyncCommandType<F>;
  set: AsyncCommandType<F>;
  shrinkwrap: AsyncCommandType<F>;
  star: AsyncCommandType<F>;
  stars: AsyncCommandType<F>;
  start: AsyncCommandType<F>;
  stop: AsyncCommandType<F>;
  team: AsyncCommandType<F>;
  test: AsyncCommandType<F>;
  token: AsyncCommandType<F>;
  uninstall: AsyncCommandType<F>;
  unpublish: AsyncCommandType<F>;
  unstar: AsyncCommandType<F>;
  update: AsyncCommandType<F>;
  version: AsyncCommandType<F>;
  view: AsyncCommandType<F>;
  whoami: AsyncCommandType<F>;
};

type SyncCommandType<F> = (...args: (string | Record<string, any>)[]) => F;

type SyncApiType<F> = {
  access: SyncCommandType<F>;
  adduser: SyncCommandType<F>;
  audit: SyncCommandType<F>;
  bugs: SyncCommandType<F>;
  cache: SyncCommandType<F>;
  ci: SyncCommandType<F>;
  completion: SyncCommandType<F>;
  config: SyncCommandType<F>;
  dedupe: SyncCommandType<F>;
  deprecate: SyncCommandType<F>;
  diff: SyncCommandType<F>;
  distTag: SyncCommandType<F>;
  docs: SyncCommandType<F>;
  doctor: SyncCommandType<F>;
  edit: SyncCommandType<F>;
  exec: SyncCommandType<F>;
  explain: SyncCommandType<F>;
  explore: SyncCommandType<F>;
  findDupes: SyncCommandType<F>;
  fund: SyncCommandType<F>;
  get: SyncCommandType<F>;
  help: SyncCommandType<F>;
  helpSearch: SyncCommandType<F>;
  hook: SyncCommandType<F>;
  init: SyncCommandType<F>;
  install: SyncCommandType<F>;
  installCiTest: SyncCommandType<F>;
  installTest: SyncCommandType<F>;
  link: SyncCommandType<F>;
  ll: SyncCommandType<F>;
  login: SyncCommandType<F>;
  logout: SyncCommandType<F>;
  ls: SyncCommandType<F>;
  org: SyncCommandType<F>;
  outdated: SyncCommandType<F>;
  owner: SyncCommandType<F>;
  pack: SyncCommandType<F>;
  ping: SyncCommandType<F>;
  pkg: SyncCommandType<F>;
  prefix: SyncCommandType<F>;
  profile: SyncCommandType<F>;
  prune: SyncCommandType<F>;
  publish: SyncCommandType<F>;
  query: SyncCommandType<F>;
  rebuild: SyncCommandType<F>;
  repo: SyncCommandType<F>;
  restart: SyncCommandType<F>;
  root: SyncCommandType<F>;
  runScript: SyncCommandType<F>;
  search: SyncCommandType<F>;
  set: SyncCommandType<F>;
  shrinkwrap: SyncCommandType<F>;
  star: SyncCommandType<F>;
  stars: SyncCommandType<F>;
  start: SyncCommandType<F>;
  stop: SyncCommandType<F>;
  team: SyncCommandType<F>;
  test: SyncCommandType<F>;
  token: SyncCommandType<F>;
  uninstall: SyncCommandType<F>;
  unpublish: SyncCommandType<F>;
  unstar: SyncCommandType<F>;
  update: SyncCommandType<F>;
  version: SyncCommandType<F>;
  view: SyncCommandType<F>;
  whoami: SyncCommandType<F>;
};
