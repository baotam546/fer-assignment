import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

interface BookCardProps {
  book: {
    id: string
    bookName: string
    bookImage: string
    bookReadingStatus: number
    bookType: string
    isUnread: boolean
  }
}

export function BookCard({ book }: BookCardProps) {
  // Determine badge color based on reading status
//   const getBadgeVariant = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "reading":
//         return "default"
//       case "completed":
//         return "success"
//       case "to-read":
//         return "secondary"
//       default:
//         return "outline"
//     }
//   }
const navigate = useNavigate();
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
    <Card
      className={cn(
        "h-full flex flex-col overflow-hidden transition-all hover:shadow-md",
  
      )}
      
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {book.bookImage ? (
          <img onClick={() => {
            navigate(`/se11111/${book.id}`)
          }} src={book.bookImage || "/placeholder.svg"} alt={book.bookName}  className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No Cover</span>
          </div>
        )}
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="font-medium line-clamp-2">{book.bookName}</h3>
        <p className="text-sm text-muted-foreground mt-1">{book.bookType}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {/* <Badge variant={getBadgeVariant(book.bookReadingStatus) as any}>{book.bookReadingStatus}</Badge> */}
        <div>
        Status: {getStatus(book.bookReadingStatus)}
        </div>
        {book.isUnread && (
          <Badge variant="outline" className="bg-primary/10">
            New
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}
