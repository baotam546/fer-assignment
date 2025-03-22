import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

  import React from 'react'
  
  type Props = {
    selected: string;
    setSelected: (value: string) =>void;
  }
  
  const SelectFilter = ({
    selected,
    setSelected
  }:Props) => {

    return (
        <Select onValueChange={setSelected} value={selected}>
        <SelectTrigger className="w-[280px] ring-1 ring-gray-300 " >
          <SelectValue placeholder="Select all category" defaultValue={"all"}/>
        </SelectTrigger>
        <SelectContent className="bg-white">
            <SelectItem value="all">All</SelectItem>
          <SelectItem value="fragrances" >Fragrances</SelectItem>
          <SelectItem value="beauty">Beauty</SelectItem>
        </SelectContent>
      </Select>
      
    )
  }
  
  export default SelectFilter