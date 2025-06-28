// src/pages/UpdateProfile.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
  clearMessage,
} from "@/store/slices/userSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [description, setDescription] = useState(user?.description || "");
  const [technologies, setTechnologies] = useState(
    user?.technologies?.join(", ") || ""
  );
  const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL || "");
  const [linkedInURL, setLinkedInURL] = useState(user?.linkedInURL || "");
  const [githubURL, setGithubURL] = useState(user?.githubURL || "");
  const [instagramURL, setInstagramURL] = useState(user?.instagramURL || "");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("description", description);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);

    // ✅ Send as JSON string for backend to parse
    const techArray = technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech);
    formData.append("technologies", JSON.stringify(techArray));

    if (resume) {
      formData.append("resume", resume);
    }

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isUpdated) {
      toast.success("Profile updated successfully!");
      dispatch(getUser());
      dispatch(resetProfile());
    }

    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, isUpdated, message]);

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="w-full max-w-4xl mx-auto grid gap-6"
    >
      {/* Resume Upload */}
      <div className="grid gap-2">
        <Label htmlFor="resume">Upload Resume</Label>
        <Input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png,.webp"
          onChange={resumeHandler}
        />
        {resumePreview && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-1">Preview:</p>
            <Link
              to={resumePreview}
              target="_blank"
              className="text-blue-600 underline"
            >
              View Resume
            </Link>
          </div>
        )}
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="portfolioURL">Portfolio URL</Label>
          <Input
            id="portfolioURL"
            value={portfolioURL}
            onChange={(e) => setPortfolioURL(e.target.value)}
            placeholder="https://yourportfolio.com"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="githubURL">GitHub URL</Label>
          <Input
            id="githubURL"
            value={githubURL}
            onChange={(e) => setGithubURL(e.target.value)}
            placeholder="https://github.com/username"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="linkedInURL">LinkedIn URL</Label>
          <Input
            id="linkedInURL"
            value={linkedInURL}
            onChange={(e) => setLinkedInURL(e.target.value)}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="instagramURL">Instagram URL</Label>
          <Input
            id="instagramURL"
            value={instagramURL}
            onChange={(e) => setInstagramURL(e.target.value)}
            placeholder="https://instagram.com/username"
          />
        </div>
      </div>

      {/* Description */}
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Write something about yourself..."
        />
      </div>

      {/* Technologies */}
      <div className="grid gap-2">
        <Label htmlFor="technologies">Technologies</Label>
        <Input
          id="technologies"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          placeholder="e.g. React, Node.js, MongoDB"
        />
        <p className="text-xs text-muted-foreground">
          Separate each technology with a comma.
        </p>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfile;
