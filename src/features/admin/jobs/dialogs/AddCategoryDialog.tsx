"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

export function AddCategoryDialog({
  onCreate,
  triggerLabel = "Add New Category",
}: {
  onCreate: (label: string) => void
  triggerLabel?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [label, setLabel] = React.useState("")

  const handleSave = () => {
    if (!label.trim()) return
    onCreate(label.trim())
    setLabel("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary">
          <Plus className="h-4 w-4 mr-1.5" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Add a new category and select it for this job.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="new-category">
              Category name
            </label>
            <Input
              id="new-category"
              placeholder="e.g. DevOps"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!label.trim()}>
            Save Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
