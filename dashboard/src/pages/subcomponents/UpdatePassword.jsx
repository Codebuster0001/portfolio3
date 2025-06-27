import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UpdatePassword = () => {
  return (
    <form className="grid gap-6 max-w-lg">
      <div className="grid gap-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          placeholder="Enter current password"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Enter new password"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Update Password</Button>
      </div>
    </form>
  );
};

export default UpdatePassword;
