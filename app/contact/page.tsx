"use client"
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SendHorizontal, ShieldAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { MailFormSchema } from "@/ZodSchema/zodSchema";
import axios from "axios";
import { Paperclip } from "lucide-react";
import { SingleUploader } from "@/components/uploadthing/test";
import toast from "react-hot-toast";
import { UploadButton } from "@/utils/uploadthings";
import Loader from "@/components/Loader";
const Page = () => {
  const [removing, setRemoving] = useState(false);
  const [fileurl, setFileUrl] = useState<string | undefined>(undefined);
  const [sending, setSending] = React.useState(false);
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
  const form = useForm<z.infer<typeof MailFormSchema>>({
    resolver: zodResolver(MailFormSchema),
    defaultValues: {
      email: "",
      name: "",
      issue: "",
    },
  });
  async function onSubmit(values: z.infer<typeof MailFormSchema>) {
    const { email, name, issue } = values;
    
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          console.log(values);
          setSending(true);
          const res = await axios.post("/api/sendmail", {
            email,
            name,
            issue,
            fileurl
          });
          form.reset();
          setSending(false);
setFileUrl(undefined)
          resolve(res.data); // Resolve the promise if the request is successful
        } catch (error) {
          setSending(false);
          reject(error); // Reject the promise if there's an error
        }
      }),
      {
        loading: 'Sending...',
        success: <b>Mail Sent!</b>,
        error: <b>Could not Sent.</b>,
      }
    );
  }
  
  return (
    <div className="flex justify-center">
      <Card className="w-full m-2  ">
        <CardHeader className="font-semibold w-full justify-center flex items-center"></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
          control={form.control}
          name="issue"
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
        <div className="flex items-center gap-2 p-3 pt-0">
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
                  disabled={uploading || sending}
                  className="w-full"
                  size="lg"
                  type="submit"
                >
                  {sending ? (
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
                    <>{uploading? "File Uploading...":<><SendHorizontal className="mr-2 h-5 w-5" />Mail</>}</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex-col w-full gap-2 justify-center"></CardFooter>
        <CardDescription className=" flex justify-center"></CardDescription>
      </Card>
      
    </div>
  );
};

export default Page;
