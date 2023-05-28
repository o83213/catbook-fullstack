import { ConversationsQuery } from "@generated/graphql";
export type ParticipantsType =
  ConversationsQuery["conversations"][0]["participants"];
export const formatUserNames = (
  participants: ParticipantsType,
  myUserId: string
) => {
  const userNames = participants!
    .filter((participant) => participant?.user?.id !== myUserId)
    .map((participant) => participant?.user?.name);
  return userNames.join(", ");
};
