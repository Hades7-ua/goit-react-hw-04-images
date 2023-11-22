import { Formik } from 'formik';
import { FiSearch } from 'react-icons/fi';
import { Field, Form, SearchFormButton, Searchbar } from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  return (
    <Searchbar>
      <Formik
        initialValues={{
          searchImageName: '',
        }}
        onSubmit={(values, actions) => {
          onSubmit(values.searchImageName);
          actions.resetForm();
        }}
      >
        <Form>
          <Field
            name="searchImageName"
            placeholder="Search images and photos"
          />
          <SearchFormButton type="submit" component="span">
            <FiSearch />
          </SearchFormButton>
        </Form>
      </Formik>
    </Searchbar>
  );
};
