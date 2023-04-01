export type Notification = {
  key: string;
  title: string;
  message: string;
  type: 'ERROR' | 'INFO';
  duration?: number;
};
