import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FullPostType } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface props {
  data: FullPostType;
  user: any;
  disableButtonProps: boolean;
}

const PostComments: React.FC<props> = ({ data, user, disableButtonProps }) => {
  const [commentValue, setCommentValue] = useState<string>("");
  const [disableButton, setDisableButton] =
    useState<boolean>(disableButtonProps);
  const [notAuth, setNotAuth] = useState<boolean>(!user ? true : false);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setNotAuth(true);
    } else setNotAuth(false);
  }, [user]);

  const handlePostSubmit = async (event: any) => {
    event.preventDefault();

    if (disableButton) {
      toast.success("Post Submited");
      return;
    }

    const commentData = {
      message: commentValue,
      userId: user.id,
      postId: data.id,
    };

    axios
      .post("/api/comment", commentData)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Comment Sent");
        }
        setDisableButton(true);
        setCommentValue("");
        localStorage.setItem("disableButton", "true");
        router.refresh();
      })
      .catch((error) => {
        toast.error("An Error Occured");
      });
  };

  return (
    <div>
      <h1 className="py-10 text-2xl">Comments Section</h1>

      <form className="flex gap-10 pb-10">
        <Input
          className={`${""} grow`}
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          type="text"
          placeholder="Enter comment"
        />
        <Button
          className={cn("bg-primary", disableButton && "cursor-not-allowed")}
          disabled={disableButton || notAuth}
          onClick={(event) => handlePostSubmit(event)}
          type="submit"
        >
          Post
        </Button>
      </form>
      {disableButton && (
        <div className="">
          <p>
            Thank you for your comment. You can post another comment after it
            has been moderated
          </p>
        </div>
      )}
      {notAuth && (
        <div className="text-slate-600 italic">
          <p>Login in to post comments</p>
        </div>
      )}
    </div>
  );
};

export default PostComments;
