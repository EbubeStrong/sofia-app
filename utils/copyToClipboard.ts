import { toast } from "sonner";

export const handleCopyToClipboard = (name: string) => {
  navigator.clipboard.writeText("HELLO20");
  toast.success(`${name} copied successfully`);
};
