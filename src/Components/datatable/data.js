export const userCol = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "jobrole", headerName: "Role", width: 120 },
    { field: "phone", headerName: "Number", width: 150 },
    {
        field: "joiningDate", headerName: "Joining-Date:", width: 120,
        renderCell: (param) => {
            return (
                <div className={`cellWithStatus ${param.row.joiningDate}`}>
                    {param.row.joiningDate}
                </div>
            )
        },
    },
]
// export const userRows = [
//     {
//         id: "1",
//         name: "Kunal Sinha",
//         email: "kunal11204@gmail.com",
//         password: "$2b$10$QC4y4qtcwdkF8kZpVVwOBONLXtBJ5CxyNoXsQECTCCAfov8g12Zti",
//         jobrole: "Backend",
//         numberLong: "9979039386",
//         status: "Present",
//     },
//     {
//         id: "2",
//         name: "Savan Mir",
//         email: "savanmir4@gamil.com",
//         password: "$2b$10$NUxp2w54ZzUDTCW5u6YiKuu83HU.pa0cEXxJ0BaBc2anYgJMnEW/O",
//         jobrole: "UI/UX",
//         numberLong: "8140145325",
//         status: "Absent",
//     },
//     {
//         id: "3",
//         name: "Atul Sharma",
//         email: "atulsh1708@gmail.com",
//         password: "$2b$10$JXULxsL/M62NGod4GQ8XTO2Ov570tsLWwaxbzGKkIpk5KNZvtNFWu",
//         jobrole: "FrontEnd",
//         numberLong: "9023964803",
//         status: "Present",
//     },
//     {
//         id: "4",
//         name: "Shravan Parikh",
//         email: "parkhisharvan@gmail.com",
//         password: "$2b$10$Q/0F8tAv8iBZ6ONM.b5pZeQdz/xp1mNtKLylR1P/nfAPMKCDOty2u",
//         jobrole: "Django",
//         numberLong: "8866294266",
//         status: "Absent",
//     }
// ];