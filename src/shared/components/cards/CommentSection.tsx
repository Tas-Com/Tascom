import { useState } from "react";
import { MessageCircle, MoreVertical } from "lucide-react";
import { mockCommentsByTask, type Comment } from "@/shared/data/mockComments";
import { useCommentsStore } from "@/store/commentsStore";

interface CommentSectionProps {
  taskId: string;
}

export function CommentSection({ taskId }: CommentSectionProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const { addComment, getComments } = useCommentsStore();

  const allComments = [
    ...(mockCommentsByTask[taskId] || []),
    ...getComments(taskId),
  ];

  const totalComments = allComments.filter(
    (comment) => !comment.replyTo,
  ).length;

  const displayComments = showAllComments
    ? allComments.filter((comment) => !comment.replyTo)
    : allComments.filter((comment) => !comment.replyTo).slice(0, 3);

  // Helper function to get all replies recursively
  const getReplies = (commentId: string) => {
    return allComments.filter((c) => c.replyTo === commentId);
  };

  // Helper function to render comment with all nested replies
  const renderCommentWithReplies = (comment: Comment, level: number = 0) => {
    const replies = getReplies(comment.id);
    const marginLeft = level > 0 ? "ml-8" : "";
    const avatarSize = level > 0 ? "w-6 h-6" : "w-8 h-8";
    const buttonSize =
      level > 0
        ? "pt-[6px] pr-[10px] pb-[6px] pl-[10px] text-xs"
        : "pt-[8px] pr-[12px] pb-[8px] pl-[12px]";
    const iconSize = level > 0 ? 14 : 16;

    return (
      <div key={comment.id} className={marginLeft}>
        <div className="flex gap-3">
          <img
            src={comment.avatar}
            alt={comment.author}
            className={`${avatarSize} rounded-full object-cover`}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{comment.author}</span>
                <span className="text-text-secondary text-label2 mt-0.5">
                  {comment.time}
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
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && replyText.trim()) {
                        addComment(
                          taskId,
                          replyText.trim(),
                          "User",
                          "/Ali.jpg",
                          comment.id,
                        );
                        setReplyText("");
                        setReplyingTo(null);
                      }
                    }}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button
                    className="text-brand-purple hover:text-purple-600"
                    onClick={() => {
                      if (replyText.trim()) {
                        addComment(
                          taskId,
                          replyText.trim(),
                          "User",
                          "/Ali.jpg",
                          comment.id,
                        );
                        setReplyText("");
                        setReplyingTo(null);
                      }
                    }}
                  >
                    <MessageCircle size={iconSize} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Render nested replies */}
        {replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {replies.map((reply) => renderCommentWithReplies(reply, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pt-4 space-y-3">
      <div className="flex items-center justify-between text-body-s1 mb-8">
        <span>Comments ({totalComments})</span>
        <select className="bg-primary rounded-[40px] outline-none text-primary font-medium">
          <option>All</option>
          <option>Recent</option>
          <option>Popular</option>
        </select>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {displayComments.map((comment) => renderCommentWithReplies(comment))}
      </div>

      {/* Show More Button */}
      {!showAllComments && totalComments > 5 && (
        <button
          className="text-brand-purple hover:text-purple-600 text-sm font-medium py-2 cursor-pointer"
          onClick={() => setShowAllComments(true)}
        >
          Show more comments ({totalComments - 5} more)
        </button>
      )}

      {/* Comment Input */}
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && newComment.trim()) {
                addComment(taskId, newComment.trim(), "User", "/Ali.jpg");
                setNewComment("");
              }
            }}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button
            className="text-brand-purple hover:text-purple-600"
            onClick={() => {
              if (newComment.trim()) {
                addComment(taskId, newComment.trim(), "User", "/Ali.jpg");
                setNewComment("");
              }
            }}
          >
            <MessageCircle size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
