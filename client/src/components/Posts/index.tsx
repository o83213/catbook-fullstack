import PostItem from "./PostItem";
import { BodySTY } from "./style";
import { GetAllPostsQuery, GetMeQuery } from "@generated/graphql";
//
type User = NonNullable<GetMeQuery["getMe"]>;
//
type Post = GetAllPostsQuery["getAllPosts"][0];
interface Props {
  user: User;
  posts: Post[];
}

const Index = ({ posts, user }: Props) => {
  return (
    <BodySTY>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem key={post.id} post={post} currentUser={user} />
        ))
      ) : (
        <div>No posts found</div>
      )}
    </BodySTY>
  );
};
export default Index;
