import { useState } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  db, 
  doc, 
  setDoc 
} from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleEmailAuth = async (values) => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast.success("Logged in successfully!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          name: values.name || "User",
          email: user.email,
          createdAt: new Date(),
        });
        toast.success("Account created successfully!");
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
      });
      toast.success("Authenticated with Google successfully!");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2>{isLogin ? "Log In" : "Sign Up"} to Financly</h2>
          <Form layout="vertical" onFinish={handleEmailAuth}>
            {!isLogin && (
              <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                <Input placeholder="John Doe" />
              </Form.Item>
            )}
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="john@example.com" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
              <Input.Password placeholder="Min 6 characters" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isLogin ? "Log In" : "Sign Up with Email"}
            </Button>
          </Form>
          
          <Divider>OR</Divider>
          
          <Button block onClick={handleGoogleSignIn} style={{ marginBottom: '1rem' }}>
            Continue with Google
          </Button>
          
          <p style={{ textAlign: 'center', cursor: 'pointer', color: '#1890ff' }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;