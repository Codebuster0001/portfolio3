import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllTimelines,
  deleteTimeline,
  clearTimelineErrors,
  clearTimelineMessages,
} from "@/store/slices/timelineSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const Timeline = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { timelines, loading, error, message } = useSelector(
    (state) => state.timelines
  );

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(timelines.length / ITEMS_PER_PAGE);
  const paginatedTimelines = timelines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    dispatch(getAllTimelines());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearTimelineMessages());
      dispatch(getAllTimelines());
    }
  }, [dispatch, error, message]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      dispatch(deleteTimeline(id));
    }
  };

  const handleEditClick = (timeline) => {
    navigate("/dashboard/timeline/addtimeline", {
      state: { editData: timeline },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Manage Timeline</h2>
        <Button onClick={() => navigate("/dashboard/timeline/addtimeline")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Timeline
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTimelines.length === 0 ? (
          <p className="text-gray-500">No timeline entries found.</p>
        ) : (
          paginatedTimelines.map((item) => (
            <Card
              key={item._id}
              className="p-5 shadow-md transition hover:shadow-xl border border-muted-foreground/10"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-primary">{item.year}</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEditClick(item)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item._id)}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    {loading ? "..." : "Delete"}
                  </Button>
                </div>
              </div>
              <p className="font-medium text-base">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </Card>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Timeline;
