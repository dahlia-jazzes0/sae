import { Button } from "@/components/ui/button";
import { FirebaseError } from "firebase/app";
import { useActionState, useRef, type RefObject } from "react";
import { ZodError } from "zod";

interface PostEditorProps {
  ref?: RefObject<HTMLTextAreaElement | null>;
  onSubmit?: ({ content }: { content: string }) => void | Promise<void>;
  defaultValue?: string;
  placeholder?: string;
  submitText?: string;
  reset?: boolean;
  resetText?: string;
  onReset?: () => void;
}
export function PostEditor({
  ref,
  onSubmit,
  defaultValue,
  placeholder,
  submitText,
  reset,
  resetText,
  onReset,
}: PostEditorProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    async (_: string | undefined, formData: FormData) => {
      try {
        const content = formData.get("content") as string;
        await onSubmit?.({ content });
      } catch (error) {
        if (error instanceof ZodError) {
          return error.issues.map((issue) => issue.message).join("\n");
        } else if (error instanceof FirebaseError) {
          return error.message;
        }
        console.error(error);
        return "문제가 발생했어요";
      }
      return "Ctrl + Enter를 눌러 전송할 수 있어요";
    },
    "Ctrl + Enter를 눌러 전송할 수 있어요"
  );
  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-y-2"
      onReset={onReset}
    >
      <textarea
        ref={ref}
        name="content"
        className="rounded focus:outline focus:outline-primary"
        defaultValue={defaultValue}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
          }
          if (reset && e.key === "Escape") {
            formRef.current?.reset();
          }
        }}
      ></textarea>
      <div className="flex justify-between items-center text-muted-foreground gap-2 w-full">
        <p className="text-xs overflow-ellipsis w-0 flex-1 whitespace-nowrap break-keep overflow-clip">
          {state}
        </p>
        {reset && (
          <Button type="reset" disabled={isPending} variant="secondary">
            {resetText ?? "취소"}
          </Button>
        )}
        <Button type="submit" disabled={isPending}>
          {submitText ?? "전송"}
        </Button>
      </div>
    </form>
  );
}
