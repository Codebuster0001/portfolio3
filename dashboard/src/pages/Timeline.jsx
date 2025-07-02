import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { deleteTimeline, getAllTimelines } from "../store/slices/timelineSlice";

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
      dispatch(getAllTimelines());
    }
  }, [dispatch, error, message]);

  const handleDelete = (id) => {
    dispatch(deleteTimeline(id));
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
    <div className="p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-primary">
            📜 Manage Timeline
          </h2>
          <p className="text-sm text-muted-foreground italic mt-1">
            "The future depends on what you do today." – Mahatma Gandhi
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/timeline/addtimeline")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Timeline
        </Button>
      </div>

      {/* Timeline Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTimelines.length === 0 ? (
          <p className="text-muted-foreground text-center col-span-full">
            No timeline entries found.
          </p>
        ) : (
          paginatedTimelines.map((item) => (
            <Card
              key={item._id}
              className="p-6 border border-border bg-background shadow hover:shadow-xl transition rounded-xl space-y-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-accent-foreground">
                  {item.year}
                </h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
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

              <div className="space-y-1">
                <p className="text-lg font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 flex-wrap pt-4">
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
