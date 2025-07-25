import { Button } from "@/components/ui/button";
import type { ComponentType, JSX } from "react";
import { Link } from "react-router";
import { useAuth } from "./use-auth";

export function withAuthGuard<Props extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<Props>
) {
  return (props: Props) => {
    const auth = useAuth();
    if (auth == null) {
      return (
        <div className="flex flex-col justify-center items-center max-w-sm w-full">
          <p>인증이 필요합니다.</p>
          <Link to="/auth/sign-in">
            <Button>로그인</Button>
          </Link>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
}
