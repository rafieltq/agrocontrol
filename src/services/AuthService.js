import { User, UserCredential } from '../models/';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
class AuthService {

  static async login({ email, password }) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        }
      });

      if (!user) {
        throw ({ status: 400, message: 'Invalid email or password' });
      }

      const userCredentials = await UserCredential.findOne({
        where: {
          userId: user.id,
        },
      });

      if (user && (await bcrypt.compare(password, userCredentials.password))) {

        const response = await this.me({ user });
         

        return { token: response.token };
      }
      throw ({ status: 400, message: 'Invalid email or password' });
    } catch (error) {
      throw error;
    }
  }

  static async me({ user }) {
    try {
      const userData = await User.findOne({
        where: {
          id: user.id,
        }
      });


      const token = this.createJWT({
        id: user.id,
        email: userData.email,
        fullname: userData.fullname,
        enabled: userData.enabled,
        createdAt: userData.createdAt
      });
      return { token };
    } catch (error) {
      throw error;
    }
  }

  static async register({ fullname, email, password, confirmPassword }) {
    try {
      if (!fullname || !email || !password || !confirmPassword) {
        throw ({ status: 400, message: 'All fields are required' });
      }

      if (password !== confirmPassword) {
        throw ({ status: 400, message: 'Passwords do not match' });
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw ({ status: 400, message: 'Invalid email' });
      }

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        throw ({ status: 400, message: 'Email already exists' });
      }

      const userCreated = await User.create({
        fullname,
        email,
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      await UserCredential.create({
        password: hashedPassword,
        userId: userCreated.id,
      });

      const login = await this.login({ email, password });
      return login;
    } catch (error) {
      throw error;
    }
  }

  static createJWT(user) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        active: user.active,
        enabled: user.enabled,
        role: user.role,
        settings: user.settings,
        timezone: user.timezone,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );

    return token;
  }


  static isPasswordSecure(password) {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;
    return regex.test(password);
  }

}

export default AuthService;