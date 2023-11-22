import { Formik } from 'formik';
import { ImSearch } from 'react-icons/im';
import { Field, Form, SearchFormButton, Searchbar } from './Searchbar.styled';
export const SearchBar = ({ onSubmit }) => {
  return (
    <Searchbar>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={(values, actions) => {
          onSubmit(values.name);
          actions.resetForm();
        }}
      >
        <Form>
          <Field name="name" placeholder="Search images and photos" />
          <SearchFormButton type="submit" component="span">
            <ImSearch />
          </SearchFormButton>
        </Form>
      </Formik>
    </Searchbar>
  );
};
export default SearchBar;
