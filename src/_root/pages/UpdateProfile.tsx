import { baseUrl } from "@/constants/baseUrl";
import { ProfileValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import editIcon from "@/assets/icons/edit.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ProfileUploader from "@/components/ProfileUploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { Textarea } from "@/components/ui/textarea";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState<any>(null);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const { setValue, ...form } = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      username: "",
      email: "",
      bio: "",
      country: "",
      githubLink: "",
      tags: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(`${baseUrl}/users/${id}`);
      setUserData(res.data);

      // Set form values after data has been fetched
      setValue("username", res.data.username);
      setValue("email", res.data.email);
      setValue("bio", res.data.bio || "");
      setValue("country", res.data.country || "");
      setValue("githubLink", res.data.githubLink || "");
      setValue("tags", res.data.tags || "");
    };

    fetchUserData();
  }, [setValue]);

  //Hanalder
  const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
    setIsLoadingUpdate(true);
    const formData = new FormData();
    if (value.username !== undefined && value.username !== null) {
      formData.append("username", value.username);
    }
    if (value.bio !== undefined && value.bio !== null) {
      formData.append("bio", value.bio);
    }
    if (value.country !== undefined && value.country !== null) {
      formData.append("country", value.country);
    }
    if (value.githubLink !== undefined && value.githubLink !== null) {
      formData.append("githubLink", value.githubLink);
    }
    if (value.tags !== undefined && value.tags !== null) {
      formData.append("tags", value.tags);
    }
    if (value.file !== undefined && value.file !== null && value.file.length > 0) {
      formData.append("file", value.file[0]);
    }
    try {
     const res = await axios.put(`${baseUrl}/users/${id}`, formData).then(() => {
        setIsLoadingUpdate(false);
        console.log(res.data)
      })
    } catch (error) {
      setIsLoadingUpdate(false);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src={editIcon}
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={userData?.profilePicture || ""}
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
                    <Input type="text" className="shad-input" {...field} />
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
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Country</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Github Link</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
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
                  <FormLabel className="shad-form_label">
                    Add Tags (separated by comma " , ")
                  </FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end">
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isLoadingUpdate}
              >
                {isLoadingUpdate && <Loader />}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
