import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import type { skillManagement } from "../skillsTypes";

interface ShowSkillInfoDialogProps {
  open: boolean;
  onClose: () => void;
  skill: skillManagement;
}

export default function ShowSkillInfoDialog({
  open,
  onClose,
  skill,
}: ShowSkillInfoDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4 pb-4">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight pr-8">
              {skill.name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0 h-8 w-8 rounded-full hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close modal</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
              <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
              About This Skill
            </h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed text-base">
                {skill.description}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center text-slate-600 bg-slate-50 rounded-lg p-4">
              <Calendar className="w-5 h-5 mr-3 text-slate-500" />
              <div>
                <span className="text-sm font-medium text-slate-900">
                  Added to Portfolio
                </span>
                <p className="text-sm text-slate-600">
                  {formatDate(skill.createDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
