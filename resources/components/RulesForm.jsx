import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Color
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((color, index) => (
      <li key={index}>
        <Field
          name={`${color}.name`}
          type="text"
          component={renderField}
          label="Name"
        />
        <Field
          name={`${color}.hex`}
          type="text"
          component={renderField}
          label="hex"
        />
        <button
          type="button"
          title="Remove Color"
          onClick={() => fields.remove(index)}
        >Remove</button>
      </li>
    ))}
  </ul>
)

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(data => { props.onSubmit(data) })}>
      <FieldArray name="colors" component={renderMembers} />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
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
