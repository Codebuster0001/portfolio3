// ✅ Dashboard.jsx
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
    clearAllMessageErrors,
    getAllMessages,
} from "@/store/slices/messageSlice";
import {
    clearAllProjectErrors,
    getAllProjects,
} from "@/store/slices/projectSlice.js";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const {
    projects = [],
    loading: projectLoading,
    error: projectError,
  } = useSelector((state) => state.project);

  const {
    messages = [],
    error: messageError,
  } = useSelector((state) => state.messages);

  useEffect(() => {
    if (!projects.length) dispatch(getAllProjects());
    if (!messages.length) dispatch(getAllMessages());
  }, [dispatch, projects.length, messages.length]);

  useEffect(() => {
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (messageError) {
      toast.error(messageError);
      dispatch(clearAllMessageErrors());
    }
  }, [projectError, messageError, dispatch]);

  const projectChartData = {
    labels: projects.map((p, i) => `Project ${i + 1}`),
    datasets: [
      {
        label: "Projects",
        data: projects.map((_, i) => i + 1),
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <section className="flex flex-col gap-8 px-4 sm:px-6 py-6 bg-background min-h-screen">
      {/* Welcome + Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg text-muted-foreground">
              Welcome back 👋
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {user?.description || "No profile information available."}
            </p>
          </CardHeader>
          <CardFooter>
            {user?.portfolioURL ? (
              <Button asChild>
                <a
                  href={user.portfolioURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Portfolio
                </a>
              </Button>
            ) : (
              <p className="text-muted-foreground text-sm">
                No portfolio URL provided.
              </p>
            )}
          </CardFooter>
        </Card>

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Projects
            </CardTitle>
            <CardTitle className="text-4xl font-bold">
              {projectLoading ? "Loading..." : projects.length}
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <Button
              onClick={() => navigate("/dashboard/project")}
              className="w-full"
            >
              Manage Projects
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Project Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <Line data={projectChartData} options={chartOptions} />
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Latest Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Reply</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.length ? (
                messages
                  .slice(-15)
                  .reverse()
                  .map((msg) => (
                    <TableRow key={msg._id}>
                      <TableCell>{msg.name}</TableCell>
                      <TableCell>{msg.email}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {msg.message}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigate(`/dashboard/messages?reply=${msg._id}`)
                          }
                        >
                          Reply
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No messages found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default Dashboard;
