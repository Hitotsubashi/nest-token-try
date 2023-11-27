const { Alert, Button, Stack, ProgressBar } = ReactBootstrap;
const { useCallback, useState, useEffect } = React;

function statisticNow() {
  const tokenExpiredTime = Cookies.get('tokenExpiredTime');
  const curTime = Date.now();
  if (!tokenExpiredTime || Number(Cookies.get('tokenExpiredTime')) < curTime) {
    return 0;
  } else {
    return (
      ((Number(Cookies.get('tokenExpiredTime')) - curTime) / 1000 / 6) * 100
    );
  }
}

function MyApp() {
  const [data, setData] = useState();
  const [dataStatus, setDataStatus] = useState();
  const [tokenExpiredNow, setTokenExpiredNow] = useState(() => statisticNow);

  useEffect(() => {
    const sub = Cookies.get('tokenExpiredTime') - performance.now();
    if (sub <= 0) {
      setTokenExpiredNow(0);
      return;
    }
    const timer = setInterval(() => {
      setTokenExpiredNow(statisticNow());
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const requestData = useCallback(async (color) => {
    const response = await fetch(`/api/wiki/${color}`);
    const body = await response.json();
    if (body.statusCode === 403) {
      setDataStatus('danger');
      setData(body.message);
    } else {
      setDataStatus(undefined);
      setData(body.data);
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/logout');
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
        {data && <Alert variant={dataStatus || 'secondary'}>{data}</Alert>}
        <div class="token-row">
          token有效时间：
          <div>
            <ProgressBar now={tokenExpiredNow} style={{ width: '600px' }} />
          </div>
        </div>
      </Stack>
    </>
  );
}

if (!Cookies.get('token')) {
  window.location.href = '/login.html';
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
