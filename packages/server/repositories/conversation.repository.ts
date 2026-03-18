import type OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources';

const conversations = new Map<
   string,
   OpenAI.Chat.Completions.ChatCompletionMessageParam[]
>();

export const conversationRepository = {
   getLastResponseMessage(sessionId: string) {
      return conversations.get(sessionId);
   },
   setLastResponseMessage(
      sessionId: string,
      messages: ChatCompletionMessageParam[]
   ) {
      conversations.set(sessionId, messages);
   },
};
