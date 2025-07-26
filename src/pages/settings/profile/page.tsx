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
import { Input } from "@/components/ui/input";
import { getUser } from "@/entities/users/db/get-user";
import { updateUser } from "@/entities/users/db/update-user";
import { useAuth } from "@/shared/auth/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";
import { use } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type FormSchema = z.infer<typeof formSchema>;
const formSchema = z.object({
  displayName: z.string().optional(),
  photoURL: z.string().optional(),
  bannerURL: z.string().optional(),
  bio: z.string().optional(),
});

export function SettingsProfilePage() {
  const auth = useAuth(true);
  const user = use(getUser(auth.uid));
  const defaultValues = {
    displayName: auth.displayName ?? undefined,
    photoURL: auth.photoURL ?? undefined,
    bannerURL: user.bannerURL ?? undefined,
    bio: user.bio ?? undefined,
  };
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  async function onSubmit(values: FormSchema) {
    const displayName = values.displayName || null;
    const photoURL = values.photoURL || null;
    const bannerURL = values.bannerURL || null;
    const bio = values.bio || null;
    if (
      displayName !== defaultValues.displayName ||
      photoURL !== defaultValues.photoURL
    ) {
      await updateProfile(auth, {
        displayName,
        photoURL,
      });
    }
    if (
      displayName !== defaultValues.displayName ||
      photoURL !== defaultValues.photoURL ||
      bannerURL !== defaultValues.bannerURL ||
      bio !== defaultValues.bio
    ) {
      await updateUser({
        uid: auth.uid,
        displayName,
        photoURL,
        bannerURL,
        bio,
      });
    }
    location.href = "/";
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 p-2"
      >
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>별명</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photoURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>프로필 사진 URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                CORS 문제가 없는 프로필 사진 URL을 작성해주세요
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bannerURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>배너 URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                CORS 문제가 없는 배너 사진 URL을 작성해주세요
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>한 줄 소개</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">저장</Button>
      </form>
    </Form>
  );
}
