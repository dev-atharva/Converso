import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface useravatarpreops {
  source?: string;
  className?: string;
}

export const UserAvatar = ({ source, className }: useravatarpreops) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={source} />
    </Avatar>
  );
};
