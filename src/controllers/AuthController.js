import AuthService from '../services/AuthService';
import Response from '../utils/response';

class AuthController {

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw ({ message: 'Email and password are required', status: 400 });
      }

      const entityCreated = await AuthService.login({ email, password });

      //setTimeout(() => {
       return res.json(Response.get('success', entityCreated));
      //}, 2000);
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Something goes wrong',
        data: error
      });
    }
  }

  static async register(req, res) {
    const { fullname, email, password, confirmPassword } = req.body;
    try {
      const entityCreated = await AuthService.register({
        fullname, email, password, confirmPassword
      });
      return res.json(Response.get('success', entityCreated));
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Something goes wrong',
        data: error
      });
    }
  }

  static async me(req, res) {
    try {
      const user = await AuthService.me({ user: req.user });
      return res.json(Response.get('success', user));
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Something goes wrong',
        data: error
      });
    }
  }

}

export default AuthController;