"use server"
import { redirect } from "next/navigation"

export const RedirectToNewUserPage=()=>{
        redirect("/newuser");
}
