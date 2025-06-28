import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addNewSkill,
  updateSkill,
  getAllSkills,
} from "@/store/slices/skillSlice";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddSkill = () => {
  const location = useLocation();
  const existingSkill = location.state || null;
  const [formData, setFormData] = useState({
    label: "",
    iconName: "",
    link: "",
    color: "text-white",
    order: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (existingSkill) {
      setFormData(existingSkill);
    }
  }, [existingSkill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingSkill) {
      await dispatch(updateSkill(existingSkill._id, formData));
    } else {
      await dispatch(addNewSkill(formData));
    }
    dispatch(getAllSkills());
    navigate("/dashboard/skill");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-lg mx-auto">
      <Input
        name="label"
        placeholder="Label"
        value={formData.label}
        onChange={handleChange}
        required
      />
      <Input
        name="iconName"
        placeholder="Icon Name (e.g. SiReact)"
        value={formData.iconName}
        onChange={handleChange}
        required
      />
      <Input
        name="link"
        placeholder="Link"
        value={formData.link}
        onChange={handleChange}
        required
      />
      <Input
        name="color"
        placeholder="Color (e.g. text-blue-500)"
        value={formData.color}
        onChange={handleChange}
      />
      <Input
        name="order"
        type="number"
        placeholder="Order"
        value={formData.order}
        onChange={handleChange}
      />
      <Button type="submit">{existingSkill ? "Update" : "Add"} Skill</Button>
    </form>
  );
};

export default AddSkill;
