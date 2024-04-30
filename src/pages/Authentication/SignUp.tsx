import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../js/axiosConfig';

const SignUp: React.FC = () => {
  function getCookie(name: string): string | null {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    retypePassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const csrfToken = getCookie('csrftoken');
    console.log('CSRF token:', csrfToken);

    if (!csrfToken) {
      alert('CSRF token not found. Please ensure cookies are enabled.');
      return;
    }

    if (userData.password !== userData.retypePassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/signup/',
        {
          username: userData.username,
          password1: userData.password,
          password2: userData.retypePassword,
          email: userData.email,
        },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );
      console.log(response.data);
      alert('Signup successful!');
      navigate('/signin');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Failed to sign up.');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={userData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="retypePassword"
            placeholder="Re-enter your password"
            value={userData.retypePassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
