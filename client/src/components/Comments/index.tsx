import { BodySTY } from "./style";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import {
  useGetAllCommentsQuery,
  GetMeQuery,
  GetAllCommentsDocument,
  GetAllCommentsQuery
} from "@generated/graphql";
import { useCreateCommentMutation } from "@generated/graphql";
import Spinner from "@components/Spinner";
//
type User = NonNullable<GetMeQuery["getMe"]>;
//
interface Props {
  postId: string;
  currentUser: User;
}
const Index = ({ postId, currentUser }: Props) => {
  const [createComment] = useCreateCommentMutation();
  const { data, loading, error } = useGetAllCommentsQuery({
    variables: {
      postId
    }
  });
  const createCommentHandler = async (content: string) => {
    try {
      await createComment({
        variables: {
          postId,
          content
        },
        update(cache, { data }) {
          if (!data) {
            return;
          }
          const existingComments = cache.readQuery<GetAllCommentsQuery>({
            query: GetAllCommentsDocument,
            variables: {
              postId
            }
          });
          const newComment = data.createComment;
          cache.writeQuery<GetAllCommentsQuery>({
            query: GetAllCommentsDocument,
            variables: {
              postId
            },
            data: {
              getAllComments: [newComment, ...existingComments!.getAllComments]
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <Spinner height={32} width={32} />;
  if (!data || error) return <div>Load comments fail...</div>;
  return (
    <BodySTY>
      <CommentInput
        submitHandler={createCommentHandler}
        currentUser={currentUser}
      />
      {data?.getAllComments.length > 0 && (
        <div className="comment-list">
          {data.getAllComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </BodySTY>
  );
};

export default Index;
