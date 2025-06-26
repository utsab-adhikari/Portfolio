import BlogDetailsPage from "./BlogDetailsPage";

interface BlogDetailsProps {
  params: {
    blogid: string;
  };
}

const BlogDetails = async ({ params }: BlogDetailsProps) => {
  const { blogid } = await params;

  return <BlogDetailsPage blogid={blogid} />;
};

export default BlogDetails;
