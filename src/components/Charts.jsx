import { Line, Pie } from '@ant-design/charts';

function Charts({ sortedTransactions }) {
  const lineData = sortedTransactions.reduce((acc, item) => {
    const previousBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
    
    const numericAmount = Number(item.amount); // Ensures it's treated as math, not string
    
    const currentBalance = item.type === 'income' 
      ? previousBalance + numericAmount 
      : previousBalance - numericAmount;

    acc.push({ date: item.date, balance: currentBalance });
    return acc;
  }, []);

  const lineConfig = {
    data: lineData,
    xField: 'date',
    yField: 'balance',
    point: { size: 5, shape: 'diamond' },
    label: { style: { fill: '#aaa' } },
  };

  const expenseData = sortedTransactions
    .filter(item => item.type === 'expense')
    .reduce((acc, curr) => {
      const found = acc.find(item => item.tag === curr.tag);
      if (found) found.value += Number(curr.amount);
      else acc.push({ tag: curr.tag, value: Number(curr.amount) });
      return acc;
    }, []);

  const pieConfig = {
    appendPadding: 10,
    data: expenseData,
    angleField: 'value',
    colorField: 'tag',
    radius: 0.8,
    label: { 
      text: 'value',
      position: 'outside',
      style: {
        fontSize: 12,
        fontWeight: 'bold',
      }
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div className="charts-wrapper">
      <div className="chart-block">
        <h3 style={{ marginBottom: '1rem' }}>Financial Statistics</h3>
        {lineData.length > 0 ? <Line {...lineConfig} /> : <p>No data available</p>}
      </div>
      <div className="chart-block">
        <h3 style={{ marginBottom: '1rem' }}>Total Spending</h3>
        {expenseData.length > 0 ? <Pie {...pieConfig} /> : <p>No expenses tracked</p>}
      </div>
    </div>
  );
}

export default Charts;