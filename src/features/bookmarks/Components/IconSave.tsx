import { cn } from "@/lib/utils";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  selectBookMarkIsLoading,
  selectIsJobSaved,
} from "@/features/bookmarks/bookmarksSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  saveJobThunk,
  UnsaveJobThunk,
} from "@/features/bookmarks/bookmarksThunk";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
interface SaveButtonProps {
  className?: string;
  jobId: number;
  onToggle?: (updated: boolean) => void;
}

const IconSave = ({ jobId, className = "", onToggle }: SaveButtonProps) => {
  const isSaved = useAppSelector((state) => selectIsJobSaved(state, jobId));
  const currentUserId = useSelector(selectCurrentUser)?.id ?? -1;
  const isLoading = useAppSelector(selectBookMarkIsLoading).save;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.authReducer.isAuthenticated
  );

  function handleToggle() {
    if (!isAuthenticated) {
      navigate("/auth/login");
    } else {
      if (isSaved) {
        dispatch(UnsaveJobThunk({ jobId }));
        // notify the parent that the job is no loger saved to refresh new list from db
        if (onToggle) onToggle(true);
      } else {
        dispatch(
          saveJobThunk({ userId: currentUserId, jobId, dateBooked: new Date() })
        );

        // notify the parent that nothing change so it won't refresh the data
        if (onToggle) onToggle(false);
      }
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        "group relative overflow-hidden transition-all duration-200 ease-in-out",
        "hover:scale-105 active:scale-95",
        !isSaved && "hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700",
        isLoading && "opacity-70 cursor-not-allowed",
        className
      )}
      aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          {isSaved ? (
            <BookmarkCheck
              className={cn(
                "h-4 w-4 transition-all duration-200 text-primary",
                isLoading ? "animate-pulse" : "animate-in zoom-in-50"
              )}
            />
          ) : (
            <Bookmark
              className={cn(
                "h-4 w-4 transition-all duration-200",
                isLoading ? "animate-pulse" : ""
              )}
            />
          )}
        </div>
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </Button>
  );
};

export default IconSave;
