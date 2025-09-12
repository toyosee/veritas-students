
// const fruits = ["Apple", "Banana", "Cherry"];

const Store = ({ message, basketSize }) => {
    return (
        <div>
            <h2>Store</h2>
            <p>Message: {message}</p>
            <p>Basket Size: {basketSize}</p>
        </div>
    )
 }

const FruitBasket = () => {
    const name = ""
    const age = 23
    const message = "Jeph Store"
    const basketSize = "Medium"

    
  return (
    <div>
      {/* <h2>Fruit Basket</h2> */}
      {/* <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
          </ul> */}

          <div>
            <p>Name: {name === "" ? "No Name": name}</p>
            <p>Age: {age === 0 ? "No Age": age < 18 ? "Minor" : "Adult"}</p>
          </div>
          <Store message={message} basketSize={basketSize} />
    </div>
  )
}

export default FruitBasket