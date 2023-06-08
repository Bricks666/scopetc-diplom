import { createDomain } from 'effector';

const authUser = createDomain();

export const $user = authUser.store<{ id: number } | null>(null);
export const $isAuth = $user.map((user) => !!user);
