import React from 'react'
import { Form } from 'semantic-ui-react'

const InputFields = (props) => {

  return (
    <Form>
      <Form.Field>
        <div>
          <label>Distance</label>
          <input id="distance" onChange={props.inputChangeHandler}></input>
        </div>
      </Form.Field>

      <Form.Field>
        <div>
          <label>Age</label>
          <input id="age" onChange={props.inputChangeHandler}></input>
        </div>
      </Form.Field>

      <Form.Field>
        <select id="gender" onChange={props.inputChangeHandler}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </Form.Field>


    </Form>
  )
}

export default InputFields