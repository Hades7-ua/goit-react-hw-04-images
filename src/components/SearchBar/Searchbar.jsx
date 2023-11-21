import { Formik, Field, Form } from 'formik';
export const SearchBar = ({ onSubmit }) => {
  return (
    <div>
      <Formik
        initialValues={{
          searchImageName: '',
        }}
        onSubmit={(values, actions) => {
          console.log('Submitting form with value:', values);
          onSubmit(values);
          actions.resetForm();
        }}
      >
        <Form>
          {/* <span class="button-label">Search</span> */}
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
