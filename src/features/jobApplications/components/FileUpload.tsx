import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface FileUploadProps {
  label: string
  accept: string
  file: File | null
  onFileUpload: (file: File | null) => void
  required?: boolean
}

export function FileUpload({ label, accept, file, onFileUpload, required = false }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    onFileUpload(selectedFile)
  }

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && "*"}
      </Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <input type="file" id="file-upload" accept={accept} onChange={handleFileChange} className="hidden" />
          <Button
            variant="outline"
            className="mb-2 bg-transparent"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            Choose File
          </Button>
          <p className="text-sm text-gray-500">
            {file
              ? `Selected: ${file.name}`
              : `Upload your ${label.toLowerCase()} (${accept.replace(/\./g, "").toUpperCase()})`}
          </p>
        </div>
      </div>
    </div>
  )
}
