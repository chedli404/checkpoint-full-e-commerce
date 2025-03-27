import { useEffect, useState } from "react"
import { UserType } from "../../types/userTypes"
import { getUsers } from "../../api/user"
import UserCard from "./UserCard"
import { CartType } from "../../types/cartTypes"
import { getCart } from "../../api/cart"

const Users = () => {

    const [users, setUsers] = useState<UserType[]>()
    const [carts, setCarts] = useState<CartType[]>()
    useEffect(() => {
        async function fetchUsers() {
            const data = await getUsers();
            if (!data) return
            setUsers(data);
            const cartsData = await data.map(async (user: UserType) => {
                if (!user._id) return
                const cart = await getCart(user._id)
                return cart
            })
            setCarts(await Promise.all(cartsData))
        }
        fetchUsers()
    }, [])

    return (
        <div className="admin-users">
            {users?.map((user,i) => <UserCard user={user} cart={carts && carts[i]} key={user._id} />)}

        </div>
    )
}

export default Users