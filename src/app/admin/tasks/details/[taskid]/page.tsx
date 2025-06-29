import TaskDetails from "./TaskDetails";


interface TaskDetailsProps {
  params: {
    taskid: string;
  };
}

const TaskDetailsPage = async ({ params }: TaskDetailsProps) => {
  const { taskid } = await params;

  return <TaskDetails taskid={taskid} />;
};

export default TaskDetailsPage;
