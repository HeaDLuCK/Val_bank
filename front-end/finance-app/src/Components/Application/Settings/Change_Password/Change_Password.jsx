import './Change_Password.css';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function Change_Password() {
  const navigate = useNavigate('/');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onFinish = async (e) => {
    const data = {
      "password": newPassword,
      "password_confirmation": confirmPassword
    }
    e.preventDefault(e);
    console.log(currentPassword, newPassword);
    if (!currentPassword || !newPassword || !confirmPassword) {
      swal('Warning', "Please fill in all fields", 'warning');
    }

    if (newPassword !== confirmPassword) {
      swal('Warning', 'New password and confirm password do not match', 'warning');
    }
    else {
      axios.post('api/data/user', data, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(res => {
        console.log(res);
        if (res.status === 201) {
          // localStorage.setItem('token', res.data.token)
          // localStorage.setItem('accounts', res.data.accounts)
          swal('Success', res.data.message, 'success')
          navigate('/dashboard')
        }

      }).catch(err => {
        swal('Warning', err.response.data.message, 'warning')
      })
    };
  }


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
  return (
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
          <Input.Password placeholder='Current Password'
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)} />
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
          <Input.Password placeholder='New Password'
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} />
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
          <Input.Password placeholder='Confirm New Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className='submit-btn' onClick={(e) => onFinish(e)}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}