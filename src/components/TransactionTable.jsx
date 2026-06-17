import { useState } from 'react';
import { Table, Select, Input, Radio, Button } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const { Option } = Select;

function TransactionTable({ transactions, addTransaction }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortKey, setSortKey] = useState('');

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (val) => `₹${val}` },
    { title: 'Tag', dataIndex: 'tag', key: 'tag' },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (text) => text.toUpperCase() },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  let filteredTransactions = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (typeFilter !== 'all') {
    filteredTransactions = filteredTransactions.filter((item) => item.type === typeFilter);
  }

  if (sortKey === 'date') {
    filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortKey === 'amount') {
    filteredTransactions.sort((a, b) => a.amount - b.amount);
  }

  const exportCSV = () => {
    const csv = Papa.unparse({
      fields: ["name", "amount", "tag", "type", "date"],
      data: transactions.map(t => [t.name, t.amount, t.tag, t.type, t.date]),
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "my_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importCSV = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: async function (results) {
          for (const row of results.data) {
            if (row.name && row.amount && row.type && row.date) {
              await addTransaction({
                name: row.name,
                amount: parseFloat(row.amount),
                tag: row.tag || 'Other',
                type: row.type.toLowerCase(),
                date: row.date
              }, true);
            }
          }
          // Reset file input target value so the same file can be uploaded consecutively if needed
          event.target.value = null;
        }
      });
    }
  };

  return (
    <div>
      <div className="table-controls">
        <div className="search-filter-group">
          <Input 
            placeholder="Search by name" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            style={{ width: '60%' }}
          />
          <Select value={typeFilter} onChange={(value) => setTypeFilter(value)} style={{ width: '40%' }}>
            <Option value="all">All Transactions</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>
        <Radio.Group value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button icon={<DownloadOutlined />} onClick={exportCSV}>
            Export CSV
          </Button>
          
          {/* Replaced standard HTML label styling with an Ant Design Button container */}
          <Button icon={<UploadOutlined />}>
            <label style={{ cursor: 'pointer', margin: 0, display: 'inline-block' }}>
              Import CSV
              <input 
                type="file" 
                accept=".csv" 
                onChange={importCSV} 
                style={{ display: 'none' }} 
              />
            </label>
          </Button>
        </div>
      </div>
      <Table dataSource={filteredTransactions} columns={columns} rowKey={(record, idx) => idx} />
    </div>
  );
}

export default TransactionTable;