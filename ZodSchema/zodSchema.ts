import {z} from "zod"
export const PersonalDetailFormSchema = z.object({
    FirstName:z.string().min(1,{message:"Length should be greater than 1"}),
    LastName:z.string().min(1,{message:"Length should be greater than 1"}),
    SKill:z.string().min(1,{message:"Cannot be empty"}),
    LinkdinId:z.string().min(1,{message:"Cannot be empty"}),
    GithubId:z.string().min(1,{message:"Cannot be empty"}),
    Location:z.string().min(1,{message:"Cannot be empty"}),
})

export const PostFormSchema=z.object({
    Comment:z.string().min(1,{message:"Length should be greater than 1"})
})

export const MailFormSchema=z.object({
    email:z.string().min(1,{message:"Length should be greater than 1"}),
    name:z.string().min(1,{message:"Length should be greater than 1"}),
    issue:z.string().min(1,{message:"Length should be greater than 1"})
})