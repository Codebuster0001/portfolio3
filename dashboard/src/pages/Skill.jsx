import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { deleteSkill, getAllSkills } from "../store/slices/skillSlice";
import { allIcons } from "../utils/iconList";

const Skills = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { skills, loading, error } = useSelector((state) => state.skill);

  useEffect(() => {
    dispatch(getAllSkills());
  }, [dispatch]);

  const handleDelete = (order) => {
    toast((t) => (
      <div className="text-sm space-y-2 text-black">
        <p>
          Are you sure you want to delete <strong>Skill #{order}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => toast.dismiss(t)}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              toast.dismiss(t);
              dispatch(deleteSkill(order));
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-black"> 🛠️ Manage Skills</h1>
          <p className="text-sm text-gray-500">
            Manage and display your tech stack visually.
          </p>
        </div>
        <Button
          onClick={() => navigate("/dashboard/skill/add")}
          className="bg-black text-white hover:bg-gray-800"
        >
          + Add Skill
        </Button>
      </div>

      {loading && <p className="text-sm text-gray-600">Loading skills...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => {
          const Icon = allIcons[skill.iconName];
          return (
            <div
              key={skill._id}
              className="bg-white border border-gray-200 text-black rounded-xl p-5 shadow-sm hover:shadow-md transition relative"
            >
              <div className="flex items-start gap-4">
                {Icon ? (
                  <Icon className={`${skill.color || "text-black"} text-4xl`} />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{skill.label}</h3>
                  <a
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 underline break-words"
                  >
                    {skill.link}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    Order: {skill.order}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(skill.order)}
                >
                  <MdDeleteOutline className="text-xl" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
