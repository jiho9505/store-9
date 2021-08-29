interface History {
  push(path: string): void;
}

type MessageModeType = 'success' | 'fail' | 'caution';

type Message = {
  showMessage: boolean;
  messageContent?: string;
  messageMode?: MessageModeType;
};
