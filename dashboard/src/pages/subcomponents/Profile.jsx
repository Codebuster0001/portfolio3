import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-full p-4">
      <div className="grid gap-6 bg-muted p-6 rounded-xl shadow-md">
        {/* Resume Section */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="grid gap-2 w-full">
            <Label className="text-base font-medium text-gray-700 dark:text-gray-300">
              Resume
            </Label>
            <Link
              to={user?.resume?.url}
              target="_blank"
              className="block w-full"
            >
              <img
                src={user?.resume?.url}
                alt="resume"
                className="w-full h-auto max-h-72 object-cover rounded-xl border shadow"
              />
            </Link>
          </div>
        </div>

        {/* Information Section */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input type="text" defaultValue={user?.fullName} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" defaultValue={user?.email} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input type="text" defaultValue={user?.phone} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea defaultValue={user?.description} disabled rows={4} />
          </div>
          <div className="grid gap-2">
            <Label>Technologies</Label>
            <Input
              type="text"
              defaultValue={user?.technologies?.join(", ")}
              disabled
            />
          </div>

          {/* URLs Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Portfolio URL</Label>
              <Input type="text" defaultValue={user?.portfolioURL} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Github URL</Label>
              <Input type="text" defaultValue={user?.githubURL} disabled />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input type="text" defaultValue={user?.linkedInURL} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input type="text" defaultValue={user?.instagramURL} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
