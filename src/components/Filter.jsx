import { setFilter } from 'redux/filterSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { StyledInput, FormWrapper } from './StyledComponents/Form.styled';
function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleChangeFilter = event => {
    dispatch(setFilter(event.currentTarget.value));
  };

  return (
    <FormWrapper>
      <label>
        Find contacts by name
        <StyledInput
          type="text"
          name="filter"
          value={filter}
          onChange={handleChangeFilter}
        />
      </label>
    </FormWrapper>
  );
}

export default Filter;
