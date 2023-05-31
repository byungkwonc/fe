import { useState } from 'react'

export function useFormFields<T>(
    initialValues: T
): [T, (event: React.ChangeEvent<HTMLInputElement>) => void, () => void] {
    const [values, setValues] = useState<T>(initialValues);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const { target } = event;
        const { name, value } = target;
        setValues({ ...values, [name]: value });
    }
    const resetFormFields = () => setValues(initialValues);
    return [values, handleChange, resetFormFields];
}

export type MessageType = "default" | "success" | "error";

export type MessageProps = {
    type: MessageType;
    payload: string;
};

export function useMessage<MessageProps>(initialValues: MessageProps): [MessageProps, (mes: MessageProps) => void] {
    const [message, setMessage] = useState<MessageProps>(initialValues);

    const handleMessage = (mes: MessageProps) => setMessage(mes);
    return [message, handleMessage];

}