import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/QueryAndMutation";
import Loader from "@/components/shared/Loader";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();
  let savedPostRecord = "";
  
  useEffect(() => {
    if(currentUser && currentUser.save){
   savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post.$id === post.$id
      );
      
      if (savedPostRecord) {
        console.log("This post is already saved!");
      } else {
        console.log("This post is not saved yet.");
      }
    }
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({postId: post?.$id || '', userId: userId})
    }
  };

  // const containerStyles = location.pathname.startsWith("/profile")
  //   ? "w-full"
  //   : "";

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {
          isSavingPost || isDeletingSavedPost 
          ? <Loader />
          : <img
            src={
              isSaved
              ? "/assets/icons/saved.svg"
              : "/assets/icons/save.svg"
            }
            alt="like"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleSavePost}
          />
        }
      </div>
    </div>
  );
};

export default PostStats;