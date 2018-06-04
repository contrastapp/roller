import React from 'react'
import { connect } from 'react-redux'
import Button from "./Button";
import Subheader from "./Subheader";
import { Field, FieldArray, reduxForm } from 'redux-form'
import ruleActions from '../actions/RuleActions';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    {touched && error && <div className='form-error'>{error}</div>}
    <label>{label}</label>
      <input {...input} type={type} placeholder={label} />
  </div>
)

const isHex = value => {return (!value || (_.get(value, 'length') > 0 && _.includes(value, '#'))) ? undefined : 'Please format hex value with #'}

const renderMembers = (props) => {
  const { fields, meta: { error, submitFailed }, savedAction} = props
  return (
  <ul>
    <li className="pt24 pb24 pr16 pl16">
      <Button size="full" style="default" type="button" onClick={() => {fields.unshift({})}}>Add New Color</Button>
    </li>
    {submitFailed && error && <div>{error}</div>}
    <Subheader>My Saved Colors</Subheader>

    {fields.map((color, index) => (
      <li key={index}>
        <div className="flex settings-lint falign-end layer-row">


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
        >&times;</Button>
    </div>
      </li>

    ))}

  </ul>
)}

const FieldArraysForm = props => {
  const { saved, error, handleSubmit, pristine, reset, submitting, submitSucceeded } = props
  return (
    <form onSubmit={handleSubmit(data => { props.onSubmit(data) })}>
      <div className="layer-row">
        <Button size="full" style="primary" type="submit" disabled={submitting}>Save</Button>
        {saved ? 'Saved' : ''}
      </div>
      <FieldArray name="colors" savedAction={props.savedAction} component={renderMembers} />
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
  state => { console.log(state.rules.colors); return({
    initialValues: state.rules,
    saved: state.rules.saved
  }) },
)(InitializeFromStateForm)

export default InitializeFromStateForm
