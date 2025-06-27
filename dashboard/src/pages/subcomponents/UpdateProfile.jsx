import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const UpdateProfile = () => {
  return (
    <form className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Enter your full name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="Enter your phone number" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="portfolioURL">Portfolio URL</Label>
          <Input id="portfolioURL" placeholder="https://yourportfolio.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="githubURL">Github URL</Label>
          <Input id="githubURL" placeholder="https://github.com/username" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="linkedInURL">LinkedIn URL</Label>
          <Input
            id="linkedInURL"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="instagramURL">Instagram URL</Label>
          <Input
            id="instagramURL"
            placeholder="https://instagram.com/username"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="aboutMe">About Me</Label>
        <Textarea
          id="aboutMe"
          rows={4}
          placeholder="Write something about yourself..."
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Update Profile</Button>
      </div>
    </form>
  );
};

export default UpdateProfile;
