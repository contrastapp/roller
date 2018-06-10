import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from './Button';
import { connect } from 'react-redux'
import pluginCall from 'sketch-module-web-view/client'
import Text from './Text';
import { SubmissionError } from 'redux-form'

const SimpleForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <div className="flex flexaic flexjcc f-column">
      <Text size="heading">Integrate with InVision's DSM</Text>
      <div className="pb16" />
      {error && <strong>{error}</strong>}
      <form onSubmit={handleSubmit((values) => props.onSubmit(values))}>
          <label>JSON Styles Endpoint</label>
            <Field
              name="endpoint"
              component="input"
              type="text"
              placeholder="https://projects.invisionapp.com/dsm-export/toybox-t/sample-library/style-data.json?exportFormat=list&key=HJZpXtDl://projects.invisionapp.com/dsm-export/toybox-t/sample-library/style-data.json?exportFormat=list&key=HJZpXtDlm"
              className="mb16"
            />
          <Button size="full" style="primary" type="submit" disabled={pristine || submitting}>
             Save Endpoint
          </Button>
          <div className="pb8" />
          <Text subdued size='caption'>More details about DSM integration <Button style='link' onClick={() => pluginCall('openURL',"https://github.com/toyboxsystems/roller/blob/master/README.md#dsm-integration")}> here </Button>
          </Text>
        </form>

    </div>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'endpointForm', // a unique identifier for this form
  enableReinitialize: true
})(SimpleForm)

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => { return({
    initialValues: state.rules.endpoint,
  }) },
)(InitializeFromStateForm)

export default InitializeFromStateForm
