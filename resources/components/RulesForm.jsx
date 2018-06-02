import React from 'react'
import { connect } from 'react-redux'
import Button from "./Button";
import Subheader from "./Subheader";
import { Field, FieldArray, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
  </div>
)

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    {submitFailed && error && <span>{error}</span>}
    <Subheader>My Saved Colors</Subheader>
    {fields.map((color, index) => (
      <li key={index}>
        <div className="flex falign-end layer-row">
        <Field
          name={`${color}.name`}
          type="text"
          component={renderField}
          label="Color name"
        />
        <Field
          name={`${color}.hex`}
          type="text"
          component={renderField}
          label="Hex Value"
        />

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
    <li className="pt24 pb24 pr16 pl16">
      <Button size="full" style="default" type="button" onClick={() => fields.push({})}>Add New Color</Button>
    </li>
  </ul>
)

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting, submitSucceeded } = props
  return (
    <form onSubmit={handleSubmit(data => { props.onSubmit(data) })}>
      <FieldArray name="colors" component={renderMembers} />
      <div className="layer-row">
        <Button size="full" style="primary" type="submit" disabled={submitting}>Save</Button>
        {submitSucceeded ? 'Saved' : ''}
      </div>
    </form>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
  enableReinitialize: true
})(FieldArraysForm)

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => { console.log(state.rules.colors); return({
    initialValues: state.rules // pull initial values from account reducer
  }) },
)(InitializeFromStateForm)

export default InitializeFromStateForm
