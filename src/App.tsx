import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
import { categories } from './data/categories';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';
import { InputArea } from './components/InputArea';

const App = () => {
  const [list, setList] = useState<Item[]>([]);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  // Carrega os itens do localStorage quando o app inicia
  useEffect(() => {
    const stored = localStorage.getItem('gastos');
    if (stored) {
      const savedItems: Item[] = JSON.parse(stored);
      // Converte 'date' de string para Date
      const parsedItems = savedItems.map(item => ({
        ...item,
        date: new Date(item.date),
      }));
      setList(parsedItems);
    }
  }, []);

  // Filtra a lista pelo mês atual
  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  // Calcula entradas e saídas
  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item: Item) => {
    const newList = [...list, item];
    setList(newList);
    // Não precisa salvar aqui no localStorage, pois já está sendo feito no InputArea
  };

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText> Sistema Financeiro </C.HeaderText>
      </C.Header>

      <C.Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        <InputArea onAdd={handleAddItem} />

        <TableArea list={filteredList} />
      </C.Body>
      <footer id='footer'>© Copyright 2025 Gianlucca Augusto, Todos os direitos reservados.</footer>
    </C.Container>
  );
};

export default App;