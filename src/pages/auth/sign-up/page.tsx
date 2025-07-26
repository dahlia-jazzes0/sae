import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/shared/auth/auth";
import { FirebaseError } from "firebase/app";
import { useActionState, useId } from "react";
import { Link, useNavigate } from "react-router";
import { ZodError } from "zod";

export function SignUpPage() {
  const navigate = useNavigate();
  const emailId = useId();
  const passwordId = useId();
  const displayNameId = useId();
  const [state, formAction, isPending] = useActionState(
    async (_: unknown, fd: FormData) => {
      try {
        const email = fd.get("email") as string;
        const password = fd.get("password") as string;
        const displayName = fd.get("displayName") as string;
        await signUp({ email, password, displayName });
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
          <CardTitle className="flex items-center">가입하기</CardTitle>
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
              <div className="grid gap-3">
                <Label htmlFor={displayNameId}>별명</Label>
                <Input id={displayNameId} name="displayName" required />
              </div>
              <ErrorField errors={state?.error} />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isPending}>
                  가입
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              이미 가입하셨나요?{" "}
              <Link to="/auth/sign-in" className="underline underline-offset-4">
                로그인
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
