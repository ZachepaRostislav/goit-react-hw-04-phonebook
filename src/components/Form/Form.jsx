import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { FillForm, FormLabel, FormInput, FormBtn } from './Form.styled';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const onHandleInputChange = e => {
    const { name, value } = e.currentTarget;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const onHadleSubmitForm = e => {
    e.preventDefault();

    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <FillForm action="#" onSubmit={onHadleSubmitForm}>
        <FormLabel htmlFor={nameInputId}>
          Name
          <FormInput
            id={nameInputId}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onHandleInputChange}
          />
        </FormLabel>
        <FormLabel htmlFor={numberInputId}>
          Number
          <FormInput
            id={numberInputId}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onHandleInputChange}
          />
        </FormLabel>
        <FormBtn type="submit">Add contact</FormBtn>
      </FillForm>
    </>
  );
}
