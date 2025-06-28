import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSkill, getAllSkills } from "@/store/slices/skillSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Skill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { skills = [], loading } = useSelector((state) => state.skill || {});

  useEffect(() => {
    dispatch(getAllSkills());
  }, [dispatch]);

  const handleEdit = (skill) => {
    navigate("/dashboard/skill/addskill", { state: skill });
  };

  const handleDelete = (id) => {
    dispatch(deleteSkill(id)).then(() => dispatch(getAllSkills()));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Skills</h1>
        <Button onClick={() => navigate("/dashboard/skill/addskill")}>
          Add New Skill
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="p-4 border rounded shadow-sm flex justify-between"
            >
              <div>
                <h2 className="font-semibold">{skill.label}</h2>
                <p>{skill.iconName}</p>
                <p>{skill.link}</p>
                <p className={`text-sm ${skill.color}`}>{skill.color}</p>
                <p className="text-sm text-gray-500">Order: {skill.order}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" onClick={() => handleEdit(skill)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(skill._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skill;
