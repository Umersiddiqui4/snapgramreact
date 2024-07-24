import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";


import {  ProfileValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import FileUploader from "@/components/shared/ProfileUploder";
import Loader  from "@/components/shared/Loader";
import { useGetCurrentUser, useUpdateUser } from "@/lib/react-query/QueryAndMutation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

export default function UpdateProfile() {

  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
console.log(user,'user');

  const { data: post } = useGetCurrentUser();

  if (!post) {
    return (
      <Loader />
    )
  }


  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  // Query
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } = useUpdateUser();


  const handleSubmit = async (value: z.infer<typeof ProfileValidation>) => {
   console.log(value,'value');
   
    // ACTION = CREATE
    const newPost = await updateUser({
      ...value,
        userId: user.id,
        imageUrl: user.imageUrl,
    });
    if(newPost){
      navigate('/');
      window.location.reload();

    }
console.log(newPost,'newpost');

    if (!newPost) {
      toast({
        title: ` Profile updation failed. Please try again.`,
      });
    }
  };

  return (
    <div className="flex flex-1">
    <div className="common-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <img
          src="/assets/icons/edit.svg"
          width={36}
          height={36}
          alt="add"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Update Profile</h2>
      </div>

      <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl">

<FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl >
                <FileUploader 
                  fieldChange={field.onChange}
                  mediaUrl={ post?.imageUrl }
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />




        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

      
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input type="text" disabled className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="email" disabled className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea

                  
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingUpdate}>
            {(isLoadingUpdate) && <Loader />}
             Post
          </Button>
        </div>
      </form>
    </Form>
      
    </div>
  </div>
  )
}
