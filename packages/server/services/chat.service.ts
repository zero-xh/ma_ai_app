import fs from 'fs';
import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';
import path from 'path';
import { llmClient } from '../llm/client';

const client = new OpenAI({
   baseURL: 'http://localhost:11434/v1',
   apiKey: process.env.OPENAI_API_KEY,
});

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

type ChatResponse = {
   id: string;
   message: string;
};

export const chatService = {
   async sendMessage(prompt: string, sessionId: string): Promise<ChatResponse> {
      let messages = conversationRepository.getLastResponseMessage(sessionId);
      if (!messages) {
         // 首次对话，可以添加系统提示词（可选）
         messages = [{ role: 'user', content: instructions }];
      }
      messages.push({ role: 'user', content: prompt });
      const response = await llmClient.generateText({
         messages,
         max_completion_tokens: 200,
      });

      const respondContent =
         response.text || '抱歉，我没有理解您的问题，请重新表述。';
      if (respondContent) {
         messages.push({ role: 'assistant', content: respondContent });
         conversationRepository.setLastResponseMessage(sessionId, messages);
      }
      return {
         id: response.id,
         message: respondContent,
      };
   },
};
