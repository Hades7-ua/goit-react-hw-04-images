import { Formik } from 'formik';
import { ImSearch } from 'react-icons/im';
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
            <ImSearch />
          </SearchFormButton>
        </Form>
      </Formik>
    </Searchbar>
  );
};
