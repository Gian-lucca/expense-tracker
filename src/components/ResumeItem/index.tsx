import { type } from 'os';
import * as C from './style';

type Props = {
    title: string;
    value: number;
    color?: string;
}

export const ResumeItem = ({ title, value, color }: Props) => {
    return (
        <C.Container>
            <C.Title>{title}</C.Title>
            <C.Info color={color}> R$ {value}</C.Info>
        </C.Container>
    );
}