import { create } from "zustand";

interface StateTypes {
  isOpen: boolean;
  currentConversationId: string;
  openConversation: () => void;
  closeConversation: () => void;
  setCurrentConversationId: (conversationId: string) => void;
}

export const useConversationStore = create<StateTypes>((set) => ({
  isOpen: false,
  currentConversationId: "",
  setCurrentConversationId: (conversationId) => {
    return set(() => ({ currentConversationId: conversationId }));
  },
  openConversation: () => {
    return set(() => ({ isOpen: true }));
  },
  closeConversation: () => {
    return set(() => ({ isOpen: false }));
  }
}));
