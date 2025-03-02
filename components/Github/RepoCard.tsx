"use client";
import { CalendarDays, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { truncateText } from "@/Hooks/truncateDiscription";
interface Owner {
  login: string;
  avatar_url: string;
}

interface Repository {
  id: number;
  name: string;
  html_url: string;
  owner: Owner;
  description: string;
  created_at: string;
}
interface HoverCardDemoProps {
  repo: Repository;
}

export const HoverCardDemo: FC<HoverCardDemoProps> = ({ repo }) => {
  const router = useRouter();
  const truncatedDescription = truncateText(repo.description, 80);
  return (
    <Card className="p-2 ">
      <CardContent>
        <div>
          <Avatar>
            <AvatarImage src={repo.owner.avatar_url} />
            <AvatarFallback>{repo.owner.login[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 w-full">
            <h4 className="text-sm font-semibold">@{repo.owner.login}</h4>
            <p className="text-sm ">{truncatedDescription}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Created {new Date(repo.created_at).toLocaleDateString()}
              </span>
            </div>
            <Button 
              onClick={() => {
                router.push(repo.html_url);
              }}
              className="rounded-none"
            >
              <Eye className="mr-2 h-4 w-4" />
              Repository
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
