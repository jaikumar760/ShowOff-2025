import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";
const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser()
      if (!user) throw new UploadThingError("Unauthorized");
      return { clerkUserId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.clerkUserId);
 
      console.log("file url", file.url);
        
      return { fileUrl:file.url };
    }),
    attachment:f({ image: { maxFileSize: "4MB" },audio:{maxFileSize:"128MB"},video:{maxFileSize:"128MB"},pdf:{maxFileSize:"16MB"},text:{maxFileSize:"16MB"} })
    .middleware(async ({ req }) => {
      return { clerkUserId: "something" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.clerkUserId);
 
      console.log("file url", file.url);
      return { fileUrl:file.url };
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;