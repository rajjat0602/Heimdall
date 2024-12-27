import React, { useEffect, useState, useRef } from 'react'

import "./Table.css"

function Table() {

    const [dbName, setDbName] = useState("");
    const [tableName, setTableName] = useState("");

    const [databases, setDatabases] = useState([]);
    const [tables, setTables] = useState([]);

    const [filteredDatabases, setFilteredDatabases] = useState([]);
    const [filteredTables, setFilteredTables] = useState([])

    const [showDbNames, setShowDbNames] = useState(true);
    const [showTableNames, setShowTableNames] = useState(true);


    // Refs
    const tableNameTypeRef = useRef(null);
    const databaseNameTypeRef = useRef(null);
    const clusterKeyRef = useRef(null);
    const partitionKeyRef = useRef(null);
    const primaryKeyRef = useRef(null);
    const sortKeyRef = useRef(null);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const formData = {
            dbName: dbName,
            tableName: tableName,
            clusterKey: clusterKeyRef.current.value,
            partitionKey: partitionKeyRef.current.value,
            primaryKey: primaryKeyRef.current.value,
            sortKey: sortKeyRef.current.value,
        }

        console.log(formData)

    }

    const dummyDatabaseNameReturner = () => {
        const databaseNames = ["db1", "bd2", "dbbbb", "test5", "haleluyaj"];
        return databaseNames;
    }

    const getTables = async() => {
        const tables = await dummyTableNameReturner();
        setTables(tables);
    }

    const dummyTableNameReturner = () => {
        const tableNames = ["table1", "able2", "table3", "abe4", "yyyy5"];
        return tableNames;
    }

    const dbNameChangeHandler = () => {
        const searchValue = databaseNameTypeRef.current.value.toLowerCase();
        const filtered = databases.filter(db => 
            db.toLowerCase().includes(searchValue)
        );
        !showDbNames && setShowDbNames(true)

        setFilteredDatabases(filtered);
    }

    const tableNameChangeHandler = () => {
        const searchValue = tableNameTypeRef.current.value.toLowerCase();
        const filtered = tables.filter(table => 
            table.toLowerCase().includes(searchValue)
        );
        !showTableNames && setShowTableNames(true)

        setFilteredTables(filtered)
    }

    const dbSelectHandler = async(db) => {
        setDbName(db);
        getTables(dbName)
        setFilteredTables(tables);
        databaseNameTypeRef.current.value = db;
        setShowDbNames(false);
        !showTableNames && setShowTableNames(true);
    }

    const tableSelectHandler = (table) => {
        setTableName(table);
        tableNameTypeRef.current.value = table;
        setShowTableNames(false);
    }

    useEffect(() => {
        const getDatabases = async() => {
            const databaseNames = await dummyDatabaseNameReturner();
            setDatabases(databaseNames);
            setFilteredDatabases(databaseNames)
        }

        getDatabases();
    }, [])

    

  return (
    <div className='table-div'>
        <span className='table-heading'>Table Details</span>
        <form className='input-form' onSubmit={formSubmitHandler}>


            <label htmlFor='db-name' className='labels'>Select DB Name</label>
                <input 
                    type="text"
                    className='inputs'
                    placeholder='Type database name...'
                    ref={databaseNameTypeRef}
                    onChange={dbNameChangeHandler}
                />
                {showDbNames && <ul className='dropdown'>
                    {filteredDatabases.map(db => (
                        <li key={db} onClick={() => dbSelectHandler(db)}>
                            {db}
                        </li>
                    ))}
                </ul>}
            

            <label htmlFor='table-name' className='labels'>Select Table Name</label>
                <input 
                    type="text"
                    className='inputs'
                    placeholder='Type table name...'
                    ref={tableNameTypeRef}
                    onChange={tableNameChangeHandler}
                />
                {showTableNames && <ul className='dropdown'>
                        {filteredTables && filteredTables.map(table => (
                            <li key={table} onClick={() => tableSelectHandler(table)}>
                                {table}
                            </li>
                        ))}
                    </ul>}

            <label htmlFor='cluster-key' className='labels'>Cluster Key</label>
            <input 
                type='text'
                className='inputs'
                placeholder='Enter cluster key...'
                ref={clusterKeyRef}
            />

            <label htmlFor='partition-key' className='labels'>Partition Key</label>
            <input 
                type='text'
                className='inputs'
                placeholder='Enter partition key...'
                ref={partitionKeyRef}
            />

            <label htmlFor='primary-key' className='labels'>Primary Key</label>
            <input 
                type='text'
                className='inputs'
                placeholder='Enter primary key...'
                ref={primaryKeyRef}
            />

            <label htmlFor='sort-key' className='labels'>Sort Key</label>
            <input 
                type='text'
                className='inputs'
                placeholder='Enter sort key...'
                ref={sortKeyRef}
            />
            
            <button className='submit-button'>Submit</button>
          
        </form>

    </div>
  )

