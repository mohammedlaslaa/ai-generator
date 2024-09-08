import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateChatCompletionRequest } from '../dto/create-chat-completion.request';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  private readonly logger = new Logger(OpenaiController.name);

  constructor(private readonly openaiService: OpenaiService) {}

  @Post('chat-completion')
  async createChatCompletion(@Body() body: CreateChatCompletionRequest) {
    this.logger.log('info message');
    return this.openaiService.createChatCompletion(body.messages);
  }
}
