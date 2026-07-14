import { useContext } from "react"
import Title from "./Title"
import { ShopContext } from "../context/ShopContext"

const CartTotal = () => {
    const { currency, deliveryFee, getCartAmmount } = useContext(ShopContext)
    return (
        <div className="w-full">
            <div className="text-2xl">

                <Title text1={"CART"} text2={"TOTALS"} />
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{getCartAmmount()}.00</p>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>{currency}{deliveryFee}</p>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency}{getCartAmmount() === 0 ? 0 : getCartAmmount() + deliveryFee} </b>
                </div>
            </div>

        </div>
    )
}

export default CartTotal