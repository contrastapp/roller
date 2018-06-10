import React from 'react'
import { connect } from 'react-redux'
import Button from "./Button";
import ColorSwatch from './ColorSwatch';
import Text from "./Text";
import Subheader from "./Subheader";
import { Field, FieldArray, reduxForm } from 'redux-form'
import ruleActions from '../actions/RuleActions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTrashAlt }  from '@fortawesome/fontawesome-free-solid'

const renderField = ({ input, label, type, meta: { touched, error } }) => {

return (
  <div>
    <div className="flex">
      <div className="flex flexjcc flexaie">
        {label == 'Hex value' && <ColorSwatch small hexvalue={input.value} swatchOnly/>}
      </div>
      <div>
        {touched && error && <div className='form-error'>{error}</div>}
        <label>{label}</label>
        <input {...input} type={type} placeholder={label} />
      </div>
    </div>
  </div>
)}

const isHex = value => {return (!value || (_.get(value, 'length') > 0 && _.includes(value, '#'))) ? undefined : 'Please format hex value with #'}

const renderMembers = (props) => {
  const { saved, fields, meta: { dirty, error, submitFailed }, savedAction} = props
  return (
  <ul>
    {submitFailed && error && <div>{error}</div>}
    <Subheader>My Saved Colors
    </Subheader>
      <div className="flex layer-row settings">
        <Button size="full" style="primary" type="submit" >Save New Colors</Button>
        <div className="mr8" />
        <Button size="full" style="default" type="button" onClick={() => {fields.unshift({})}}>Add Color</Button>
      </div>
      {saved && !dirty && (<div className="flex text-center flexjcc p12"> <Text size="body">Saved</Text> </div>)}

    {fields.map((color, index) => (
      <li key={index}>
        <div className="flex settings-lint falign-end layer-row settings">
        <div className="mr8">
          <Field
            name={`${color}.hex`}
            type="text"
            validate={isHex}
            component={renderField}
            label="Hex value"
          />
        </div>

          <div className="mr8">
            <Field
              name={`${color}.name`}
              type="text"
              component={renderField}
              label="Color name"
            />
          </div>
      <Button
        size="medium"
        style="default"

          type="button"
          title="Remove"
          onClick={() => fields.remove(index)}
        >
          <FontAwesomeIcon icon={faTrashAlt  } />
      </Button>
    </div>
      </li>

    ))}

  </ul>
)}

const FieldArraysForm = props => {
  const { saved, error, handleSubmit, pristine, reset, submitting, submitSucceeded } = props

  return (
    <form onSubmit={handleSubmit(data => { props.onSubmit(data) })}>
      <FieldArray saved={saved} name="colors" savedAction={props.savedAction} component={renderMembers} />
    </form>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'rulesForm', // a unique identifier for this form
  enableReinitialize: true
})(FieldArraysForm)

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => { return({
    meta: state.meta,
    initialValues: state.rules,
    saved: state.rules.saved
  }) },
)(InitializeFromStateForm)

export default InitializeFromStateForm
