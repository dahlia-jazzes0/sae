import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRoundIcon } from "lucide-react";

interface UserAvatarProps {
  src?: string | null;
  className?: string;
}
export function UserAvatar({ src, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src ?? undefined} />
      <AvatarFallback className="text-muted-foreground">
        <UserRoundIcon size="70%" />
      </AvatarFallback>
    </Avatar>
  );
}
