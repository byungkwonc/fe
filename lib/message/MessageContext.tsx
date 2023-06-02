import { createContext, FunctionComponent, useState } from "react";
import { MessageProps } from "./message.types";

/*
export function useMessage<MessageProps>(initialValues: MessageProps): [MessageProps, (mes: MessageProps) => void] {
  const [message, setMessage] = useState<MessageProps>(initialValues);

  const handleMessage = (mes: MessageProps) => setMessage(mes);
  return [message, handleMessage];
}
*/

export type MessageContextProps = {
    messages: MessageProps[];
    handleMessage: (mes: MessageProps) => void;
  };
export type PropsWithChildren<P> = P & { children?: React.ReactNode | undefined };

export const MessageContext = createContext<Partial<MessageContextProps>>({});

export const MessageProvider: FunctionComponent<PropsWithChildren<MessageContextProps>> = ({ children }) => {
    const [messages, setMessages] = useState<MessageProps[]>([]);

    const handleMessage = (message: MessageProps) => {
      setMessages((prevMessages) => prevMessages.concat([message]));
      setTimeout(() => {
        setMessages((prevMessages) => prevMessages.slice(1));
      }, 5000);
    };
  
    return (
      <MessageContext.Provider value={{ messages, handleMessage }}>
        { children }
      </MessageContext.Provider>
    );
};