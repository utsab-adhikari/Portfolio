"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface ApiResponse {
  message: string;
  success?: boolean;
}

export default function CreatePrepDrawer() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Prep</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Prep</DialogTitle>
            <DialogDescription>
              Add Preps/todo. Click Add when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Prep</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Prep</DrawerTitle>
          <DialogDescription>
            Add Preps/todo. Click Add when you&apos;re done.
          </DialogDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const [openPop, setOpenPop] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [dayno, setDayno] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Adding Prep...");

    const formData = {
      title,
      dayno,
      category,
      date,
      description,
    };

    try {
      const response = await axios.post<ApiResponse>(
        "/api/v1/admin/preps/create",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message, { id: toastId });
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Prep Creation Failed!", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };
  console.log(date);
  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3">
        <Label htmlFor="email">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="text"
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="day">Day No.</Label>
        <Input
          value={dayno}
          onChange={(e) => setDayno(e.target.value)}
          type="number"
          id="day"
        />
      </div>

      <div className="flex items-center w-full">
        <div className="flex flex-col gap-3 w-full">
          <Label htmlFor="date-picker" className="px-1">
            Date
          </Label>
          <Popover open={openPop} onOpenChange={setOpenPop}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-full justify-between font-normal"
              >
                {date ? format(date, "PPP") : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpenPop(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="category">Select Category</Label>
        <Select
          name="category"
          value={category}
          onValueChange={(value) => setCategory(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gsoc">GSOC</SelectItem>
            <SelectItem value="opensource">Open Source</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="other">other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          defaultValue="My Prep"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className={`w-full
            ${isLoading ? "cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Adding....." : "Add"}
      </Button>
    </form>
  );
}
