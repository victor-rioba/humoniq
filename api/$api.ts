import type { AspidaClient } from 'aspida';
import type { Methods as Methods_77qkmh } from './api/mission/_missionId@string';
import type { Methods as Methods_6orxen } from './api/missions-list';
import type { Methods as Methods_146pzg3 } from './api/user-info';
import type { Methods as Methods_idk8rz } from './login';
import type { Methods as Methods_1rpsris } from './logout';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/api/mission';
  const PATH1 = '/api/missions-list';
  const PATH2 = '/api/user-info';
  const PATH3 = '/login';
  const PATH4 = '/logout';
  const GET = 'GET';
  const POST = 'POST';

  return {
    api: {
      mission: {
        _missionId: (val2: string) => {
          const prefix2 = `${PATH0}/${val2}`;

          return {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_77qkmh['get']['resBody']>(prefix, prefix2, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_77qkmh['get']['resBody']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
      },
      missions_list: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_6orxen['get']['resBody']>(prefix, PATH1, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_6orxen['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
      user_info: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_146pzg3['get']['resBody']>(prefix, PATH2, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_146pzg3['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH2}`,
      },
    },
    login: {
      post: (option: { body: Methods_idk8rz['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_idk8rz['post']['resBody']>(prefix, PATH3, POST, option).json(),
      $post: (option: { body: Methods_idk8rz['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_idk8rz['post']['resBody']>(prefix, PATH3, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH3}`,
    },
    logout: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1rpsris['get']['resBody']>(prefix, PATH4, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1rpsris['get']['resBody']>(prefix, PATH4, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH4}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
