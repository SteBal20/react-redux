export type NotificationType = {
  status: "error" | "success" | "pending";
  title: string;
  message: string;
};
