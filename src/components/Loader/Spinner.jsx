import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderSpinner } from './Spinner.styled';

export function Spinner() {
  return (
    <LoaderSpinner>
      {' '}
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </LoaderSpinner>
  );
}

export default Spinner;
