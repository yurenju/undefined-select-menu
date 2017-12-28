import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/*
  Editable component encapsulates the menu item where clicking on it 
  truncates the menu
*/

const editIcon  = 'fa-pencil-square-o';
const trashIcon = 'fa-trash-o';

const Noop = styled.span`
  margin: 0px
  padding: 0px
`;

const EditForm = styled.form`

`;

//pulled from MenuItem
const StyledEditableLabel = styled.div`
  cursor: ${props => props.cursor};
  width: ${props => props.width};
  max-width: ${props => props.width};
  display: table-cell;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  margin: 1em;
`;

class EditableMenuItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      label: props.label,
      mode: 'display' // ['display', 'hovering', 'edit']
    }
  }
  updateLabel (newLabel) {
    this.setState('label', newLabel);
  }
  propegateUpdate () {
    this.props.update(this.state.label);
  }
  renderDisplay() {

  }
  renderHovering() {

  }
  renderEdit() {

  }
  render () {
    return (
      <StyledEditableLabel contentEditable="true"
        color={props.color}
        cursor={props.cursor}
        backgroundColor={props.backgroundColor}
        width={props.width}>
        {props.label}
      </StyledEditableLabel>
    );
  }
}

//truncates the string when it is too long
function truncate(by, str) {
  if (str.length <= by) {
    return str;
  } else {
    return str.slice(0, by) + '...'
  }
}

EditableMenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  truncateBy: PropTypes.number, //how many are allowed before cutting it off and adding ...
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.string,  //TODO: handle edge case of 0
  cursor: PropTypes.string.isRequired
};

EditableMenuItem.defaultProps = {
  truncateBy: 20,
  color: 'black',
  backgroundColor: 'white',
  width: '100px'
}

export default EditableMenuItem;