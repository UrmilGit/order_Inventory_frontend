import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import LoginPage from './component/LoginPage';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('LoginPage component', () => {
    test('renders login form', () => {
      const { getByLabelText, getByText } = render(<LoginPage />);
      const usernameInput = getByLabelText('UserName');
      const passwordInput = getByLabelText('Password');
      const signInButton = getByText('Sign In');
      const createAccountLink = getByText('Create an account');
   
      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(signInButton).toBeInTheDocument();
      expect(createAccountLink).toBeInTheDocument();
    });
   
    test('handles form input change', () => {
      const { getByLabelText } = render(<LoginPage />);
      const usernameInput = getByLabelText('UserName');
      const passwordInput = getByLabelText('Password');
   
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
   
      expect(usernameInput.value).toBe('testuser');
      expect(passwordInput.value).toBe('password123');
    });
   
    test('toggles password visibility', () => {
      const { getByTestId } = render(<LoginPage />);
      const passwordInput = getByTestId('password-input');
      const togglePasswordButton = getByTestId('toggle-password');
   
      fireEvent.click(togglePasswordButton);
      expect(passwordInput.type).toBe('text');
   
      fireEvent.click(togglePasswordButton);
      expect(passwordInput.type).toBe('password');
    });
})  
