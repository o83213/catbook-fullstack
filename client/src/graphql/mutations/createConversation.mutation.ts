import { gql } from "@apollo/client";
export default gql`
  mutation CreateConversation($participantsIds: [String!]!) {
    createConversation(participantsIds: $participantsIds) {
      conversationId
    }
  }
`;

/**
 * {userId === currentUser.id ? (
          <button onClick={() => setOpenUpdate(true)}>update</button>
        ) : (
          <button onClick={addingFriendHandler.bind(null, userId)}>
            {relationshipData.includes(userId)
              ? "Friend"
              : user.friendRequests.includes(currentUser.id)
              ? "Sending Request"
              : "Add Friend"}
          </button>
        )}
 * 
 */
