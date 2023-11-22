// SearchBar.jsx
import { Formik, Field, Form } from 'formik';

export const SearchBar = ({ onSubmit }) => {
  return (
    <div>
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
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
