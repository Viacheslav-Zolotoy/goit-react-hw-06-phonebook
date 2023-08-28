import PropTypes from 'prop-types';
import { StyledInput, FormWrapper } from './StyledComponents/Form.styled';
function Filter({ filter, changeFilter }) {
  return (
    <FormWrapper>
      <label>
        Find contacts by name
        <StyledInput
          type="text"
          name="filter"
          value={filter}
          onChange={changeFilter}
        />
      </label>
    </FormWrapper>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default Filter;
