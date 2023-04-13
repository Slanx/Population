import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Divider,
  Heading,
  useToast,
} from '@chakra-ui/react';
import CityService from '@/api/cityService';
import { clear } from 'console';

type FormValues = {
  name: string;
  data: number;
};

export default function CityAddForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const { createCity } = CityService();

  const onSubmit: SubmitHandler<FormValues> = async ({ name, data }) => {
    await createCity({ data: +data, name });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading size='md'>Добавить город</Heading>
      <Divider my={2} />
      <FormControl key='name' isInvalid={typeof errors.name !== 'undefined'}>
        <Input
          placeholder='city title'
          key='name'
          {...register('name', { required: { value: true, message: `Field name is required` } })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl key='data' isInvalid={typeof errors.data !== 'undefined'}>
        <Input
          placeholder='population'
          key='data'
          type='number'
          {...register('data', {
            required: { value: true, message: `Field population is required` },
          })}
        />
        <FormErrorMessage>{errors.data && errors.data.message}</FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Добавить город
      </Button>
    </form>
  );
}
