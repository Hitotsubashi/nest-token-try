const { Form, Button, Row } = ReactBootstrap;
const { useCallback } = React;

function Login() {
  const handleSubmit = useCallback(async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.username.value,
        password: form.password.value,
      }),
    });
    toHomePage();
  }, []);

  const toHomePage = useCallback(() => {
    window.location.href = '/';
  }, []);

  if (Cookies.get('token')) {
    toHomePage();
  }

  return (
    <div class="login-container">
      <h3>登录页面</h3>
      <small>登录后获取新token</small>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="username">
          <Form.Control
            size="lg"
            id="username"
            type="text"
            placeholder="请输入账户名"
            defaultValue="admin123"
          />
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="password">
          <Form.Control
            size="lg"
            id="password"
            type="password"
            placeholder="请输入密码"
            defaultValue="admin886622444"
          />
          <Form.Text id="password" muted>
            账户名和密码随意
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="primary" className="login-btn">
          登录
        </Button>
      </Form>
    </div>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Login />);
