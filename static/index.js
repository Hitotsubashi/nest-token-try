const { Alert, Button, Stack } = ReactBootstrap;
const { useCallback, useState } = React;

function MyApp() {
  const [data, setData] = useState();

  const requestData = useCallback(async (color) => {
    const response = await fetch(`/api/wiki/${color}`);
    const body = await response.json();
    setData(body.data);
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/logout');
    Cookies.remove('token');
    window.location.href = '/login.html';
  }, []);

  return (
    <>
      <Stack gap={3}>
        <div style={{ display: 'flex', 'justify-content': 'flex-end' }}>
          <Button variant="outline-danger" class="logout" onClick={logout}>
            退出登录
          </Button>
        </div>
        <h3>首页</h3>
        <div>
          <Button variant="primary" onClick={() => requestData('spacex')}>
            了解SpaceX
          </Button>{' '}
          <Button variant="secondary" onClick={() => requestData('tesla')}>
            了解Tesla
          </Button>{' '}
        </div>
        {data && <Alert variant="secondary">{data}</Alert>}
      </Stack>
    </>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
