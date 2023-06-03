import './Change_Password.css';
import React from 'react';
import { Form, Input, Button } from 'antd';
export default function Change_Password(){
    const onFinish = (values) => {
        console.log('Received values:', values);
        // 
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Validation failed:', errorInfo);
      };
      const validatePassword = (_, value) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passwordRegex.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject('Password Incorrect !');
      };
    return(
        <div className='Change_Password'>
            <h3>Change Your Password</h3>
            <p>At least 8 characters long contains letters, numbers and characters</p>
            <Form
      name="changePasswordForm"
      layout="vertical"
    >
      <Form.Item
        name="currentPassword"
        rules={[
          {
            required: true,
            message: 'Please enter your current password',
          },
        ]}
      >
        <Input.Password placeholder='Current Password'/>
      </Form.Item>

      <Form.Item
        name="newPassword"
        rules={[
          {
            required: true,
            message: 'Please enter a new password',
          },
          {
            validator: validatePassword,
          },
        ]}
      >
        <Input.Password placeholder='New Password'/>
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['newPassword']}
        rules={[
          {
            required: true,
            message: 'Please confirm your new password',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The passwords do not match');
            },
          }),
        ]}
      >
        <Input.Password placeholder='Confirm New Password' />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" className='submit-btn'>
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}