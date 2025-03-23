import React, { useEffect, useState } from 'react'
import { Products } from '../home';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Heart, Share2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
type Props = {}

const BookDetials = (props: Props) => {
        const [book, setBooks] = useState<Products>();
        const { id } = useParams();
        useEffect(() => {
            const fetchData = async () => {
                const response = await axios.get(`https://67dff1467635238f9aabe2cf.mockapi.io/books/${id}`);
                if(response.status === 200){
                    setBooks(response.data);
                }
            }
            fetchData();
        }, []);
    // const getReadingStatusText = (status: number) => {
    //     if (book.isUnread) return "Not Started"
    //     if (status === 0) return "Not Started"
    //     if (status === 100) return "Completed"
    //     return `In Progress (${status}%)`
    //   }
    
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 p-6">
            <div className="relative aspect-[3/4] w-full max-w-[300px] mx-auto">
              <img
                src={book?.bookImage || "/placeholder.svg"}
 
                className="object-cover rounded-lg shadow-md"
                
              />
            </div>

            <div className="mt-6 flex flex-col gap-4">
            
            </div>
          </div>

          <div className="md:col-span-2 p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl md:text-3xl">{book?.bookName}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">{book?.bookType}</Badge>

              </div>
            </CardHeader>

            <CardContent className="px-0">
              <div className="space-y-6">
                <div>

                </div>
{/* 
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long
                    Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions
                    with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover,
                    Daisy Buchanan.
                  </p>
                </div> */}

                <div>
                  <h3 className="text-lg font-medium mb-2">Details</h3>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <dt className="text-muted-foreground">ID:</dt>
                    <dd>{book?.id}</dd>
                    <dt className="text-muted-foreground">Type:</dt>
                    <dd>{book?.bookType}</dd>
                    <dt className="text-muted-foreground">Status:</dt>
                    {/* <dd>{getReadingStatusText(book.bookReadingStatus)}</dd> */}
                    <dt className="text-muted-foreground">Unread:</dt>
                    <dd>{book?.isUnread ? "Yes" : "No"}</dd>
                  </dl>
                </div>
              </div>
            </CardContent>
`
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BookDetials