import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../api/config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterForm = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const isValidated = () => {
    return (
      name.trim().length > 0 &&
      username.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidated()) {
      const newUser = { id: Date.now(), role: 'user', name, username, email, password };

      try {
        console.log('Registering new user:', newUser);

        const response = await axios.post(`${SERVER_URL}/account`, newUser);

        console.log('Registration response:', response);

        if (response.status === 201) {
          localStorage.setItem('user', JSON.stringify(newUser));
          Swal.fire({
            title: 'Đăng ký thành công!',
            text: 'Bạn có thể đăng nhập ngay bây giờ.',
            icon: 'success',
          }).then(() => {
            navigate('/clickshop/login');
          });
        }
      } catch (error) {
        console.error('Registration error:', error);
        setError('Có lỗi xảy ra, vui lòng thử lại!');
        Swal.fire({
          icon: 'error',
          title: 'Đăng ký thất bại',
          text: 'Có lỗi xảy ra, vui lòng thử lại!',
        });
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 shadow-lg p-5">
            <div className="mx-5">
              <h6 className="display-6 mb-5 text-center">Đăng ký tài khoản ClickShop</h6>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="input-name" className="form-label">
                    Nhập họ và tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="input-username" className="form-label">
                    Nhập tên tài khoản
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="input-email" className="form-label">
                    Nhập email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="input-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="input-password" className="form-label">
                    Nhập mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button type="submit" className="btn btn-primary w-100">
                    Đăng ký
                  </button>
                </div>
              </form>
              <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-link" onClick={() => navigate('/clickshop/login')}>
                  Đã có tài khoản? Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
