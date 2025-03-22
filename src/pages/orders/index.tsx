import React from 'react'
import { ProductsCart } from '../home';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios';
type Props = {}
type Order = {
    id: string;
    orderDate: string;
    products: ProductsCart[];
    shipAddress: string;
}
const OrdersPage = (props: Props) => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:9999/orders');
      setOrders(response.data);
    }
    fetchData();
  }, []);
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  return (
    <div>
      <h1>Order History</h1>
      <div>
      <Table className='mt-10'>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">id</TableHead>
          <TableHead>date</TableHead>
          <TableHead>ship address</TableHead>
          <TableHead className="text-left">product list</TableHead>
          <TableHead className="text-left">total</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium text-left">{order.id}</TableCell>
            <TableCell className='text-left'>{formatDate(order.orderDate)}</TableCell>
            <TableCell className='text-left'>{order.shipAddress}</TableCell>
            <TableCell className="text-left">
              <div>
                {order.products.map((product) => (
                  <div key={product.id}>
                    {product.name} x {product.quantity} x ${product.price} = ${product.price * product.quantity}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              {"$" + order.products.reduce((acc, product) => acc + product.price * product.quantity, 0)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
      </div>
    </div>
  )
}

export default OrdersPage