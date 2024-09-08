"use server";

import { ChatCompletionMessageInterface } from "./chat-completion-message.interface";

export default async function createChatCompletion(
  messages: ChatCompletionMessageInterface[],
) {
  console.log(messages);
  const response = await fetch(
    `${process.env.API_URL}/openai/chat-completion`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
      }),
    },
  );

  return response.json();
}
