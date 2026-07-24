import { useState, useRef } from 'react';
import { Table, Select, Input, Radio, Button } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import { toast } from 'react-toastify';

const { Option } = Select;

function TransactionTable({ transactions, addTransaction, fetchTransactions }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortKey, setSortKey] = useState('');
  
  // FIX: Added a ref to cleanly trigger the hidden file input
  const fileInputRef = useRef(null);

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
    filteredTransactions.sort((a, b) => Number(a.amount) - Number(b.amount));
  }

  const exportCSV = () => {
    if (transactions.length === 0) {
      toast.error("No transactions to export");
      return;
    }
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
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true, // FIX: Prevents trailing empty rows from breaking the code
      dynamicTyping: true,
      complete: async function (results) {
        try {
          // FIX: Use Promise.all to handle bulk uploads efficiently instead of a slow loop
          const uploadPromises = results.data.map(row => {
            if (row.name && row.amount && row.type && row.date) {
              return addTransaction({
                name: row.name,
                amount: parseFloat(row.amount),
                tag: row.tag || 'Other',
                type: String(row.type).toLowerCase(),
                date: row.date
              }, true); // 'true' flags this as a bulk operation to prevent toast spam
            }
            return Promise.resolve();
          });

          await Promise.all(uploadPromises);
          
          toast.success("CSV Imported Successfully!");
          fetchTransactions(); // Refresh the table
        } catch (error) {
          toast.error("Failed to import some rows.");
          console.error("Import error:", error);
        } finally {
          event.target.value = null; // Reset the input so the same file can be selected again
        }
      },
      error: (error) => {
        toast.error(`Error reading file: ${error.message}`);
      }
    });
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
          
          {/* FIX: Trigger input via ref rather than wrapping the label directly */}
          <Button icon={<UploadOutlined />} onClick={() => fileInputRef.current.click()}>
            Import CSV
          </Button>
          <input 
            type="file" 
            accept=".csv" 
            ref={fileInputRef}
            onChange={importCSV} 
            style={{ display: 'none' }} 
          />
        </div>
      </div>
      <Table dataSource={filteredTransactions} columns={columns} rowKey={(record, idx) => idx} />
    </div>
  );
}

export default TransactionTable;