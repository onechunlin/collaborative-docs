import { safeParse, safeStringify } from '@/utils/json';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

export interface User {
  id: string;
  name: string;
}

const localUserKey = 'local-user';

export function useLocalUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const localUser = safeParse<User>(localStorage.getItem(localUserKey) || '');
    if (!isEmpty(localUser)) {
      setUser(localUser);
      return;
    }

    const name = window.prompt('请输入你的用户名', '用户1');
    if (name) {
      const user = {
        id: Date.now().toString(),
        name,
      };
      setUser(user);
      localStorage.setItem(localUserKey, safeStringify(user));
    }
  }, []);

  return user;
}
