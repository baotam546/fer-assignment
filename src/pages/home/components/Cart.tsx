import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductsCart } from "..";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

type Props = {
  cart: ProductsCart[];
  setCart: React.Dispatch<React.SetStateAction<ProductsCart[]>>;
};

const Cart = ({ cart, setCart }: Props) => {
  const [shipAddress, setShipAddress] = React.useState("");

    const [successTitle, setSuccessTitle] = React.useState("");
  function removeFromCart(product: ProductsCart) {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.id !== product.id);
    });
  }
  async function OrderCart() {
    try {
      const res = await axios.post("http://localhost:9999/orders", {
        orderDate: new Date().toISOString(),
        products: [...cart],
        shipAddress: shipAddress,
      });

      if (res.status === 201) {
        // setCart([]);
        // setShipAddress("");
        // successTitleRef.current = "Order successfully";
        setSuccessTitle("Order successfully");

        React.startTransition(() => {
            setCart([]);
            setShipAddress('');
        });
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  }
  return (
    <Card className="h-full border p-4 rounded-lg ">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
          
            {successTitle && (
              <p className="text-green-500 font-bold text-2xl">{successTitle}</p>
            )}
          </>
        ) : (
          // <table>

          //     {cart.map(item => (
          //         <li key={item.id} className='flex justify-between mb-2'>
          //             <div>
          //                 {item.title} (x{item.quantity})
          //             </div>
          //             <div>${(item.price * item.quantity).toFixed(2)}</div>
          //         </li>
          //     ))}
          // </table>

          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Id</TableHead>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium ">{product.id}</TableCell>
                    <TableCell className="font-medium ">
                      {product.name}
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell className="text-right">
                      ${(product.price * product.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => removeFromCart(product)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="w-full">
              <div className="mt-4 mb-2 w-full text-left font-semibold">
                Ship address
              </div>
              <Textarea
                value={shipAddress}
                onChange={(e) => setShipAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full"
              />

              <Button
                onClick={OrderCart}
                className="bg-yellow-400 hover:bg-yellow-500 align-bottom mt-2"
              >
                Order
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Cart;
