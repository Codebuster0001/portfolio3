import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
    clearTimelineErrors,
    clearTimelineMessages,
    createTimeline,
    updateTimeline,
} from "../../store/slices/timelineSlice";

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
    <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
      {/* Quote section */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-primary">
          {isEditMode ? "Edit Timeline Entry" : "Create Timeline Entry"}
        </h1>
        <p className="text-muted-foreground italic">
          “Your time is limited, so don't waste it living someone else's life.”
          – Steve Jobs
        </p>
      </div>

      <Card className="shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="text-xl">
            {isEditMode
              ? "Update the timeline details below:"
              : "Fill in the timeline details below:"}
          </CardTitle>
          <CardDescription>
            Please provide the year, title, and a brief description for your
            timeline entry.
          </CardDescription>
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
              placeholder="e.g. Started Freelancing"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Short description of the event"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Entry"
                : "Create Entry"}
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
