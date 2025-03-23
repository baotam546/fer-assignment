import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react'
import { Products } from '../home';
import { ProductTable } from '../home/components/ProductTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {}

const UnreadBooks = (props: Props) => {
        const [books, setBooks] = useState<Products[]>([]);
        const navigate = useNavigate();

        const columns: ColumnDef<Products>[] = [
                {
                  accessorKey: "bookName",
                  header: "Title",
                },
                {
                    accessorKey: "image",
                    header: "Book Image",
                    cell: ({ row }) => {
                        const id = row.original.bookReadingStatus;
                        return (
                            <img
                            onClick={() => {
                                navigate(`/se11111/${id}`)}}
                                 src={row.original.bookImage} alt="book image" className="w-10 h-10">
                                
                            </img>
                        )
                    }
                },
                {
                    accessorKey: "bookReadingStatus",
                    header: "Reading Status",
                    cell: ({ row }) => {
                        const status = row.original.bookReadingStatus;
                        const getStatus = (status: number) => {
                            switch (status) {
                                case 1:
                                return "unread"
                                case 2:
                                    return "reading"
                                    case 3: 
                                    return "completed"
                            }
                        }
                        return (
                            <div>
                               {getStatus(status)}
                            </div>
                        )
                    }
                },
                {
                  accessorKey: "bookType",
                  header: "type",
                },
            
             
              ]
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://67dff1467635238f9aabe2cf.mockapi.io/books');
            if(response.status === 200){
                setBooks(response.data);
            }
        }
        fetchData();
    }, []);
const bookTorender = books.filter((book: Products) => book.bookReadingStatus === 1)

  return (
    <div className='flex justify-center items-center mt-10'>
        <ProductTable columns={columns} data={bookTorender} />
    </div>
  )
}

export default UnreadBooks