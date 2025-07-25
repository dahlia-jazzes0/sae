import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRoundIcon } from "lucide-react";

interface UserAvatarProps {
  src?: string | null;
}
export function UserAvatar({ src }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src ?? undefined} />
      <AvatarFallback className="text-muted-foreground">
        <UserRoundIcon />
      </AvatarFallback>
    </Avatar>
  );
}
