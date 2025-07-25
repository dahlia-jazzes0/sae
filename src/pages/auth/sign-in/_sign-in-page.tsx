import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/shared/auth/auth";
import { FirebaseError } from "firebase/app";
import { useActionState, useId } from "react";
import { Link, useNavigate } from "react-router";
import { ZodError } from "zod";

export function SignInPage() {
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();
  const [state, formAction, isPending] = useActionState(
    async (_: unknown, fd: FormData) => {
      try {
        const email = fd.get("email") as string;
        const password = fd.get("password") as string;
        await signIn({ email, password });
        navigate("/");
      } catch (error) {
        if (error instanceof ZodError) {
          return Object.fromEntries(
            error.issues.reduce((result, issue) => {
              for (const path of issue.path) {
                const arr = result.get(path) ?? [];
                arr.push(issue.message);
                result.set(path, arr);
              }
              return result;
            }, new Map<PropertyKey, string[]>())
          );
        } else if (error instanceof FirebaseError) {
          return { error: [error.message] };
        }
        console.error(error);
        return { error: ["문제가 발생했습니다."] };
      }
      return null;
    },
    null
  );
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor={emailId}>이메일</Label>
                <Input
                  id={emailId}
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                />
                <ErrorField errors={state?.email} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor={passwordId}>비밀번호</Label>
                <Input
                  id={passwordId}
                  type="password"
                  name="password"
                  required
                />
                <ErrorField errors={state?.password} />
              </div>
              <ErrorField errors={state?.error} />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isPending}>
                  로그인
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              계정이 없으신가요?{" "}
              <Link to="/auth/sign-up" className="underline underline-offset-4">
                가입
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ErrorField({ errors }: { errors?: string[] }) {
  if (errors == null) return;
  return errors.map((error) => (
    <p key={error} className="text-red-600">
      {error}
    </p>
  ));
}
