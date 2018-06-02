import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(1000).then(() => {
    // simulate server latency
    if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!'
      })
    } else if (values.password !== 'redux-form') {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!'
      })
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }
  })
}

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(data => { props.onSubmit(data) })}>
      <div>
        <label>Work Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Work Email"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'email' // a unique identifier for this form
})(SimpleForm)
