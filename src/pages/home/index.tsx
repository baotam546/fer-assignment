import React, { useEffect, useState } from 'react'
import SelectFilter from './components/SelectFilter'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ColumnDef } from '@tanstack/react-table'
import { ProductTable } from './components/ProductTable'
import Cart from './components/Cart'
import { useNavigate } from 'react-router-dom'

type Props = {}
export type Products ={
    id: string;
    title: string;
    category: string;
    price: number;
    reviews: any;
}

 


export type Cart ={
    productsCart: ProductsCart[];
    shipAddress: string;
}
export type ProductsCart ={
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const Home = (props: Props) => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [products, setProducts] = useState<Products[]>([]);
    const [cart, setCart] = useState<ProductsCart[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:9999/products');
            if(response.status === 200){
                setProducts(response.data);
            }
        }
        fetchData();
    }, []);

    function addToCart(product: Products) {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                // Update quantity if the product already exists in the cart
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new product to cart
                return [...prevCart, { ...product, name: product.title, quantity: 1 }];
            }
        });
    }
    const columns: ColumnDef<Products>[] = [
        {
          accessorKey: "title",
          header: "Title",
        },
        {
          accessorKey: "category",
          header: "Category",
        },
        {
          accessorKey: "price",
          header: "price",
        },
        {
            header:"Action",
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <div>
                        <Button onClick={() => addToCart(product)}  className='bg-blue-500 hover:bg-blue-600'>Add to cart</Button>
                    </div>
                )
            }
        }
      ]
    const filteredProducts = selectedFilter === 'all'
        ? products
        : products.filter(product => product.category === selectedFilter);

  return (

    <div className='w-full'>
        <div className='flex justify-center '>
            <h2 className='text-3xl font-semibold'>Shopping System</h2>
        </div>

        <div className='mt-10  w-full' >
            <div className='flex justify-between '>
                <SelectFilter selected={selectedFilter} setSelected={setSelectedFilter}/>
                <Button onClick={()=>(navigate('/orders'))} className='bg-green-600 hover:bg-green-700'>Order history</Button>
            </div>
            <div className='mt-5 grid grid-cols-6 gap-5'>
                <div className='col-span-3'>
                    <ProductTable columns={columns} data={filteredProducts}/>
                </div>
                <div className='col-span-3'>
                    <Cart cart={cart} setCart={setCart}/>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Home