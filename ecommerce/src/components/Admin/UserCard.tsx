import { CartType } from "../../types/cartTypes"
import { UserType } from "../../types/userTypes"

const UserCard = ({user, cart}: {user: UserType, cart: CartType | undefined}) => {
  return (
    <div className="user-card">
        <div className="user-info">
            <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="user" />
            <div className="user-details">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>role:{user.isAdmin ? 'ADMIN': 'USER'}</p>
            </div>
        </div>
        <div className="user-cart">
            <p>items number: {cart ? cart.items.length : 'no data'}</p>
            <p>total: {cart ? cart.totalPrice : 'no data'}</p>
        </div>
    </div>
  )
}

export default UserCard