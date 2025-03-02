/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { UploadButton, useUploadThing } from "@/utils/uploadthings";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { PostFormSchema } from "@/ZodSchema/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { CornerDownLeft, Mic, Paperclip, SendHorizontal } from "lucide-react";
import Loader from "../Loader";
import { ShieldAlert } from 'lucide-react';
export default function CreatePost() {
  const [removing, setRemoving] = useState(false);
  const [fileurl, setFileUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = React.useState(false);
  const clearImage = async () => {
    if (fileurl) {
      setRemoving(true);
      const res = await axios.post("/api/utapi", { fileurl });
      if (res.data.success) {
        setFileUrl(undefined);
      }
      setRemoving(false);
    }
  };
  const [saving, setSaving] = React.useState(false);
  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      Comment: "",
    },
  });
  async function onSubmit(values: z.infer<typeof PostFormSchema>) {
    try {
      const { Comment } = values;
      setSaving(true);

      const res = await axios.post("/api/post", {
        Comment,
        fileurl,
      });
      form.reset();
      setSaving(false);
      window.location.reload();
    } catch (error) {
      setSaving(false);
      console.log("error");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full p-5 space-y-3 shadow-lg rounded-lg "
      >
        <FormField
          control={form.control}
          name="Comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 w-full shadow-none focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center p-3 pt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {!fileurl ? (
                  <UploadButton
                    endpoint="attachment"
                    appearance={{
                      button:
                        "ut-ready:bg-reen-500 ut-uploading:cursor-not-allowed rounded-sm p-2   w-fit  after:bg-orange-400",
                      container: "rounded-lg border-cyan-300 bg-slate-800",
                      allowedContent: "hidden",
                    }}
                    content={{
                      button({ ready }) {
                        if (ready) return <Paperclip className="size-4" />;

                        return <ShieldAlert />;
                      },
                      allowedContent({ ready, fileTypes, isUploading }) {
                        if (!ready) return "";
                        if (isUploading) return "wait";
                        return ``;
                      },
                    }}
                    onUploadAborted={()=>{
                      setUploading(false)
                    }}
                    onUploadBegin={()=>{
                      setUploading(true)
                    }}
                    onClientUploadComplete={(res) => {
                      setFileUrl(res[0].serverData.fileUrl);
                      setUploading(false)
                    }}
                    onUploadError={(error: Error) => {
                      setUploading(false)
                    }}
                  />
                ) : (
                  <div className="flex h-12 w-12  relative">
                    {removing ? (
                      <Loader />
                    ) : (
                      <>
                        <Button
                          onClick={clearImage}
                        >
                          Remove
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            type="submit"
            disabled={uploading || saving}
            size="sm"
            className="ml-auto gap-1.5"
          >
            {saving ? (
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              <>{uploading?"File Uploading...":"Post Message"}</>
            )}
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
