import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  MessageCircle,
  MoreVertical,
  Send,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  useCommentsByTask,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from "@/modules/tasks/comments/hooks/useComments";
import { useCurrentUser } from "@/modules/profile/hooks/useCurrentUser";
import { useUserById } from "@/modules/profile/hooks/useCurrentUser";
import userDefaultImg from "@/assets/user.jpg";
import type { Comment } from "@/modules/tasks/comments/entities/Comment";

interface CommentSectionProps {
  taskId: string;
}

interface CommentItemProps {
  comment: Comment;
  level: number;
  allComments: Comment[];
  currentUserId?: string;
  replyingTo: string | null;
  setReplyingTo: (id: string | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  handleReply: (commentId: string) => void;
  editingCommentId: string | null;
  editText: string;
  setEditText: (text: string) => void;
  handleStartEdit: (comment: Comment) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: () => void;
  handleDelete: (commentId: string) => void;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  showRepliesFor: Set<string>;
  setShowRepliesFor: React.Dispatch<React.SetStateAction<Set<string>>>;
  createPending: boolean;
  updatePending: boolean;
  deletePending: boolean;
  currentUserAvatar: string;
}

function CommentItem({
  comment,
  level,
  allComments,
  currentUserId,
  replyingTo,
  setReplyingTo,
  replyText,
  setReplyText,
  handleReply,
  editingCommentId,
  editText,
  setEditText,
  handleStartEdit,
  handleCancelEdit,
  handleSaveEdit,
  handleDelete,
  openMenuId,
  setOpenMenuId,
  showRepliesFor,
  setShowRepliesFor,
  createPending,
  updatePending,
  deletePending,
  currentUserAvatar,
}: CommentItemProps) {
  const { data: commentUser } = useUserById(comment.userId);

  const getReplies = () => {
    if (comment.replies && comment.replies.length > 0) {
      return comment.replies;
    }
    return allComments.filter((c) => String(c.replyId) === String(comment.id));
  };

  const replies = getReplies();
  const marginLeft = level > 0 ? "ml-8" : "";
  const avatarSize = level > 0 ? "w-6 h-6" : "w-8 h-8";
  const buttonSize =
    level > 0
      ? "pt-[6px] pr-[10px] pb-[6px] pl-[10px] text-xs"
      : "pt-[8px] pr-[12px] pb-[8px] pl-[12px]";
  const iconSize = level > 0 ? 14 : 16;

  const userAvatar =
    commentUser?.avatar ||
    commentUser?.assets?.find((a) => !a.taskId)?.url ||
    "";
  const userName = commentUser?.name || comment.user?.name || "User";
  const isEditing = editingCommentId === comment.id;
  const isOwn = currentUserId
    ? String(comment.userId) === String(currentUserId)
    : false;

  return (
    <div className={marginLeft}>
      <div className="flex gap-3">
        <Link
          to="/user-profile/$userId"
          params={{ userId: String(comment.userId) }}
          className="shrink-0"
        >
          <img
            src={userAvatar || userDefaultImg}
            alt={userName}
            className={`${avatarSize} rounded-full object-cover hover:opacity-80 transition-opacity cursor-pointer`}
          />
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                to="/user-profile/$userId"
                params={{ userId: String(comment.userId) }}
                className="font-semibold text-sm hover:text-brand-purple transition-colors cursor-pointer"
              >
                {userName}
              </Link>
              <span className="text-text-secondary text-label2 mt-0.5">
                {formatTimeAgo(comment.createdAt)}
              </span>
              {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                <span className="text-text-secondary text-label2 italic">
                  (edited)
                </span>
              )}
            </div>
            {isOwn && !isEditing ? (
              <div className="relative">
                <button
                  className="text-text-caption2 hover:text-brand-purple"
                  onClick={() =>
                    setOpenMenuId(openMenuId === comment.id ? null : comment.id)
                  }
                >
                  <MoreVertical size={16} />
                </button>
                {openMenuId === comment.id && (
                  <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-25">
                    <button
                      onClick={() => handleStartEdit(comment)}
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      disabled={deletePending}
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ) : !isEditing ? (
              <button className="text-text-caption2 hover:text-brand-purple">
                <MoreVertical size={16} />
              </button>
            ) : null}
          </div>

          {isEditing ? (
            <div className="mt-1">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm resize-none focus:outline-none focus:border-brand-purple transition-colors"
                rows={2}
                autoFocus
              />
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={handleSaveEdit}
                  disabled={!editText.trim() || updatePending}
                  className="flex items-center gap-1 px-3 py-1 bg-brand-purple text-white text-xs rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {updatePending ? (
                    <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    <Check size={12} />
                  )}
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-1 px-3 py-1 border border-gray-300 text-text-secondary text-xs rounded-full hover:bg-gray-50 transition-colors"
                >
                  <X size={12} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
          {replyingTo === comment.id && (
            <div className="mt-3 flex gap-3">
              <img
                src={currentUserAvatar}
                alt="Your avatar"
                className={`${level > 0 ? "w-6 h-6" : "w-8 h-8"} rounded-full object-cover shrink-0`}
              />
              <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && replyText.trim()) {
                      handleReply(comment.id);
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-sm"
                  autoFocus
                />
                <button
                  className="text-brand-purple hover:text-purple-600 disabled:opacity-50"
                  onClick={() => handleReply(comment.id)}
                  disabled={createPending || !replyText.trim()}
                >
                  <Send size={iconSize} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {replies.length > 0 && (
        <div className="mt-2">
          <button
            className="flex items-center gap-1 text-brand-purple text-sm font-medium hover:text-purple-600 transition-colors cursor-pointer ml-11"
            onClick={() => {
              setShowRepliesFor((prev) => {
                const next = new Set(prev);
                if (next.has(comment.id)) {
                  next.delete(comment.id);
                } else {
                  next.add(comment.id);
                }
                return next;
              });
            }}
          >
            {showRepliesFor.has(comment.id) ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
            {showRepliesFor.has(comment.id)
              ? "Hide replies"
              : `Show replies (${replies.length})`}
          </button>
          {showRepliesFor.has(comment.id) && (
            <div className="mt-3 space-y-3">
              {replies.map((reply: Comment) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  level={level + 1}
                  allComments={allComments}
                  currentUserId={currentUserId}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  handleReply={handleReply}
                  editingCommentId={editingCommentId}
                  editText={editText}
                  setEditText={setEditText}
                  handleStartEdit={handleStartEdit}
                  handleCancelEdit={handleCancelEdit}
                  handleSaveEdit={handleSaveEdit}
                  handleDelete={handleDelete}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  showRepliesFor={showRepliesFor}
                  setShowRepliesFor={setShowRepliesFor}
                  createPending={createPending}
                  updatePending={updatePending}
                  deletePending={deletePending}
                  currentUserAvatar={currentUserAvatar}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

/* ── Main comment section ── */
export function CommentSection({ taskId }: CommentSectionProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showRepliesFor, setShowRepliesFor] = useState<Set<string>>(new Set());

  const taskIdNum = Number(taskId);
  const { data: commentsData, isLoading } = useCommentsByTask(taskIdNum);
  const createComment = useCreateComment();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();
  const { data: currentUser } = useCurrentUser();

  const comments = commentsData?.data || [];

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

  const handleReply = async (commentId: string) => {
    if (!replyText.trim()) return;

    try {
      await createComment.mutateAsync({
        taskId: taskIdNum,
        content: replyText.trim(),
        replyId: Number(commentId),
      });
      setReplyText("");
      setReplyingTo(null);
      setShowRepliesFor((prev) => new Set(prev).add(commentId));
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
  };

  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.content);
    setOpenMenuId(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const handleSaveEdit = async () => {
    if (!editText.trim() || !editingCommentId) return;
    try {
      await updateComment.mutateAsync({
        id: Number(editingCommentId),
        content: editText.trim(),
      });
      setEditingCommentId(null);
      setEditText("");
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment.mutateAsync(Number(commentId));
      setOpenMenuId(null);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const currentUserAvatar =
    currentUser?.avatar ||
    currentUser?.assets?.find((a) => !a.taskId)?.url ||
    userDefaultImg;

  if (isLoading) {
    return (
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-purple"></div>
        </div>
      </div>
    );
  }

  const topLevelComments = (comments as Comment[]).filter(
    (c: Comment) => c.replyId === null || c.replyId === undefined,
  );

  const totalCommentCount = topLevelComments.reduce(
    (count, c) => count + 1 + (c.replies?.length || 0),
    0,
  );

  const displayComments = showAllComments
    ? topLevelComments
    : topLevelComments.slice(0, 3);

  return (
    <div className="pt-4 space-y-3">
      <div className="flex items-center justify-between text-body-s1 mb-8">
        <span>Comments ({totalCommentCount})</span>
        <select className="bg-primary rounded-[40px] outline-none text-primary font-medium text-sm px-3 py-1">
          <option>All</option>
          <option>Recent</option>
          <option>Popular</option>
        </select>
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-text-secondary text-sm text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          (displayComments as Comment[]).map((comment: Comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              level={0}
              allComments={comments as Comment[]}
              currentUserId={
                currentUser?.id ? String(currentUser.id) : undefined
              }
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyText={replyText}
              setReplyText={setReplyText}
              handleReply={handleReply}
              editingCommentId={editingCommentId}
              editText={editText}
              setEditText={setEditText}
              handleStartEdit={handleStartEdit}
              handleCancelEdit={handleCancelEdit}
              handleSaveEdit={handleSaveEdit}
              handleDelete={handleDelete}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              showRepliesFor={showRepliesFor}
              setShowRepliesFor={setShowRepliesFor}
              createPending={createComment.isPending}
              updatePending={updateComment.isPending}
              deletePending={deleteComment.isPending}
              currentUserAvatar={currentUserAvatar}
            />
          ))
        )}
      </div>

      {!showAllComments && topLevelComments.length > 3 && (
        <button
          className="text-brand-purple hover:text-purple-600 text-sm font-medium py-2 cursor-pointer"
          onClick={() => setShowAllComments(true)}
        >
          Show more comments ({topLevelComments.length - 3} more)
        </button>
      )}

      <div className="flex gap-3">
        <img
          src={currentUserAvatar}
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
