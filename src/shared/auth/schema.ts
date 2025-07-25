import z from "zod";

export const emailSchema = z.email();
export const passwordSchema = z.string();
export const displayNameSchema = z.string();

export type SignUpOptions = z.infer<typeof signUpOptionsSchema>;
export const signUpOptionsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  displayName: displayNameSchema,
});

export type SignInOptions = z.infer<typeof signInOptionsSchema>;
export const signInOptionsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
