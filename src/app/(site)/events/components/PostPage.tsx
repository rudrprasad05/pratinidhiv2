"use client";

import { FullPostType } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import CommentCard from "./CommentCard";
import PostComments from "./PostComments";

import { formatDistance } from "date-fns";
import { FormElementInstance } from "@/components/forms/FormElements";
import { FileWarning } from "lucide-react";
import PostSection from "./PostSection";

interface props {
  data: FullPostType;
}

const checkDisable = (
  data: FullPostType,
  user: any,
  setDisableCommentSubmit: any
) => {
  data.comments?.map((commentData) => {
    if (user?.id == commentData.userId && !commentData.isModerated)
      setDisableCommentSubmit(true);
  });
};

const PostPage: React.FC<props> = ({ data }) => {
  const [disableCommentSubmit, setDisableCommentSubmit] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const session = useSession();
  const user = session.data?.user;

  const postContent = JSON.parse(data.content) as FormElementInstance[];

  useEffect(() => {
    data.comments?.map((commentData) => {
      if (user?.id == commentData.userId && !commentData.isModerated)
        setDisableCommentSubmit(true);
    });

    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <main className="">
          <PostSection content={postContent} />
          <h1 className="py-10 text-2xl">About the Author</h1>
          <div className="flex justify-between items-center">
            {/* <AuthorCard user={data.author} /> */}
            <div className="text-sm italic">
              {formatDistance(data.createdAt, new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>

          <section>
            {domLoaded && (
              <PostComments
                disableButtonProps={disableCommentSubmit}
                data={data}
                user={user}
              />
            )}

            {data.comments?.map((commentData) => {
              if (user?.id == commentData.userId && !commentData.isModerated)
                return (
                  <CommentCard
                    key={commentData.id}
                    data={commentData}
                    user={user}
                  />
                );
              else if (commentData.isModerated)
                return (
                  <CommentCard
                    key={commentData.id}
                    data={commentData}
                    user={user}
                  />
                );
            })}
          </section>

          {data.comments.length < 1 && (
            <div className="text-slate-700 flex items-center gap-5">
              <FileWarning className={"w-16 h-16"} />
              No comments yet. Start a new Converstaion
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default PostPage;
