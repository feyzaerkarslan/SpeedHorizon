interface User {
  _id: string;
  id?: string;
  email: string;
  name: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export async function login(credentials: LoginCredentials): Promise<User | null> {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (data.success && data.user) {
      console.log('Frontend login başarılı:', data.user);
      const user = data.user;
      if (!user._id && user.id) {
        user._id = user.id;
      }
      return user;
    } else {
      console.error('Frontend login hatası:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Login fetch hatası:', error);
    return null;
  }
}

export async function register(credentials: RegisterCredentials): Promise<{ success: boolean; message?: string }> {
  const response = await fetch('http://localhost:5001/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();
  if (data.success) {
    return data;
  } else {
    throw new Error(data.message || 'Kayıt başarısız');
  }
}

export async function logout(): Promise<void> {
  // Gerçek uygulamada burada oturum kapatma işlemleri yapılır
  return;
}

export async function getCurrentUser(): Promise<User | null> {
  // Gerçek uygulamada burada mevcut oturum kontrolü yapılır
  return null;
} 