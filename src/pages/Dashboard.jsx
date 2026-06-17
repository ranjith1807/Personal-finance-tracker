import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Charts from '../components/Charts';
import TransactionTable from '../components/TransactionTable';
import { Button, Modal, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import { db, collection, addDoc, getDocs, query, where } from '../firebase';
import { toast } from 'react-toastify';

const { Option } = Select;

function Dashboard({ user }) {
  const [transactions, setTransactions] = useState([]);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  
  const [incomeForm] = Form.useForm();
  const [expenseForm] = Form.useForm();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const fetchTransactions = useCallback(async () => {
    try {
      const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTransactions(items);
    } catch (error) {
      toast.error("Failed to load transactions history");
    }
  }, [user.uid]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (values, isBulk = false) => {
    try {
      const newDoc = {
        ...values,
        userId: user.uid
      };
      await addDoc(collection(db, "transactions"), newDoc);
      if (!isBulk) {
        toast.success("Transaction recorded!");
        fetchTransactions();
      }
    } catch (e) {
      if (!isBulk) toast.error("Could not record transaction");
    }
  };

  const handleModalSubmit = async (values, type) => {
    const cleanValues = {
      name: values.name,
      amount: parseFloat(values.amount),
      tag: values.tag,
      type: type,
      date: values.date.format('YYYY-MM-DD')
    };
    await addTransaction(cleanValues);
    if (type === 'income') {
      setIsIncomeModalVisible(false);
      incomeForm.resetFields();
    } else {
      setIsExpenseModalVisible(false);
      expenseForm.resetFields();
    }
  };

  return (
    <>
      <Header user={user} />
      <div className="dashboard-container">
        <div className="stat-cards-grid">
          <div className="stat-card primary">
            <h3>Current Balance</h3>
            <p>₹{currentBalance}</p>
          </div>
          <div className="stat-card">
            <h3>Total Income</h3>
            <p>₹{totalIncome}</p>
            <Button type="primary" block onClick={() => setIsIncomeModalVisible(true)}>Add Income</Button>
          </div>
          <div className="stat-card">
            <h3>Total Expenses</h3>
            <p>₹{totalExpense}</p>
            <Button danger block onClick={() => setIsExpenseModalVisible(true)}>Add Expense</Button>
          </div>
        </div>

        <Charts sortedTransactions={[...transactions].sort((a,b)=> new Date(a.date) - new Date(b.date))} />
        <TransactionTable transactions={transactions} addTransaction={addTransaction} />

        {/* Modals remain exactly the same as the CRA build */}
        <Modal title="Add Income" open={isIncomeModalVisible} onCancel={() => setIsIncomeModalVisible(false)} footer={null}>
          <Form form={incomeForm} layout="vertical" onFinish={(v) => handleModalSubmit(v, 'income')}>
            <Form.Item name="name" label="Title" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="amount" label="Amount" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} /></Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="tag" label="Category" rules={[{ required: true }]}>
              <Select>
                <Option value="Salary">Salary</Option>
                <Option value="Freelance">Freelance</Option>
                <Option value="Investment">Investment</Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>Add Income</Button>
          </Form>
        </Modal>

        <Modal title="Add Expense" open={isExpenseModalVisible} onCancel={() => setIsExpenseModalVisible(false)} footer={null}>
          <Form form={expenseForm} layout="vertical" onFinish={(v) => handleModalSubmit(v, 'expense')}>
            <Form.Item name="name" label="Title" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="amount" label="Amount" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} /></Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="tag" label="Category" rules={[{ required: true }]}>
              <Select>
                <Option value="Food">Food</Option>
                <Option value="Rent">Rent</Option>
                <Option value="Utilities">Utilities</Option>
                <Option value="Entertainment">Entertainment</Option>
              </Select>
            </Form.Item>
            <Button type="primary" danger htmlType="submit" block>Add Expense</Button>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default Dashboard;