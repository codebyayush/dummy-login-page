import "./ExpenseItem.css";

export default function ExpenseItem() {
  const itemName = "car insurance";
  const itemPrice = "3000";
  const newDate = new Date();
  const formattedDate = newDate.toLocaleDateString();
  const locationOfExpenditure = "Indore";

  return (
    <>
      <div className="expense-item">
        <h2>{formattedDate}</h2>
        <div className="expense-item__description">
          <h2>{itemName}</h2>
          <h2>{locationOfExpenditure}</h2>
          <div className="expense-item__price">Rs {itemPrice}</div>
        </div>
      </div>
    </>
  );
}
