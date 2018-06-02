import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from './Button';
import Text from './Text';
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
    <div className="flex flexaic flexjcc f-column login-lint p24">
      
      <div className="pb24 text-center">
        <Text size="small">LOGO</Text>
        </div>

      <div className="pb48 text-center">
        <Text size="small">Sign in to Toybox</Text>
        <Text size="body" subdued>Enter your email</Text>
      </div>

      <form onSubmit={handleSubmit(data => { props.onSubmit(data) })}>
          <label>Email</label>
            <Field
              name="email"
              component="input"
              type="email"
              placeholder=""
              className="mb16"
            />
          <Button size="full" style="primary" type="submit" disabled={pristine || submitting}>
            Sign Up
          </Button>
      </form>

    </div>
  )
}

export default reduxForm({
  form: 'email' // a unique identifier for this form
})(SimpleForm)
