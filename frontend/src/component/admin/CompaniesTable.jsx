import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies , searchCompanyByText} = useSelector((store) => store.company);
  const [filterCompany , setFilterCompany] = useState(companies)
  const navigate = useNavigate()
  useEffect(()=>{
    const filteredCompany =companies.length>=0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        return true
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany)
  },[companies,searchCompanyByText ])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently registered companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(companies) && companies.length > 0 ? (
            filterCompany.map((company, index) => (
              <TableRow key={company._id || index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        company.logo ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kjNASp-t4VymZrnRo9hIMRSeTcWNarxbJw&s"
                      }
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any company yet!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
