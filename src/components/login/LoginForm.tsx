import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../api/config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const isValidated = () => {
    return username.trim().length > 0 && password.trim().length > 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidated()) {
      try {
        console.log('Logging in with:', { username, password });

        const response = await axios.get(`${SERVER_URL}/account`);

        console.log('Login response:', response);

        if (response.status === 200) {
          const account = response.data.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (acc: any) =>
              acc.username === username.toUpperCase() && acc.password === password
          );

          if (account) {
            Swal.fire({
              title: 'Đăng nhập thành công!',
              text: 'Chào mừng bạn đến với hệ thống quản lý laptop!',
              icon: 'success',
            }).then(() => {
              localStorage.setItem('account_name', account.name);
              navigate('/clickshop/');
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Đăng nhập thất bại',
              text: 'tài khoản hoặc mật khẩu không chính xác!',
            }).then(() => {
              navigate('/clickshop/login');
            });
          }
        }
      } catch (error) {
        console.error('There was an error!', error);
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại!',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: 'Tên tài khoản và mật khẩu không được để trống!',
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh', overflow: 'hidden' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 shadow-lg p-5">
            <div className="mx-5">
              <h6 className="display-6 mb-5 text-center">Đăng nhập ClickShop</h6>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="input-username" className="form-label">Nhập tên tài khoản</label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="input-password" className="form-label">Nhập mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    id="input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
                </div>
              </form>
              <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-link" onClick={() => navigate('/clickshop/register')}>Đăng ký tài khoản mới</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
