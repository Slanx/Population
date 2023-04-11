import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { FormErrorMessage, FormControl, Input, Button, Heading, Divider } from '@chakra-ui/react';
import { Group, GroupType, Resident } from '@/interfaces/resident.interface';
import ResidentService from '@/api/residentSerivce';

type FormValues = {
  name: string;
  groups: Group[];
};

export default function ResidentForm() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      groups: Object.values(GroupType).map((groupType) => {
        return { name: '', type: groupType };
      }),
    },
  });

  const { fields } = useFieldArray({
    name: 'groups',
    control,
  });

  const { createResident, error, loading } = ResidentService();

  const onSubmit: SubmitHandler<FormValues> = async ({ name, groups }) => {
    const newResident = await createResident({ name, groups });

    if (newResident) {
      // action(newResident);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading size='md'>Добавить жителя</Heading>
      <Divider my={2} />
      <FormControl key='name' isInvalid={typeof errors.name !== 'undefined'}>
        <Input
          placeholder='name'
          key='name'
          {...register('name', { required: { value: true, message: `Field name is required` } })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      {fields.map((field, id) => {
        return (
          <FormControl
            key={field.type}
            isInvalid={typeof errors.groups?.[id]?.name !== 'undefined'}
          >
            <Input
              placeholder={field.type}
              type='text'
              {...register(`groups.${id}.name`, {
                required: { value: true, message: `Field ${field.type} is required` },
              })}
            />
            <FormErrorMessage>
              {errors.groups?.[id]?.name && errors.groups[id]?.name?.message}
            </FormErrorMessage>
          </FormControl>
        );
      })}

      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Добавить жителя
      </Button>
    </form>
  );
}
