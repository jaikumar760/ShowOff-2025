"use client";
import { CalendarDays, Clock8, Eye, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { truncateText } from "@/Hooks/truncateDiscription";
import { Label } from "../ui/label";
interface ApplyOption {
  title: string;
  link: string;
}

interface JobResult {
  title: string;
  company_name: string;
  location: string;
  via: string;
  description: string;
  job_highlights: JobHighlight[];
  extensions: string[];
  detected_extensions: DetectedExtensions;
  job_id: string;
  thumbnail: string;
  apply_options: ApplyOption[]; // Added this field
}
  
  interface JobHighlight {
    items: string[];
  }
  
  
  interface DetectedExtensions {
    posted_at: string;
    schedule_type: string;
  }
interface JobCardProps {
  job:JobResult;
}

export const JobCard: FC<JobCardProps> = ({ job }) => {
  const router = useRouter();
  const truncatedDescription = truncateText(job.description, 80);
  return (
    <Card className="p-2">
      <CardContent>
        <div>
          <Avatar>
            <AvatarImage src={job.thumbnail} />
            <AvatarFallback>{job.company_name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">@{job.company_name}</h4>
            <Label className="font-extrabold text-primary">{job.title}</Label>
            <p className="text-xs w-full "><MapPin className="mr-2 h-4 w-4"  />{job.location}</p>
            <p className="text-xs text-muted-foreground"> {job.detected_extensions.schedule_type}</p>
            <p className="text-sm ">{truncatedDescription}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Posted {job.detected_extensions.posted_at}
              </span>
            </div>
            <Button 
              onClick={() => {
                router.push(job.apply_options[0].link);
              }}
              className="rounded-none"
            >
              <Eye className="mr-2 h-4 w-4" />
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
