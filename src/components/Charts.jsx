import { Line, Pie } from '@ant-design/charts';

function Charts({ sortedTransactions }) {
  // Fix: Use .reduce() to calculate the running balance purely without mutating external variables
  const lineData = sortedTransactions.reduce((acc, item) => {
    // Get the balance from the previous transaction, default to 0 if it's the first item
    const previousBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
    
    // Calculate the new balance
    const currentBalance = item.type === 'income' 
      ? previousBalance + item.amount 
      : previousBalance - item.amount;

    // Push the new data point to our accumulator array
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
      if (found) found.value += curr.amount;
      else acc.push({ tag: curr.tag, value: curr.amount });
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