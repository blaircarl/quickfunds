// Add to your registration page
document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    first_name: document.getElementById('first-name').value,
    last_name: document.getElementById('last-name').value,
    phone: document.getElementById('phone').value,
    country: document.getElementById('country').value
  };

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (response.ok) {
      // Save token and redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/apply.html';
    } else {
      alert(data.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('An error occurred during registration');
  }
});

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (response.ok) {
      // Save token and redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/apply.html';
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login');
  }
});

document.getElementById('loanForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  const formData = {
    loan_amount: parseFloat(document.getElementById('loan-amount').value),
    payment_period: parseInt(document.getElementById('payment-period').value),
    annual_income: parseFloat(document.getElementById('annual-income').value),
    loan_purpose: document.getElementById('loan-purpose').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    airtel_money_number: document.getElementById('airtel-number').value
  };

  try {
    const response = await fetch('/api/loans/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (response.ok) {
      // Show success message
      document.getElementById('loan-application').classList.remove('active');
      document.getElementById('success-message').classList.add('active');
      window.scrollTo(0, 0);
    } else {
      alert(data.error || 'Loan application failed');
    }
  } catch (error) {
    console.error('Loan application error:', error);
    alert('An error occurred while submitting your application');
  }
});