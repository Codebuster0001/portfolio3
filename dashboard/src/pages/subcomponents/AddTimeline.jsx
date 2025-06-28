import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  createTimeline,
  updateTimeline,
  clearTimelineErrors,
  clearTimelineMessages,
} from "@/store/slices/timelineSlice";
import { useLocation, useNavigate } from "react-router-dom";

const AddTimeline = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, message } = useSelector((state) => state.timelines);
  const editData = location.state?.editData || null;

  const [formData, setFormData] = useState({
    year: editData?.year || "",
    title: editData?.title || "",
    description: editData?.description || "",
  });

  const isEditMode = Boolean(editData);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const { year, title, description } = formData;
    if (!year || !title || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isEditMode) {
      dispatch(updateTimeline(editData._id, formData));
    } else {
      dispatch(createTimeline(formData));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearTimelineErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(clearTimelineMessages());
      navigate("/dashboard/timeline");
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="min-h-screen p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditMode ? "Edit Timeline Entry" : "Create Timeline Entry"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              placeholder="e.g. 2024"
              value={formData.year}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Joined ABC Company"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Short description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update"
                : "Create"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard/timeline")}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTimeline;
