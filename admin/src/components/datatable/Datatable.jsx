import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  // const [data, setData] = useState(userRows);
  console.log(columns);

  // get PATH
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);

  const [list, setList] = useState({});
  const { data, loading, error } = useFetch(`/${path}`);

  console.log(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  console.log(data);

  const handleDelete = async (id) => {
    // setData(data.filter((item) => item.id !== id));
    try {
      await axios.delete(`/${path}/${id}`);
    } catch (err) {}
    setList(list.filter((item) => item._id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        // rows={data}
        rows={list}
        // clumns comes from List.jsx -> datatablesource.js
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
