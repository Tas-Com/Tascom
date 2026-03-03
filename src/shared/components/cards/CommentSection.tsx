import { useState } from "react";
import { MessageCircle, MoreVertical, Send } from "lucide-react";
import { useCommentsByTask, useCreateComment } from "@/modules/tasks/comments/hooks/useComments";
import { useCurrentUser } from "@/modules/profile/hooks/useCurrentUser";
import type { Comment } from "@/modules/tasks/comments/entities/Comment";

interface CommentSectionProps {
  taskId: string;
}

export function CommentSection({ taskId }: CommentSectionProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const taskIdNum = Number(taskId);
  const { data: commentsData, isLoading } = useCommentsByTask(taskIdNum);
  const createComment = useCreateComment();
  const { data: currentUser } = useCurrentUser();

  const comments = commentsData?.data || [];

  const getReplies = (commentId: string) => {
    return (comments as Comment[]).filter((c: Comment) => c.replyId === commentId);
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await createComment.mutateAsync({
        taskId: taskIdNum,
        content: newComment.trim(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleReply = async (_commentId: string) => {
    if (!replyText.trim()) return;

    try {
      await createComment.mutateAsync({
        taskId: taskIdNum,
        content: replyText.trim(),
      });
      setReplyText("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
  };

  const renderCommentWithReplies = (comment: Comment, level: number = 0) => {
    const replies = getReplies(comment.id);
    const marginLeft = level > 0 ? "ml-8" : "";
    const avatarSize = level > 0 ? "w-6 h-6" : "w-8 h-8";
    const buttonSize =
      level > 0
        ? "pt-[6px] pr-[10px] pb-[6px] pl-[10px] text-xs"
        : "pt-[8px] pr-[12px] pb-[8px] pl-[12px]";
    const iconSize = level > 0 ? 14 : 16;

    const userAvatar = comment.user?.avatar || comment.user?.assets?.[0]?.url || "";

    return (
      <div key={comment.id} className={marginLeft}>
        <div className="flex gap-3">
          <img
            src={userAvatar || "/default-avatar.png"}
            alt={comment.user?.name || "User"}
            className={`${avatarSize} rounded-full object-cover`}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{comment.user?.name || "User"}</span>
                <span className="text-text-secondary text-label2 mt-0.5">
                  {formatTimeAgo(comment.createdAt)}
                </span>
              </div>
              <button className="text-text-caption2 hover:text-brand-purple">
                <MoreVertical size={16} />
              </button>
            </div>
            <p className="text-label2 text-text-primary mt-1">
              {comment.content}
            </p>
            <button
              className={`text-label1 font-medium text-text-primary mt-2 bg-bg-primary rounded-[40px] 
            ${buttonSize} flex items-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer`}
              onClick={() =>
                setReplyingTo(replyingTo === comment.id ? null : comment.id)
              }
            >
              <MessageCircle size={iconSize} />
              Reply
            </button>
            {replyingTo === comment.id && (
              <div className="mt-3 flex gap-3">
                <div
                  className={`${level > 0 ? "w-6 h-6" : "w-8 h-8"} rounded-full bg-gray-200 shrink-0`}
                ></div>
                <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleReply(comment.id);
                      }
                    }}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button
                    className="text-brand-purple hover:text-purple-600"
                    onClick={() => handleReply(comment.id)}
                    disabled={createComment.isPending}
                  >
                    <Send size={iconSize} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {replies.map((reply: Comment) => renderCommentWithReplies(reply, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-purple"></div>
        </div>
      </div>
    );
  }

  const displayComments = showAllComments
    ? comments
    : comments.slice(0, 3);

  return (
    <div className="pt-4 space-y-3">
      <div className="flex items-center justify-between text-body-s1 mb-8">
        <span>Comments ({comments.length})</span>
        <select className="bg-primary rounded-[40px] outline-none text-primary font-medium text-sm px-3 py-1">
          <option>All</option>
          <option>Recent</option>
          <option>Popular</option>
        </select>
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-text-secondary text-sm text-center py-4">No comments yet. Be the first to comment!</p>
        ) : (
          (displayComments as Comment[]).map((comment: Comment) => renderCommentWithReplies(comment))
        )}
      </div>

      {!showAllComments && comments.length > 3 && (
        <button
          className="text-brand-purple hover:text-purple-600 text-sm font-medium py-2 cursor-pointer"
          onClick={() => setShowAllComments(true)}
        >
          Show more comments ({comments.length - 3} more)
        </button>
      )}

      <div className="flex gap-3">
        <img
          src={currentUser?.avatar || currentUser?.assets?.[0]?.url || "/default-avatar.png"}
          alt="Your avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newComment.trim()) {
                handleAddComment();
              }
            }}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button
            className="text-brand-purple hover:text-purple-600 disabled:opacity-50"
            onClick={handleAddComment}
            disabled={createComment.isPending || !newComment.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