// const databaseInputRef = useRef(null);
//   const tableInputRef = useRef(null);
//   const databases = ["Database1", "Database2", "Database3", "TestDB", "ProdDB"];
//   const dbToTables = {
//     Database1: ["Table1", "Table2", "Table3"],
//     Database2: ["Users", "Orders", "Products"],
//     Database3: ["Logs", "Errors", "Messages"],
//     TestDB: ["TestTable1", "TestTable2"],
//     ProdDB: ["ProdTable1", "ProdTable2"],
//   };

//   const [filteredDatabases, setFilteredDatabases] = useState(databases);
//   const [filteredTables, setFilteredTables] = useState([]);
//   const [selectedDB, setSelectedDB] = useState("");
//   const [selectedTable, setSelectedTable] = useState("");
//   const [tableDetails, setTableDetails] = useState({});

//   const handleDBSearch = () => {
//     const searchValue = databaseInputRef.current.value.toLowerCase();
//     const filtered = databases.filter((db) =>
//       db.toLowerCase().includes(searchValue)
//     );
//     setFilteredDatabases(filtered);
//   };

//   const handleTableSearch = () => {
//     const searchValue = tableInputRef.current.value.toLowerCase();
//     const filtered = dbToTables[selectedDB]?.filter((table) =>
//       table.toLowerCase().includes(searchValue)
//     );
//     setFilteredTables(filtered || []);
//   };

//   const handleDBSelect = (db) => {
//     setSelectedDB(db);
//     setFilteredTables(dbToTables[db] || []);
//     databaseInputRef.current.value = ""; // Clear the database input field
//   };

//   const handleTableSelect = (table) => {
//     setSelectedTable(table);
//     tableInputRef.current.value = ""; // Clear the table input field
//   };

//   const handleDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setTableDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(
//       `Selected Database: ${selectedDB}\nSelected Table: ${selectedTable}\nDetails: ${JSON.stringify(
//         tableDetails
//       )}`
//     );
//   };

//   return (
//     <div>
//       <h2>Dynamic Input Form with useRef</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Search for Database */}
//         <div>
//           <label>Search Database: </label>
//           <input
//             type="text"
//             placeholder="Type database name..."
//             ref={databaseInputRef}
//             onChange={handleDBSearch}
//           />
//           <ul className="dropdown">
//             {filteredDatabases.map((db) => (
//               <li key={db} onClick={() => handleDBSelect(db)}>
//                 {db}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Display Selected Database */}
//         {selectedDB && <p>Selected Database: {selectedDB}</p>}

//         {/* Search for Table */}
//         {selectedDB && (
//           <div>
//             <label>Search Table: </label>
//             <input
//               type="text"
//               placeholder="Type table name..."
//               ref={tableInputRef}
//               onChange={handleTableSearch}
//             />
//             <ul className="dropdown">
//               {filteredTables.map((table) => (
//                 <li key={table} onClick={() => handleTableSelect(table)}>
//                   {table}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Display Selected Table */}
//         {selectedTable && <p>Selected Table: {selectedTable}</p>}

//         {/* Enter Table Details */}
//         {selectedTable && (
//           <div>
//             <h3>Enter Table Details:</h3>
//             <div>
//               <label>Column Name: </label>
//               <input
//                 type="text"
//                 name="columnName"
//                 placeholder="Enter column name"
//                 onChange={handleDetailsChange}
//               />
//             </div>
//             <div>
//               <label>Data Type: </label>
//               <input
//                 type="text"
//                 name="dataType"
//                 placeholder="Enter data type"
//                 onChange={handleDetailsChange}
//               />
//             </div>
//             <div>
//               <label>Constraints: </label>
//               <input
//                 type="text"
//                 name="constraints"
//                 placeholder="Enter constraints (if any)"
//                 onChange={handleDetailsChange}
//               />
//             </div>
//           </div>
//         )}

//         {/* Submit Form */}
//         {selectedTable && <button type="submit">Submit</button>}
//       </form>
//     </div>
//   );
}

export default Table