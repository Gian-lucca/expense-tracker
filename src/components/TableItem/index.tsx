import * as C from './styles';
import {Item} from '../../types/Item';
import { items } from '../../data/items';
import {formatDate } from '../../helpers/dateFilter';
import {categories} from '../../data/categories';

type Prpps = {
    item: Item
}

export const TableItem = ({ item }: Prpps) => {
    return (
        <C.TableLine>
            <C.TableColumn>{formatDate(item.date)}</C.TableColumn>

            <C.TableColumn>
                <C.Category color={categories[item.category].color} >
                    {categories[item.category].title}
                </C.Category>
            </C.TableColumn>

            <C.TableColumn>{item.title}</C.TableColumn>

            <C.TableColumn>
                <C.Value color={categories[item.category].expense ? 'red' : 'green'}>
                    R$ {item.value}
                </C.Value>
            </C.TableColumn>

        </C.TableLine>
    );
}