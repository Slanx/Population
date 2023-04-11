import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  ListItem,
  OrderedList,
  Spinner,
} from '@chakra-ui/react';
import { ChangeEventHandler, useState } from 'react';
import { City } from '@/interfaces/city.interface';
import CityService from '@/api/cityService';

export default function CitySearch() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<City[] | null>();
  const { searchCity } = CityService();

  const handleInput: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const search = e.currentTarget.value;
    setTerm(search);
    if (search !== '') {
      const cities = await searchCity(search);
      setResults(cities);
    } else {
      setResults(null);
    }
  };

  return (
    <Box>
      <Heading size='md'>Поиск городов в справочнике</Heading>
      <Divider my={2} />
      <Input name='search' type='text' value={term} onChange={handleInput} />
      {results ? (
        <OrderedList>
          {results.map((result) => (
            <ListItem key={result._id}>{`${result.name}, население ${result.data}`}</ListItem>
          ))}
        </OrderedList>
      ) : (
        'Ничего не найдено'
      )}
    </Box>
  );
}
