import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PostValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetUser } from "@/hooks/useGetUser";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import FileUploader from "./FileUploader";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { format } from "path";

const PostForm = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      content: "",
      file: [],
      category: "Frontend",
      tags: ""
    },
  });

  const categoryList = [
    "Frontend",
    "Backend",
    "Cloud Computing",
    "AI",
    "Data Science",
    "Design",
    "Machine Learning",
    "Embedded System",
    "Video game",
    "Api development",
    "Database development",
  ];

  const handlePost = async (values: z.infer<typeof PostValidation>) => {
    const user = useGetUser();
  const formData = new FormData();
  formData.append("userId", user?.userID);
  formData.append("content", values.content);
  formData.append("imageUrl", values.file[0]); 
  formData.append("category", values.category);
  formData.append("tags", values.tags);

  console.log(formData);

 /*  try {
    const response = await axios.post(`${baseUrl}/posts`, formData, { 
      headers: {
        "Content-Type": "multipart/form-data" 
      },
    });
    console.log(response.data);   
  } catch (error) {
    console.error(error);
  }   */
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePost)}
        className="flex flex-col gap-9 w-full  max-w-5xl"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Content</FormLabel>
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

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Category</FormLabel>
              <FormControl>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                 <SelectTrigger>
                  <SelectValue placeholder="Select a category"/>
                 </SelectTrigger>
                 <SelectContent className=" bg-black">
                  <SelectGroup>
                    {categoryList.map((category) => (
                      <SelectItem className=" hover:cursor-pointer hover:opacity-20" key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                 </SelectContent>
               </Select>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label"> Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  {...field}
                  placeholder="Type tags"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">Post</Button>
      </form>
    </Form>
  );
};

export default PostForm;
