import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources';
import { string } from 'zod';

const client = new OpenAI({
   baseURL: 'http://localhost:11434/v1',
   apiKey: process.env.OPENAI_API_KEY,
});

type GenerateTextOptions = {
   model?: string;
   messages: ChatCompletionMessageParam[];
   temperature?: number;
   max_completion_tokens?: number;
};

type GenerateTextResult = {
   id: string;
   text: string;
};

export const llmClient = {
   async generateText({
      model = 'deepseek-r1:8b',
      messages,
      temperature = 0.2,
      max_completion_tokens = 300,
   }: GenerateTextOptions): Promise<GenerateTextResult> {
      const response = await client.chat.completions.create({
         model,
         messages,
         temperature,
         max_completion_tokens,
      });

      const content = response.choices[0]?.message.content;
      const id = response.id;
      if (!content) {
         throw new Error('AI 总结服务返回了空内容');
      }

      return {
         text: content,
         id,
      };
   },
};
