import { z } from 'zod';

export const userFromServerSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export const authResponceSchema = z.object({
  accessToken: z.string(),
  user: userFromServerSchema,
});

export type UserFromServerType = z.infer<typeof userFromServerSchema>;

export const userSignupFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

// signup
export type UserSignupFormType = z.infer<typeof userSignupFormSchema>;

// login
export const userLoginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserLoginFormType = z.infer<typeof userLoginFormSchema>;

// state
export type UserState =
  | { status: 'pending' }
  | { status: 'guest' }
  | {
      status: 'logged';
      user: UserFromServerType;
    };

export type AuthState = {
  accessToken: string;
  user: UserState;
};
