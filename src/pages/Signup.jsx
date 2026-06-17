import { useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { 
  auth, 
  db,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  googleProvider,
  doc,
  setDoc,
  getDoc
} from '../firebase';
import { toast } from 'react-toastify';
import Header from '../components/Header';

function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const createUserDocument = async (user) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: user.displayName || "",
          email: user.email,
          createdAt: new Date()
        });
      } catch (e) {
        toast.error("Failed to create user record");
      }
    }
  };

  const onFinishSubmit = async (values) => {
    setLoading(true);
    if (!isLogin) {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match!");
        setLoading(false);
        return;
      }
      try {
        const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
        result.user.displayName = values.name;
        await createUserDocument(result.user);
        toast.success("Account created successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast.success("Login successful!");
      } catch (error) {
        toast.error(error.message);
      }
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserDocument(result.user);
      toast.success("Authenticated via Google successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2>{isLogin ? "Login to Financly." : "Sign Up on Financly."}</h2>
          <Form layout="vertical" onFinish={onFinishSubmit}>
            {!isLogin && (
              <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input placeholder="John Doe" />
              </Form.Item>
            )}
            <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Please input valid email!' }]}>
              <Input placeholder="johndoe@gmail.com" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input password!' }]}>
              <Input.Password placeholder="Example123" />
            </Form.Item>
            {!isLogin && (
              <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true, message: 'Please confirm password!' }]}>
                <Input.Password placeholder="Example123" />
              </Form.Item>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {isLogin ? "Login using Email and Password" : "Signup using Email and Password"}
              </Button>
            </Form.Item>
          </Form>
          <Divider>or</Divider>
          <Button icon={<GoogleOutlined />} block onClick={handleGoogleAuth} style={{ marginBottom: '1rem' }}>
            {isLogin ? "Login using Google" : "Signup using Google"}
          </Button>
          <p style={{ textAlign: 'center', margin: 0, cursor: 'pointer', color: '#1890ff' }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't Have An Account? Click Here To Sign Up" : "Have An Account Already? Click Here To Login"}
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;