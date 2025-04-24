"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"

interface LoginPromptProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message?: string
}

export default function LoginPrompt({ open, onOpenChange, message }: LoginPromptProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription className="text-gray-400">
            {message || "Please login to access this feature."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Link href="/login" className="w-full sm:w-auto">
            <Button className="w-full bg-teal-600 hover:bg-teal-700">Login</Button>
          </Link>
          <Link href="/register" className="w-full sm:w-auto">
            <Button className="w-full">Register</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

