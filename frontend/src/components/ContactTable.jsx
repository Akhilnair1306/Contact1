import { Delete, Edit } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import EditForm from "./EditForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

const ContactTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact");
        const data = await response.json();
        const sortedData = data.sort((a, b) =>
          a.fname.trim().toLowerCase().localeCompare(b.fname.trim().toLowerCase())
        );
        setRows(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (row) => {
    setCurrentRow(row);
    setIsEditing(true);
  };

  const updateRowData = (updatedRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row._id === updatedRow._id ? updatedRow : row))
    );
  };


  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this contact?");
    if (!isConfirmed) return;

    console.log("Delete clicked for ID:", id);

    try {

      const response = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the contact.");
      }

      const result = await response.json();

      console.log("Deleted contact:", result);

      setRows(rows.filter((row) => row._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <div className="overflow-x-auto">
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <EditForm
              rowData={currentRow}
              setIsEditing={setIsEditing}
              updateRowData={updateRowData}
            />
          </div>
        )}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="contact table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row._id} hover>
                  <TableCell>{row.fname}</TableCell>
                  <TableCell>{row.lname}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.contactnumber}</TableCell>
                  <TableCell>{row.jobTitle}</TableCell>
                  <TableCell>{row.companyName}</TableCell>
                  <TableCell>
                    {row.fname} {row.lname}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(row)} color="primary">
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(row._id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ContactTable;
