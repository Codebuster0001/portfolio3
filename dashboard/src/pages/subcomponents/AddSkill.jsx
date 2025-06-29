import React, { useState, useMemo, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSkill, getAllSkills } from "@/store/slices/skillSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { allIcons, iconNameList } from "@/utils/iconList"; // 👈 icon map and list

const AddSkill = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.skill);

  const [formData, setFormData] = useState({
    label: "",
    iconName: "",
    link: "",
    color: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const suggestionRef = useRef(null);

  const { label, iconName, link, color } = formData;

  // Icon preview logic
  const IconPreview = useMemo(() => {
    const Icon = allIcons[iconName];
    return Icon ? (
      <Icon className={`text-3xl ${color || "text-white"}`} />
    ) : null;
  }, [iconName, color]);

  // Click outside dropdown = close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "iconName") {
      const filtered = iconNameList
        .filter((i) => i.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (name) => {
    setFormData((prev) => ({ ...prev, iconName: name }));
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!label || !iconName || !link) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!allIcons[iconName]) {
      toast.error("Invalid icon name.");
      return;
    }

    dispatch(addSkill(formData));
    setFormData({ label: "", iconName: "", link: "", color: "" });
    setSuggestions([]);
    dispatch(getAllSkills());
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-background p-8 rounded-2xl shadow-md border border-border">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Skill</h2>

      <form onSubmit={handleSubmit} className="space-y-5 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            type="text"
            name="label"
            value={label}
            onChange={handleChange}
            placeholder="Skill Label (e.g., React)"
            required
          />
          <div className="relative" ref={suggestionRef}>
            <Input
              type="text"
              name="iconName"
              value={iconName}
              onChange={handleChange}
              placeholder="Icon Name (e.g., SiReact, FaNodeJs)"
              required
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-background border rounded shadow w-full max-h-48 overflow-y-auto">
                {suggestions.map((name) => (
                  <li
                    key={name}
                    className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                    onClick={() => handleSuggestionClick(name)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Input
          type="url"
          name="link"
          value={link}
          onChange={handleChange}
          placeholder="Skill Link (e.g., https://reactjs.org)"
          required
        />

        <Input
          type="text"
          name="color"
          value={color}
          onChange={handleChange}
          placeholder="Tailwind Color (e.g., text-cyan-400)"
        />

        {IconPreview && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-sm text-muted-foreground">Live Preview:</span>
            {IconPreview}
          </motion.div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Skill"}
        </Button>
      </form>
    </div>
  );
};

export default AddSkill;
