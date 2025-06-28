import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProject,
  updateProject,
  getAllProjects,
} from "@/store/slices/projectSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";

const AddProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { loading } = useSelector((state) => state.project);

  const [formData, setFormData] = useState({
    name: "",
    longDescription: "",
    challenges: [""],
    learnings: [""],
    role: "",
    technologies: [""],
    type: "web",
    githubUrl: "",
    demoUrl: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [editImages, setEditImages] = useState([]);

  // ✅ FIXED: Load project by correct endpoint
  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`http://localhost:5000/api/v1/projects/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          const data = res.data.project;
          setFormData({
            name: data.name || "",
            longDescription: data.longDescription || "",
            challenges: data.challenges || [""],
            learnings: data.learnings || [""],
            role: data.role || "",
            technologies: data.technologies || [""],
            type: data.type || "web",
            githubUrl: data.githubUrl || "",
            demoUrl: data.demoUrl || "",
          });
          setEditImages(data.images || []);
        })
        .catch(() => {
          toast.error("Failed to load project");
        });
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (e, index, key) => {
    const updated = [...formData[key]];
    updated[index] = e.target.value;
    setFormData({ ...formData, [key]: updated });
  };

  const handleAddField = (key) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.longDescription) {
      return toast.error("Project name and description are required");
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("longDescription", formData.longDescription);
    payload.append("role", formData.role);
    payload.append("type", formData.type);
    payload.append("githubUrl", formData.githubUrl);
    payload.append("demoUrl", formData.demoUrl);
    payload.append("challenges", JSON.stringify(formData.challenges));
    payload.append("learnings", JSON.stringify(formData.learnings));
    payload.append("technologies", JSON.stringify(formData.technologies));
    selectedFiles.forEach((file) => payload.append("images", file));

    try {
      if (isEditMode) {
        await dispatch(updateProject(id, payload));
        toast.success("Project updated successfully");
      } else {
        await dispatch(addNewProject(payload));
        toast.success("Project added successfully");
      }

      dispatch(getAllProjects());
      navigate("/dashboard/project");

      if (!isEditMode) {
        setFormData({
          name: "",
          longDescription: "",
          challenges: [""],
          learnings: [""],
          role: "",
          technologies: [""],
          type: "web",
          githubUrl: "",
          demoUrl: "",
        });
        setSelectedFiles([]);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">
          {isEditMode ? "Edit Project" : "Create New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium mb-1">Project Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="font-medium mb-1">Your Role</label>
              <Input
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-medium mb-1">GitHub URL</label>
              <Input
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-medium mb-1">Demo URL</label>
              <Input
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-medium mb-1">Project Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 dark:bg-zinc-800"
              >
                {["web", "mobile", "desktop", "fullstack", "api", "design"].map(
                  (type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium mb-1">Description</label>
            <Textarea
              name="longDescription"
              rows={5}
              value={formData.longDescription}
              onChange={handleChange}
              placeholder="Detailed description of the project"
              required
            />
          </div>

          {["challenges", "learnings", "technologies"].map((key) => (
            <div key={key}>
              <label className="text-lg font-semibold capitalize mb-2 block">
                {key}
              </label>
              <div className="space-y-3">
                {formData[key].map((item, index) => (
                  <Input
                    key={index}
                    value={item}
                    onChange={(e) => handleArrayChange(e, index, key)}
                    placeholder={`${key.slice(0, -1)} ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                type="button"
                onClick={() => handleAddField(key)}
                variant="secondary"
                className="mt-2"
              >
                + Add {key.slice(0, -1)}
              </Button>
            </div>
          ))}

          <div>
            <label className="font-medium mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded-md dark:bg-zinc-800"
            />
          </div>

          {isEditMode && editImages.length > 0 && (
            <div>
              <label className="block font-semibold mb-2">
                Existing Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {editImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt="project"
                    className="w-full h-36 object-cover rounded shadow"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="text-right">
            <Button type="submit" disabled={loading}>
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Project"
                : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProject;
